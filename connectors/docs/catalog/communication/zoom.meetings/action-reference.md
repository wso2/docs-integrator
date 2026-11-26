---
title: Actions
---

# Actions

The Zoom Meetings connector exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Schedule and manage Zoom meetings, webinars, registrants, recordings, archiving, devices, H.323 and SIP phones, tracking fields, summaries and reports through the Zoom API. |

---

## Client

The `Client` connects to the Zoom API (`https://api.zoom.us/v2`). It exposes 186 operations.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig&#124;ApiKeysConfig</code> | Required | Provides Auth configurations needed when communicating with a remote HTTP endpoint. |
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
import ballerinax/zoom.meetings;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;
configurable string userId = ?;

final meetings:Client meetingsClient = check new ({
    auth: {clientId, clientSecret, refreshToken}
});
```

### Operations

#### Archive files

<details>
<summary>listArchivedFiles</summary>

List archived files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `groupId` | <code>string</code> | No | Deprecated. Please use 'group_ids' for querying # Deprecated. |
| `groupIds` | <code>string</code> | No | The group IDs. To get a group ID, use the [List groups](/docs/api/rest/reference/scim-api/methods/#operation/groupSCIM2List) API. (The maximum number of supported groups for filtering is 7.). |
| `'from` | <code>string</code> | No | The query start date, in `yyyy-MM-dd'T'HH:mm:ssZ` format. This value and the `to` query parameter value cannot exceed seven days. |
| `to` | <code>string</code> | No | The query end date, in `yyyy-MM-dd'T'HH:mm:ssZ` format. This value and the `from` query parameter value cannot exceed seven days. |
| `queryDateType` | <code>"meeting_start_time"&#124;"archive_complete_time"</code> | No | The type of query date. * `meeting_start_time` * `archive_complete_time` This value defaults to `meeting_start_time`. Defaults to `"meeting_start_time"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListArchivedFilesResponse|error`

**Sample code:**

```ballerina
meetings:ListArchivedFilesResponse result = check meetingsClient->listArchivedFiles();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "from": "string",
  "meetings": [
    {
      "timezone": "string",
      "total_size": 1,
      "meeting_type": "internal",
      "recording_count": 1,
      "is_breakout_room": false,
      "type": 1,
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "host_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "duration": 1,
      "start_time": "string",
      "complete_time": "",
      "account_name": "Sample name",
      "topic": "string",
      "id": 1,
      "duration_in_second": 1,
      "archive_files": [
        {
          "participant_leave_time": "string",
          "individual": false,
          "encryption_fingerprint": "string",
          "participant_join_time": "string",
          "file_size": 1,
          "file_type": "MP4",
          "recording_type": "shared_screen_with_speaker_view",
          "download_url": "https://example.com/resource",
          "file_extension": "string",
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "status": "completed"
        }
      ],
      "status": "completed"
    }
  ],
  "to": "string",
  "page_size": 1
}
```

</details>

<details>
<summary>listArchivedFileDownloadAudits</summary>

List archived file download audit logs.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | No | The query start date, in `yyyy-MM-dd'T'HH:mm:ssZ` format. This value and the `to` query parameter value cannot exceed seven days. |
| `to` | <code>string</code> | No | The query end date, in `yyyy-MM-dd'T'HH:mm:ssZ` format. This value and the `from` query parameter value cannot exceed seven days. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListArchivedFileDownloadAuditsResponse|error`

**Sample code:**

```ballerina
meetings:ListArchivedFileDownloadAuditsResponse result = check meetingsClient->listArchivedFileDownloadAudits();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "from": "string",
  "meetings": [
    {
      "meeting_uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "files": [
        {
          "sources": [
            {
              "download_timestamps": [
                "string"
              ],
              "total_download_count": 1,
              "source_ip": "string"
            }
          ],
          "file_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
      ]
    }
  ],
  "to": "string",
  "page_size": 1
}
```

</details>

<details>
<summary>getArchivedFileStatistics</summary>

Get archived file statistics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'from` | <code>string</code> | No | The query start date, in `yyyy-MM-dd'T'HH:mm:ssZ` format. This value and the `to` query parameter value cannot exceed seven days. |
| `to` | <code>string</code> | No | The query end date, in `yyyy-MM-dd'T'HH:mm:ssZ` format. This value and the `from` query parameter value cannot exceed seven days. |

**Returns:** `GetArchivedFileStatisticsResponse|error`

**Sample code:**

```ballerina
meetings:GetArchivedFileStatisticsResponse result = check meetingsClient->getArchivedFileStatistics();
```

**Sample response:**

```json
{
  "statistic_by_file_extension": {
    "vtt_file_count": 1,
    "m4a_file_count": 1,
    "mp4_file_count": 1
  },
  "total_records": 1,
  "from": "string",
  "to": "string",
  "statistic_by_file_status": {
    "processing_file_count": 1,
    "failed_file_count": 1,
    "completed_file_count": 1
  }
}
```

</details>

<details>
<summary>updateArchivedFile</summary>

Update an archived file's auto-delete status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fileId` | <code>string</code> | Yes | Archived file ID. |
| `payload` | <code>UpdateArchivedFileRequest</code> | Yes | Auto-delete setting to apply to the archived file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateArchivedFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    autoDelete: false
});
```

</details>

#### Meetings

<details>
<summary>getMeetingLocalArchivingToken</summary>

Get a meeting's archive token for local archiving.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingLocalArchivingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingLocalArchivingTokenResponse result = check meetingsClient->getMeetingLocalArchivingToken(1);
```

**Sample response:**

```json
{
  "expire_in": "string",
  "token": "string"
}
```

</details>

<details>
<summary>getMeetingRecordings</summary>

Get meeting recordings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or UUID. If providing the meeting ID instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `includeFields` | <code>string</code> | No | Include fields in the response. Currently, only accepts `download_access_token` to get this token field and value for downloading the meeting's recordings. The `download_access_token` requires **View the recording content** enabled for the role authorizing the account. Use the format `include_fields=download_access_token`. |
| `ttl` | <code>int</code> | No | The `download_access_token` Time to Live (TTL) value. This parameter is only valid if the `include_fields` query parameter contains the value `download_access_token`. |

**Returns:** `GetMeetingRecordingsResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingRecordingsResponse result = check meetingsClient->getMeetingRecordings("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "recording_play_passcode": "200",
  "service_name": "Sample name",
  "total_size": 1,
  "auto_delete": false,
  "recording_count": 1,
  "type": "1"
}
```

</details>

<details>
<summary>deleteMeetingRecordings</summary>

Delete meeting or webinar recordings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `action` | <code>"trash"&#124;"delete"</code> | No | The recording delete actions. `trash` - Move recording to trash. `delete` - Delete recording permanently. Defaults to `"trash"`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingRecordings("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>getRecordingAnalyticsDetails</summary>

Get a meeting or webinar recording's analytics details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | No | The start date for the monthly range to query. The maximum range can be a month. If you do not provide this value, this defaults to the current date. |
| `to` | <code>string</code> | No | The end date for the monthly range to query. The maximum range can be a month. |
| `'type` | <code>"by_view"&#124;"by_download"</code> | No | The type of analytics details: * `by_view` &mdash; by_view. * `by_download` &mdash; by_download. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetRecordingAnalyticsDetailsResponse|error`

**Sample code:**

```ballerina
meetings:GetRecordingAnalyticsDetailsResponse result = check meetingsClient->getRecordingAnalyticsDetails("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "from": "string",
  "to": "string",
  "page_size": 1,
  "analytics_details": [
    {
      "duration": 1,
      "date_time": "2026-01-15T00:00:00",
      "name": "Sample name"
    }
  ]
}
```

</details>

<details>
<summary>getRecordingAnalyticsSummary</summary>

Get a meeting or webinar recording's analytics summary.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'from` | <code>string</code> | No | The start date for the monthly range to query. The maximum range can be a month. If you do not provide this value, this defaults to the current date. |
| `to` | <code>string</code> | No | The end date for the monthly range to query. The maximum range can be a month. |

**Returns:** `GetRecordingAnalyticsSummaryResponse|error`

**Sample code:**

```ballerina
meetings:GetRecordingAnalyticsSummaryResponse result = check meetingsClient->getRecordingAnalyticsSummary("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "analytics_summary": [
    {
      "date": "2026-01-15T00:00:00",
      "views_total_count": 1,
      "downloads_total_count": 1
    }
  ],
  "from": "string",
  "to": "string"
}
```

</details>

<details>
<summary>listRecordingRegistrants</summary>

List recording registrants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | **Deprecated.** We will no longer support this field in a future release. Instead, use the `next_page_token` for pagination. Defaults to `1`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `status` | <code>"pending"&#124;"approved"&#124;"denied"</code> | No | Query by the registrant's status. * `pending` - The registration is pending. * `approved` - The registrant is approved. * `denied` - The registration is denied. Defaults to `"approved"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListRecordingRegistrantsResponse|error`

**Sample code:**

```ballerina
meetings:ListRecordingRegistrantsResponse result = check meetingsClient->listRecordingRegistrants(1);
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "registrants": [
    {
      "first_name": "Sample name",
      "email": "user@example.com",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>createRecordingRegistrant</summary>

Create a recording registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>CreateRecordingRegistrantRequest</code> | Yes | Registrant details for access to the meeting's on-demand cloud recordings. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateRecordingRegistrantResponse|error`

**Sample code:**

```ballerina
meetings:CreateRecordingRegistrantResponse result = check meetingsClient->createRecordingRegistrant(1, {
    firstName: "Sample name",
    email: "user@example.com",
    zip: "string",
    country: "string"
});
```

**Sample response:**

```json
{
  "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "share_url": "https://example.com/resource",
  "topic": "string",
  "id": 1
}
```

</details>

<details>
<summary>getRecordingRegistrationQuestions</summary>

Get registration questions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetRecordingRegistrationQuestionsResponse|error`

**Sample code:**

```ballerina
meetings:GetRecordingRegistrationQuestionsResponse result = check meetingsClient->getRecordingRegistrationQuestions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "custom_questions": [
    {
      "answers": [
        "string"
      ],
      "title": "string",
      "type": "short"
    }
  ],
  "questions": [
    {
      "required": false,
      "field_name": "last_name"
    }
  ]
}
```

</details>

<details>
<summary>updateRecordingRegistrationQuestions</summary>

Update registration questions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `payload` | <code>UpdateRecordingRegistrationQuestionsRequest</code> | Yes | Recording registrant questions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateRecordingRegistrationQuestions("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    customQuestions: [{
        answers: ["string"],
        title: "string",
        'type: "short"
    }],
    questions: [{
        required: false,
        fieldName: "last_name"
    }]
});
```

</details>

<details>
<summary>updateRecordingRegistrantStatus</summary>

Update a registrant's status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateRecordingRegistrantStatusRequest</code> | Yes | Status action and the recording registrants it applies to. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateRecordingRegistrantStatus(1, {
    action: "approve",
    registrants: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }]
});
```

</details>

<details>
<summary>getRecordingSettings</summary>

Get meeting recording settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting ID lets you get cloud recording of a meeting or webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetRecordingSettingsResponse|error`

**Sample code:**

```ballerina
meetings:GetRecordingSettingsResponse result = check meetingsClient->getRecordingSettings("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "authentication_option": "string",
  "recording_authentication": false,
  "send_email_to_host": false,
  "approval_type": 0,
  "auto_delete": false,
  "share_recording": "publicly"
}
```

</details>

<details>
<summary>updateRecordingSettings</summary>

Update meeting recording settings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get cloud recordings of a meeting, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response is for the latest meeting instance. |
| `payload` | <code>UpdateRecordingSettingsRequest</code> | Yes | Recording settings to update for the meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateRecordingSettings("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    authenticationOption: "string",
    password: "string",
    recordingAuthentication: false,
    sendEmailToHost: false
});
```

</details>

<details>
<summary>deleteRecordingFile</summary>

Delete a recording file for a meeting or webinar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `recordingId` | <code>string</code> | Yes | The recording ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `action` | <code>"trash"&#124;"delete"</code> | No | The recording delete actions. `trash` - Move recording to trash. `delete` - Delete recording permanently. Defaults to `"trash"`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteRecordingFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>recoverRecordingFile</summary>

Recover a single recording.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's cloud recordings, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `recordingId` | <code>string</code> | Yes | The recording ID. |
| `payload` | <code>RecoverRecordingsRequest</code> | Yes | Recovery action for the single recording file. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->recoverRecordingFile("3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    action: "recover"
});
```

</details>

<details>
<summary>getMeetingTranscript</summary>

Get a meeting transcript.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To get a meeting's transcript, provide the meeting ID or meeting UUID. If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingTranscriptResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingTranscriptResponse result = check meetingsClient->getMeetingTranscript("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "auto_delete_date": "2026-01-15T00:00:00",
  "meeting_topic": "string",
  "account_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "download_restriction_reason": "DELETED_OR_TRASHED",
  "meeting_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "transcript_created_time": "string"
}
```

</details>

<details>
<summary>deleteMeetingTranscript</summary>

Delete a meeting or webinar transcript.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | To delete a meeting's transcript, provide the meeting ID or meeting's unique universal identifier (UUID). If the meeting ID is provided instead of UUID, the response will be for the latest meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingTranscript("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>recoverMeetingRecordings</summary>

Recover meeting recordings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingUUID` | <code>string</code> | Yes | The meeting's universally unique identifier (UUID). Each meeting instance generates a UUID. For example, after a meeting ends, a new UUID is generated for the next meeting instance. |
| `payload` | <code>RecoverRecordingsRequest</code> | Yes | Recovery action for all recordings of the meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->recoverMeetingRecordings("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    action: "recover"
});
```

</details>

<details>
<summary>addMeetingApp</summary>

Add a meeting app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>AddMeetingAppRequest</code> | Yes | Who the app is automatically shared with. All fields are optional. Omit the body to share the app with the meeting owner only. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddMeetingAppResponse|error`

**Sample code:**

```ballerina
meetings:AddMeetingAppResponse result = check meetingsClient->addMeetingApp(1, {
    userIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    shareWith: {
        externalParticipants: false,
        internalParticipants: false
    },
    target: "participants"
});
```

**Sample response:**

```json
{
  "start_time": "string",
  "user_ids": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "share_with": {
    "external_participants": false,
    "internal_participants": false
  },
  "id": 1,
  "app_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "target": "participants"
}
```

</details>

<details>
<summary>deleteMeetingApp</summary>

Delete a meeting app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingApp(1);
```

</details>

<details>
<summary>getMeetingLocalRecordingToken</summary>

Get a meeting's join token for local recording.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `bypassWaitingRoom` | <code>boolean</code> | No | Whether to bypass the waiting room. |

**Returns:** `GetMeetingLocalRecordingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingLocalRecordingTokenResponse result = check meetingsClient->getMeetingLocalRecordingToken(1);
```

**Sample response:**

```json
{
  "expire_in": "string",
  "token": "string"
}
```

</details>

<details>
<summary>getMeetingToken</summary>

Get meeting's token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'type` | <code>"closed_caption_token"</code> | No | The meeting token type. * `closed_caption_token` - The third-party closed caption API token. This defaults to `closed_caption_token`. Defaults to `"closed_caption_token"`. |

**Returns:** `GetMeetingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingTokenResponse result = check meetingsClient->getMeetingToken(1);
```

**Sample response:**

```json
{
  "token": "string"
}
```

</details>

<details>
<summary>addMeetingBatchRegistrants</summary>

Perform batch registration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | Unique identifier of the meeting (Meeting Number). |
| `payload` | <code>AddMeetingBatchRegistrantsRequest</code> | Yes | Registrants to register for the meeting in one batch. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddMeetingBatchRegistrantsResponse|error`

**Sample code:**

```ballerina
meetings:AddMeetingBatchRegistrantsResponse result = check meetingsClient->addMeetingBatchRegistrants("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    registrants: [{
        firstName: "Sample name",
        email: "user@example.com",
        lastName: "Sample name"
    }],
    registrantsConfirmationEmail: false,
    autoApprove: false
});
```

**Sample response:**

```json
{
  "registrants": [
    {
      "join_url": "https://example.com/resource",
      "participant_pin_code": 1,
      "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>getMeetingInvitation</summary>

Get meeting invitation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingInvitationResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingInvitationResponse result = check meetingsClient->getMeetingInvitation(1);
```

**Sample response:**

```json
{
  "invitation": "string",
  "sip_links": [
    "string"
  ]
}
```

</details>

<details>
<summary>createMeetingInviteLinks</summary>

Create a meeting's invite links.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>CreateMeetingInviteLinksRequest</code> | Yes | Attendees and time-to-live for the meeting invite links. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InviteLinksResponse|error`

**Sample code:**

```ballerina
meetings:InviteLinksResponse result = check meetingsClient->createMeetingInviteLinks(1, {
    attendees: [{
        name: "Sample name",
        disableAudio: false,
        disableVideo: false
    }],
    ttl: 1
});
```

**Sample response:**

```json
{
  "attendees": [
    {
      "join_url": "https://example.com/resource",
      "name": "Sample name"
    }
  ]
}
```

</details>

<details>
<summary>listMeetingRegistrants</summary>

List meeting registrants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | **Deprecated.** We will no longer support this field in a future release. Instead, use the `next_page_token` for pagination. Defaults to `1`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |
| `status` | <code>"pending"&#124;"approved"&#124;"denied"</code> | No | Query by the registrant's status. * `pending` - The registration is pending. * `approved` - The registrant is approved. * `denied` - The registration is denied. Defaults to `"approved"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListMeetingRegistrantsResponse|error`

**Sample code:**

```ballerina
meetings:ListMeetingRegistrantsResponse result = check meetingsClient->listMeetingRegistrants(1);
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "registrants": [
    {
      "first_name": "Sample name",
      "email": "user@example.com",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>addMeetingRegistrant</summary>

Add a meeting registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>AddMeetingRegistrantRequest</code> | Yes | Details of the registrant to add to the meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceIds` | <code>string</code> | No | A comma-separated list of meeting occurrence IDs. You can get this value with the [Get a meeting](/docs/api-reference/zoom-api/methods#operation/meeting) API. |

**Returns:** `AddMeetingRegistrantResponse|error`

**Sample code:**

```ballerina
meetings:AddMeetingRegistrantResponse result = check meetingsClient->addMeetingRegistrant(1, {
    firstName: "Sample name",
    email: "user@example.com",
    zip: "string",
    country: "string"
});
```

**Sample response:**

```json
{
  "occurrences": [
    {
      "duration": 1,
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "start_time": "string",
  "join_url": "https://example.com/resource",
  "participant_pin_code": 1,
  "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "topic": "string"
}
```

</details>

<details>
<summary>getMeetingRegistrationQuestions</summary>

List registration questions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingRegistrationQuestionsResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingRegistrationQuestionsResponse result = check meetingsClient->getMeetingRegistrationQuestions(1);
```

**Sample response:**

```json
{
  "custom_questions": [
    {
      "answers": [
        "string"
      ],
      "title": "string",
      "type": "short"
    }
  ],
  "questions": [
    {
      "required": false,
      "field_name": "last_name"
    }
  ]
}
```

</details>

<details>
<summary>updateMeetingRegistrationQuestions</summary>

Update registration questions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingRegistrationQuestionsRequest</code> | Yes | Meeting Registrant Questions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingRegistrationQuestions(1, {
    customQuestions: [{
        answers: ["string"],
        title: "string",
        'type: "short"
    }],
    questions: [{
        required: false,
        fieldName: "last_name"
    }]
});
```

</details>

<details>
<summary>updateMeetingRegistrantStatus</summary>

Update registrant's status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingRegistrantStatusRequest</code> | Yes | Status action and the meeting registrants it applies to. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingRegistrantStatus(1, {
    action: "approve",
    registrants: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        email: "user@example.com"
    }]
});
```

</details>

<details>
<summary>getMeetingRegistrant</summary>

Get a meeting registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `registrantId` | <code>string</code> | Yes | The registrant ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingRegistrantResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingRegistrantResponse result = check meetingsClient->getMeetingRegistrant(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "first_name": "Sample name",
  "email": "user@example.com",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "zip": "string",
  "country": "string",
  "custom_questions": [
    {
      "title": "string",
      "value": "string"
    }
  ]
}
```

</details>

<details>
<summary>deleteMeetingRegistrant</summary>

Delete a meeting registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting ID. |
| `registrantId` | <code>string</code> | Yes | The meeting registrant ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | The meeting occurrence ID. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingRegistrant(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>getMeetingLiveStreamingToken</summary>

Get a meeting's join token for live streaming.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingLiveStreamingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingLiveStreamingTokenResponse result = check meetingsClient->getMeetingLiveStreamingToken(1);
```

**Sample response:**

```json
{
  "expire_in": "string",
  "token": "string"
}
```

</details>

<details>
<summary>getMeetingLivestream</summary>

Get livestream details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | Unique identifier of the meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingLivestreamResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingLivestreamResponse result = check meetingsClient->getMeetingLivestream("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "page_url": "https://example.com/resource",
  "resolution": "string",
  "stream_key": "string",
  "stream_url": "https://example.com/resource"
}
```

</details>

<details>
<summary>updateMeetingLivestream</summary>

Update a livestream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingLivestreamRequest</code> | Yes | Meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingLivestream(1, {
    pageUrl: "https://example.com/resource",
    streamKey: "string",
    streamUrl: "https://example.com/resource",
    resolution: "string"
});
```

</details>

<details>
<summary>updateMeetingLivestreamStatus</summary>

Update livestream status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingLivestreamStatusRequest</code> | Yes | Meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingLivestreamStatus(1, {
    settings: {
        layout: "follow_host",
        activeSpeakerName: false,
        displayName: "Sample name"
    },
    action: "start"
});
```

</details>

<details>
<summary>getMeeting</summary>

Get a meeting.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `showPreviousOccurrences` | <code>boolean</code> | No | Set this field's value to `true` to view meeting details of all previous occurrences of a [recurring meeting](https://support.zoom.us/hc/en-us/articles/214973206-Scheduling-Recurring-Meetings). |
| `occurrenceId` | <code>string</code> | No | Meeting occurrence ID. Provide this field to view meeting details of a particular occurrence of the [recurring meeting](https://support.zoom.us/hc/en-us/articles/214973206-Scheduling-Recurring-Meetings). |

**Returns:** `GetMeetingResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingResponse result = check meetingsClient->getMeeting(1);
```

**Sample response:**

```json
{
  "occurrences": [
    {
      "duration": 1,
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "registration_url": "https://example.com/resource",
  "chat_join_url": "https://example.com/resource",
  "assistant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "timezone": "string",
  "start_url": "https://example.com/resource"
}
```

</details>

<details>
<summary>deleteMeeting</summary>

Delete a meeting.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `cancelMeetingReminder` | <code>boolean</code> | No | `true`: Notify registrants about the meeting cancellation via email. `false`: Do not send any email notification to meeting registrants. The default value of this field is `false`. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |
| `scheduleForReminder` | <code>boolean</code> | No | `true`: Notify host and alternative host about the meeting cancellation via email. `false`: Do not send any email notification. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeeting(1);
```

</details>

<details>
<summary>updateMeeting</summary>

Update a meeting.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingRequest</code> | Yes | Meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | Meeting occurrence ID. Support change of agenda, `start_time`, duration, or settings &#123;`host_video`, `participant_video`, `join_before_host`, `mute_upon_entry`, `waiting_room`, `watermark`, `auto_recording`&#125;. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeeting(1, {
    settings: {
        allowHostControlParticipantMuteState: false,
        summaryTemplateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        waitingRoomOptions: {
            mode: "follow_setting"
        }
    },
    preSchedule: false,
    timezone: "string",
    scheduleFor: "string"
});
```

</details>

<details>
<summary>getMeetingSipUri</summary>

Get a meeting SIP URI with passcode.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>GetMeetingSipUriRequest</code> | Yes | Passcode to embed in the meeting SIP URI. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingSipUriResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingSipUriResponse result = check meetingsClient->getMeetingSipUri(1, {
    passcode: "200"
});
```

**Sample response:**

```json
{
  "participant_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "paid_crc_plan_participant": false,
  "sip_dialing": "string",
  "expire_in": 1
}
```

</details>

<details>
<summary>updateMeetingStatus</summary>

Update meeting status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingStatusRequest</code> | Yes | Status action to apply to the meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingStatus(1, {
    action: "end"
});
```

</details>

<details>
<summary>createMeetingBatchPolls</summary>

Perform batch poll creation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID. |
| `payload` | <code>CreateMeetingBatchPollsRequest</code> | Yes | The batch meeting poll object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateMeetingBatchPollsResponse|error`

**Sample code:**

```ballerina
meetings:CreateMeetingBatchPollsResponse result = check meetingsClient->createMeetingBatchPolls("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    polls: [{
        anonymous: false,
        pollType: 1,
        title: "string"
    }]
});
```

**Sample response:**

```json
{
  "polls": [
    {
      "anonymous": false,
      "poll_type": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>listMeetingPolls</summary>

List meeting polls.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `anonymous` | <code>boolean</code> | No | Whether to query for polls with the **Anonymous** option enabled: * `true` &mdash; Query for polls with the **Anonymous** option enabled. * `false` &mdash; Do not query for polls with the **Anonymous** option enabled. |

**Returns:** `ListMeetingPollsResponse|error`

**Sample code:**

```ballerina
meetings:ListMeetingPollsResponse result = check meetingsClient->listMeetingPolls(1);
```

**Sample response:**

```json
{
  "total_records": 1,
  "polls": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "notstart",
      "anonymous": false
    }
  ]
}
```

</details>

<details>
<summary>createMeetingPoll</summary>

Create a meeting poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>CreateMeetingPollRequest</code> | Yes | The meeting poll object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateMeetingPollResponse|error`

**Sample code:**

```ballerina
meetings:CreateMeetingPollResponse result = check meetingsClient->createMeetingPoll(1, {
    questions: [{
        answerRequired: false,
        answerMinCharacter: 1,
        ratingMinValue: 1
    }],
    anonymous: false,
    pollType: 1,
    title: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "notstart",
  "questions": [
    {
      "answer_required": false,
      "answer_min_character": 1,
      "rating_min_value": 1
    }
  ],
  "anonymous": false,
  "poll_type": 1,
  "title": "string"
}
```

</details>

<details>
<summary>getMeetingPoll</summary>

Get a meeting poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `pollId` | <code>string</code> | Yes | The poll ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingPollResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingPollResponse result = check meetingsClient->getMeetingPoll(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "notstart",
  "questions": [
    {
      "answer_required": false,
      "answer_min_character": 1,
      "rating_min_value": 1
    }
  ],
  "anonymous": false,
  "poll_type": 1,
  "title": "string"
}
```

</details>

<details>
<summary>updateMeetingPoll</summary>

Update a meeting poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `pollId` | <code>string</code> | Yes | The poll ID. |
| `payload` | <code>UpdateMeetingPollRequest</code> | Yes | The meeting poll. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingPoll(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    questions: [{
        answerRequired: false,
        answerMinCharacter: 1,
        ratingMinValue: 1
    }],
    anonymous: false,
    pollType: 1,
    title: "string"
});
```

</details>

<details>
<summary>deleteMeetingPoll</summary>

Delete a meeting poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `pollId` | <code>string</code> | Yes | The poll ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingPoll(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>listMeetingSummaries</summary>

List an account's meeting or webinar summaries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `timeFilterField` | <code>"summary_start_time"&#124;"summary_created_time"</code> | No | Which summary time field to use to filter results by the `from` and `to` parameters. Defaults to `"summary_start_time"`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through a large set of results. The next page token returns whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | No | The start date, in `yyyy-MM-dd'T'HH:mm:ss'Z'` UTC format. The time field used for filtering is specified by `time_filter_field`. |
| `to` | <code>string</code> | No | The end date, in `yyyy-MM-dd'T'HH:mm:ss'Z'` UTC format. The time field used for filtering is specified by `time_filter_field`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListMeetingSummariesResponse|error`

**Sample code:**

```ballerina
meetings:ListMeetingSummariesResponse result = check meetingsClient->listMeetingSummaries();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "from": "string",
  "to": "string",
  "page_size": 1,
  "summaries": [
    {
      "meeting_host_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "meeting_topic": "string",
      "summary_start_time": "string"
    }
  ]
}
```

</details>

<details>
<summary>getMeetingSummary</summary>

Get a meeting or webinar summary.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's universally unique ID (UUID). When you provide a meeting UUID that begins with a `/` character or contains the `//` characters, you **must** double-encode the meeting UUID before making an API request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingSummaryResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingSummaryResponse result = check meetingsClient->getMeetingSummary("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "meeting_host_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "meeting_topic": "string",
  "summary_last_modified_user_email": "user@example.com",
  "summary_start_time": "string",
  "summary_last_modified_time": "string",
  "meeting_id": 1
}
```

</details>

<details>
<summary>deleteMeetingSummary</summary>

Delete a meeting or webinar summary.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's universally unique ID (UUID). When you provide a meeting UUID that begins with a `/` character or contains the `//` characters, you **must** double-encode the meeting UUID before making an API request. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingSummary("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>getMeetingSurvey</summary>

Get a meeting survey.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingSurveyResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingSurveyResponse result = check meetingsClient->getMeetingSurvey(1);
```

**Sample response:**

```json
{
  "show_in_the_browser": false,
  "custom_survey": {
    "feedback": "string",
    "numbered_questions": false,
    "anonymous": false
  },
  "third_party_survey": "string"
}
```

</details>

<details>
<summary>deleteMeetingSurvey</summary>

Delete a meeting survey.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingSurvey(1);
```

</details>

<details>
<summary>updateMeetingSurvey</summary>

Update a meeting survey.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingSurveyRequest</code> | Yes | Meeting survey questions and settings to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingSurvey(1, {
    showInTheBrowser: false,
    customSurvey: {
        feedback: "string",
        numberedQuestions: false,
        anonymous: false
    },
    thirdPartySurvey: "string"
});
```

</details>

#### Past meetings

<details>
<summary>getMeetingArchivedFiles</summary>

Get a meeting's archived files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingUUID` | <code>string</code> | Yes | The meeting's universally unique identifier (UUID). Each meeting instance generates a UUID. After a meeting ends, a new UUID is generated for the next meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingArchivedFilesResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingArchivedFilesResponse result = check meetingsClient->getMeetingArchivedFiles("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "timezone": "string",
  "total_size": 1,
  "meeting_type": "internal",
  "recording_count": 1,
  "is_breakout_room": false,
  "type": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "host_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "duration": 1,
  "start_time": "string",
  "complete_time": "",
  "account_name": "Sample name",
  "topic": "string",
  "id": 1,
  "duration_in_second": 1,
  "archive_files": [
    {
      "participant_leave_time": "string",
      "individual": false,
      "encryption_fingerprint": "string",
      "participant_join_time": "string",
      "file_size": 1,
      "file_type": "MP4",
      "recording_type": "shared_screen_with_speaker_view",
      "download_url": "https://example.com/resource",
      "file_extension": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "completed"
    }
  ],
  "status": "completed"
}
```

</details>

<details>
<summary>deleteMeetingArchivedFiles</summary>

Delete a meeting's archived files.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingUUID` | <code>string</code> | Yes | The meeting's universally unique identifier (UUID). Each meeting instance generates a UUID. For example, after a meeting ends, a new UUID is generated for the next meeting instance. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingArchivedFiles("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>getPastMeeting</summary>

Get past meeting details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetPastMeetingResponse|error`

**Sample code:**

```ballerina
meetings:GetPastMeetingResponse result = check meetingsClient->getPastMeeting("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "user_email": "user@example.com",
  "participants_count": 1,
  "total_minutes": 1,
  "user_name": "Sample name",
  "end_time": "string",
  "dept": "string"
}
```

</details>

<details>
<summary>listPastMeetingInstances</summary>

List past meeting instances.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The past meeting's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'from` | <code>string</code> | No | Start date in UTC, in yyyy-MM-dd format. This parameter only takes effect when used together with to. For best performance, we recommend querying within a one-month range. |
| `to` | <code>string</code> | No | End date in UTC, in yyyy-MM-dd format. This parameter only takes effect when used together with from. |

**Returns:** `ListPastMeetingInstancesResponse|error`

**Sample code:**

```ballerina
meetings:ListPastMeetingInstancesResponse result = check meetingsClient->listPastMeetingInstances(1);
```

**Sample response:**

```json
{
  "meetings": [
    {
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>listPastMeetingParticipants</summary>

Get past meeting participants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListPastMeetingParticipantsResponse|error`

**Sample code:**

```ballerina
meetings:ListPastMeetingParticipantsResponse result = check meetingsClient->listPastMeetingParticipants("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "participants": [
    {
      "duration": 1,
      "user_email": "user@example.com",
      "leave_time": "string"
    }
  ]
}
```

</details>

<details>
<summary>listPastMeetingQa</summary>

List past meetings' Q&A.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListPastMeetingQaResponse|error`

**Sample code:**

```ballerina
meetings:ListPastMeetingQaResponse result = check meetingsClient->listPastMeetingQa("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>listPastMeetingPolls</summary>

List past meeting's poll results.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListPastMeetingPollsResponse|error`

**Sample code:**

```ballerina
meetings:ListPastMeetingPollsResponse result = check meetingsClient->listPastMeetingPolls("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

#### Users

<details>
<summary>listUserRecordings</summary>

List all recordings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's ID or email address. For user-level apps, pass the `me` value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `zraStatus` | <code>"all"&#124;"added"&#124;"not_added"&#124;"processing"</code> | No | The Zoom Revenue Accelerator (ZRA) analysis status of a recording. * `all` - all Revenue Accelerator status. * `added`: added to Revenue Accelerator. * `not_added`: not added to Revenue Accelerator. * `processing`: processing Revenue Accelerator analysis. Defaults to `"all"`. |
| `nextPageToken` | <code>string</code> | No | The next page token paginates through a large set of results. A next page token returns whenever the set of available results exceeds the current page size. The expiration period for this token is 15 minutes. |
| `mc` | <code>string</code> | No | The query metadata of the recording if using an on-premise meeting connector for the meeting. Defaults to `"false"`. |
| `meetingId` | <code>int</code> | No | The meeting ID. |
| `trashType` | <code>string</code> | No | The type of cloud recording to retrieve from the trash. * `meeting_recordings`: List all meeting recordings from the trash. * `recording_file`: List all individual recording files from the trash. Defaults to `"meeting_recordings"`. |
| `'from` | <code>string</code> | No | The start date in 'yyyy-mm-dd' UTC format for the date range where you would like to retrieve recordings. The maximum range can be a month. If no value is provided for this field, the default will be current date. For example, if you make the API request on June 30, 2020, without providing the `from` and `to` parameters, by default the value of 'from' field will be `2020-06-30` and the value of the 'to' field will be `2020-07-01`. **Note**: The `trash` files cannot be filtered by date range and thus, the `from` and `to` fields should not be used for trash files. |
| `to` | <code>string</code> | No | The end date in 'yyyy-mm-dd' 'yyyy-mm-dd' UTC format. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |
| `trash` | <code>boolean</code> | No | The query trash. * `true` - List recordings from trash. * `false` - Do not list recordings from the trash. The default value is `false`. If you set it to `true`, you can use the `trash_type` property to indicate the type of Cloud recording that you need to retrieve. Defaults to `false`. |
| `recordingSourceType` | <code>"cloud_recording_only"&#124;"my_notes_recording_only"</code> | No | * `null` - Return all recordings, including cloud recordings and My Notes recordings. * `cloud_recording_only` - Return only cloud recordings. * `my_notes_recording_only` - Return only My Notes recordings. |

**Returns:** `ListUserRecordingsResponse|error`

**Sample code:**

```ballerina
meetings:ListUserRecordingsResponse result = check meetingsClient->listUserRecordings("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "from": "string",
  "to": "string",
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1
}
```

</details>

<details>
<summary>listMeetings</summary>

List meetings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass the `me` value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | The page number of the current page in the returned records. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `timezone` | <code>string</code> | No | The timezone to assign to the `from` and `to` value. For a list of supported timezones and their formats, see our [timezone list](/docs/api/references/abbreviations/#timezones). |
| `'from` | <code>string</code> | No | The start date. |
| `to` | <code>string</code> | No | The end date. |
| `'type` | <code>"scheduled"&#124;"live"&#124;"upcoming"&#124;"upcoming_meetings"&#124;"previous_meetings"</code> | No | The meeting type. * `scheduled` - All valid previous (unexpired) meetings, live meetings, and upcoming scheduled meetings. * `live` - All the ongoing meetings. * `upcoming` - All upcoming meetings, including live meetings. * `upcoming_meetings` - All upcoming meetings, including live meetings. * `previous_meetings` - All valid previous meetings whose scheduled end time has already passed. Defaults to `"scheduled"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListMeetingsResponse|error`

**Sample code:**

```ballerina
meetings:ListMeetingsResponse result = check meetingsClient->listMeetings("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "meetings": [
    {
      "duration": 1,
      "start_time": "string",
      "join_url": "https://example.com/resource"
    }
  ]
}
```

</details>

<details>
<summary>createMeeting</summary>

Create a meeting.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass the `me` value. |
| `payload` | <code>CreateMeetingRequest</code> | Yes | The meeting object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateMeetingResponse|error`

**Sample code:**

```ballerina
meetings:CreateMeetingResponse result = check meetingsClient->createMeeting("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    settings: {
        allowHostControlParticipantMuteState: false,
        summaryTemplateId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        additionalDataCenterRegions: ["string"]
    },
    preSchedule: false,
    timezone: "string",
    defaultPassword: false
});
```

**Sample response:**

```json
{
  "occurrences": [
    {
      "duration": 1,
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "registration_url": "https://example.com/resource",
  "chat_join_url": "https://example.com/resource",
  "assistant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "timezone": "string",
  "start_url": "https://example.com/resource"
}
```

</details>

<details>
<summary>listUpcomingMeetings</summary>

List upcoming meetings.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass [the `me` value](/docs/api/rest/using-zoom-apis/#the-me-keyword). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListUpcomingMeetingsResponse|error`

**Sample code:**

```ballerina
meetings:ListUpcomingMeetingsResponse result = check meetingsClient->listUpcomingMeetings("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "total_records": 1,
  "meetings": [
    {
      "duration": 1,
      "start_time": "string",
      "join_url": "https://example.com/resource"
    }
  ]
}
```

</details>

<details>
<summary>listUserPacAccounts</summary>

List a user's PAC accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass the `me` value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListUserPacAccountsResponse|error`

**Sample code:**

```ballerina
meetings:ListUserPacAccountsResponse result = check meetingsClient->listUserPacAccounts("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "pac_accounts": [
    {
      "conference_id": 1,
      "listen_only_password": "string",
      "participant_password": "string"
    }
  ]
}
```

</details>

<details>
<summary>listUserMeetingSummaries</summary>

List a user's meeting or webinar summaries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass [the `me` value](/docs/api/rest/using-zoom-apis/#the-me-keyword). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `timeFilterField` | <code>"summary_start_time"&#124;"summary_created_time"</code> | No | Which summary time field to use to filter results by the `from` and `to` parameters. Defaults to `"summary_start_time"`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through a large set of results. The next page token returns whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | No | The start date, in `yyyy-MM-dd'T'HH:mm:ss'Z'` UTC format. The time field used for filtering is specified by `time_filter_field`. |
| `to` | <code>string</code> | No | The end date, in `yyyy-MM-dd'T'HH:mm:ss'Z'` UTC format. The time field used for filtering is specified by `time_filter_field`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListUserMeetingSummariesResponse|error`

**Sample code:**

```ballerina
meetings:ListUserMeetingSummariesResponse result = check meetingsClient->listUserMeetingSummaries("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "from": "string",
  "to": "string",
  "page_size": 1,
  "summaries": [
    {
      "meeting_host_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "meeting_topic": "string",
      "summary_start_time": "string"
    }
  ]
}
```

</details>

<details>
<summary>listUserTspAccounts</summary>

List user's TSP accounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID or email address of the user. For user-level apps, pass the `me` value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListUserTspAccountsResponse|error`

**Sample code:**

```ballerina
meetings:ListUserTspAccountsResponse result = check meetingsClient->listUserTspAccounts("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "tsp_accounts": [
    {
      "conference_code": "200",
      "leader_pin": "string",
      "id": "1"
    }
  ]
}
```

</details>

<details>
<summary>addUserTspAccount</summary>

Add a user's TSP account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass the `me` value. |
| `payload` | <code>AddUserTspAccountRequest</code> | Yes | TSP account details to add for the user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddUserTspAccountResponse|error`

**Sample code:**

```ballerina
meetings:AddUserTspAccountResponse result = check meetingsClient->addUserTspAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    conferenceCode: "200",
    leaderPin: "string",
    dialInNumbers: [{
        number: "INV-0001",
        code: "200",
        countryLabel: "string"
    }],
    tspBridge: "US_TSP_TB"
});
```

**Sample response:**

```json
{
  "conference_code": "200",
  "leader_pin": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "dial_in_numbers": [
    {
      "number": "INV-0001",
      "code": "200",
      "country_label": "string"
    }
  ],
  "tsp_bridge": "US_TSP_TB"
}
```

</details>

<details>
<summary>updateUserTspDialInUrl</summary>

Set global dial-in URL for a TSP user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. |
| `payload` | <code>UpdateUserTspDialInUrlRequest</code> | Yes | The user's global dial-in URL. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateUserTspDialInUrl("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    audioUrl: "https://example.com/resource"
});
```

</details>

<details>
<summary>getUserTspAccount</summary>

Get a user's TSP account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID or email address of the user. For user-level apps, pass the `me` value. |
| `tspId` | <code>"1"&#124;"2"</code> | Yes | TSP account ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetUserTspAccountResponse|error`

**Sample code:**

```ballerina
meetings:GetUserTspAccountResponse result = check meetingsClient->getUserTspAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "1");
```

**Sample response:**

```json
{
  "conference_code": "200",
  "leader_pin": "string",
  "dial_in_numbers": [
    {
      "number": "INV-0001",
      "code": "200",
      "country_label": "string"
    }
  ],
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tsp_bridge": "US_TSP_TB"
}
```

</details>

<details>
<summary>deleteUserTspAccount</summary>

Delete a user's TSP account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass the `me` value. |
| `tspId` | <code>"1"&#124;"2"</code> | Yes | TSP account ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteUserTspAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "1");
```

</details>

<details>
<summary>updateUserTspAccount</summary>

Update a TSP account.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID or email address of the user. For user-level apps, pass the `me` value. |
| `tspId` | <code>"1"&#124;"2"</code> | Yes | TSP account ID. |
| `payload` | <code>UpdateUserTspAccountRequest</code> | Yes | TSP account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateUserTspAccount("3fa85f64-5717-4562-b3fc-2c963f66afa6", "1", {
    conferenceCode: "200",
    leaderPin: "string",
    dialInNumbers: [{
        number: "INV-0001",
        code: "200",
        countryLabel: "string"
    }],
    tspBridge: "US_TSP_TB"
});
```

</details>

<details>
<summary>listMeetingTemplates</summary>

List meeting templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID retrievable from the [List users](/api-reference/zoom-api/methods#operation/users) API. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListMeetingTemplatesResponse|error`

**Sample code:**

```ballerina
meetings:ListMeetingTemplatesResponse result = check meetingsClient->listMeetingTemplates("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "templates": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": 1
    }
  ],
  "total_records": 1
}
```

</details>

<details>
<summary>createMeetingTemplate</summary>

Create a meeting template from an existing meeting.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID retrievable from the [List users](/docs/api/rest/reference/user/methods/#operation/users) API. |
| `payload` | <code>CreateMeetingTemplateRequest</code> | Yes | Source meeting and name for the new meeting template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateMeetingTemplateResponse|error`

**Sample code:**

```ballerina
meetings:CreateMeetingTemplateResponse result = check meetingsClient->createMeetingTemplate("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    saveRecurrence: false,
    meetingId: 1,
    name: "Sample name",
    overwrite: false
});
```

**Sample response:**

```json
{
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>listWebinarTemplates</summary>

List webinar templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's ID. To get a user's ID, use the [**List users**](/docs/api-reference/zoom-api/ma#operation/users) API. For user-level apps, pass the `me` value instead of the user ID value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListWebinarTemplatesResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarTemplatesResponse result = check meetingsClient->listWebinarTemplates("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "templates": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": 1
    }
  ],
  "total_records": 1
}
```

</details>

<details>
<summary>createWebinarTemplate</summary>

Create a webinar template.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID retrievable from the [List users](/api-reference/zoom-api/methods#operation/users) API. |
| `payload` | <code>CreateWebinarTemplateRequest</code> | Yes | Source webinar and name for the new webinar template. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateWebinarTemplateResponse|error`

**Sample code:**

```ballerina
meetings:CreateWebinarTemplateResponse result = check meetingsClient->createWebinarTemplate("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    saveRecurrence: false,
    webinarId: 1,
    name: "Sample name",
    overwrite: false
});
```

**Sample response:**

```json
{
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>listWebinars</summary>

List webinars.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user's user ID or email address. For user-level apps, pass the `me` value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | **Deprecated** We will no longer support this field in a future release. Instead, use the `next_page_token` for pagination. Defaults to `1`. |
| `'type` | <code>"scheduled"&#124;"upcoming"</code> | No | The type of webinar. * `scheduled` - All valid previous (unexpired) webinars, live webinars, and upcoming scheduled webinars. * `upcoming` - All upcoming webinars, including live webinars. Defaults to `"scheduled"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |
| `includeEventsWebinar` | <code>boolean</code> | No | Include Zoom events webinar in searches. The default is `true`. |

**Returns:** `ListWebinarsResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarsResponse result = check meetingsClient->listWebinars("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "webinars": [
    {
      "join_url": "https://example.com/resource",
      "timezone": "string",
      "created_at": "string"
    }
  ]
}
```

</details>

<details>
<summary>createWebinar</summary>

Create a webinar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID or email address of the user. For user-level apps, pass the `me` value. |
| `payload` | <code>CreateWebinarRequest</code> | Yes | Details of the webinar to create. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateWebinarResponse|error`

**Sample code:**

```ballerina
meetings:CreateWebinarResponse result = check meetingsClient->createWebinar("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    settings: {
        postWebinarSurvey: false,
        authenticationOption: "string",
        emailLanguage: "user@example.com"
    },
    timezone: "string",
    recordFileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    scheduleFor: "string"
});
```

**Sample response:**

```json
{
  "occurrences": [
    {
      "duration": 1,
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "h323_passcode": "200",
  "registration_url": "https://example.com/resource",
  "timezone": "string",
  "start_url": "https://example.com/resource",
  "created_at": "string"
}
```

</details>

#### Devices

<details>
<summary>listDevices</summary>

List devices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `deviceStatus` | <code>-1&#124;0&#124;1</code> | No | Filter devices by status. Device Status: `0` - offline. `1` - online. `-1` - unlink. Defaults to `-1`. |
| `deviceModel` | <code>string</code> | No | Filter devices by model. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `isEnrolledInZdm` | <code>boolean</code> | No | Filter devices by enrollment of ZDM (Zoom Device Management). Defaults to `true`. |
| `deviceType` | <code>-1&#124;0&#124;1&#124;2&#124;3&#124;4&#124;5&#124;6&#124;7&#124;8&#124;9</code> | No | Filter devices by device type. `-1`: All Zoom Room devices (0,1,2,3,4,6). `0`: Zoom Rooms computer. `1`: Zoom Rooms controller. `2`: Zoom Rooms scheduling display. `3`: Zoom Rooms control system. `4`: Zoom Rooms whiteboard. `5`: Zoom Phone appliance. `6`: Zoom Rooms computer with controller. `7`: Workspace devices. `8`: Zoom clients. `9`: Zoom VDI clients. Defaults to `-1`. |
| `deviceVendor` | <code>string</code> | No | Filter devices by vendor. |
| `searchText` | <code>string</code> | No | Filter devices by name or serial number. |
| `platformOs` | <code>"win"&#124;"mac"&#124;"ipad"&#124;"iphone"&#124;"android"&#124;"linux"</code> | No | Filter devices by platform operating system. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListDevicesResponse|error`

**Sample code:**

```ballerina
meetings:ListDevicesResponse result = check meetingsClient->listDevices();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "devices": [
    {
      "room_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "connected_to_zdm": false,
      "device_status": -1
    }
  ],
  "page_size": 1
}
```

</details>

<details>
<summary>addDevice</summary>

Add a new device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AddDeviceRequest</code> | Yes | Details of the device to add. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->addDevice({
    deviceName: "Sample name",
    macAddress: "string",
    vendor: "string",
    serialNumber: "INV-0001",
    model: "string",
    deviceType: 0
});
```

</details>

<details>
<summary>listZdmGroups</summary>

Get ZDM group info.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period token is 15 minutes. |
| `pageSize` | <code>int</code> | No | The total number of records returned from a single API call. Default - 30. Max -100. |

**Returns:** `ListZdmGroupsResponse|error`

**Sample code:**

```ballerina
meetings:ListZdmGroupsResponse result = check meetingsClient->listZdmGroups();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "groups": [
    {
      "zdm_group_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "description": "Sample description"
    }
  ],
  "page_size": 1
}
```

</details>

<details>
<summary>assignZpaDevice</summary>

Assign a device to a user or commonarea.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>AssignZpaDeviceRequest</code> | Yes | Device and the user or common area to assign it to. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->assignZpaDevice({
    macAddress: "string",
    vendor: "string",
    extensionNumber: "INV-0001"
});
```

</details>

<details>
<summary>getZpaDeviceSettings</summary>

Get Zoom Phone Appliance settings by user ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `userId` | <code>string</code> | No | The user's ID or email address. For user-level apps, pass `me` as the value for `user_id`. |

**Returns:** `GetZpaDeviceSettingsResponse|error`

**Sample code:**

```ballerina
meetings:GetZpaDeviceSettingsResponse result = check meetingsClient->getZpaDeviceSettings();
```

**Sample response:**

```json
{
  "device_infos": [
    {
      "device_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vendor": "string",
      "device_type": "string"
    }
  ],
  "timezone": "string",
  "language": "string"
}
```

</details>

<details>
<summary>upgradeZpaDevices</summary>

Upgrade ZPA firmware or app.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UpgradeZpaDevicesRequest</code> | Yes | ZPA firmware or app upgrade to apply and its target devices. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->upgradeZpaDevices({
    zdmGroupId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    data: {}
});
```

</details>

<details>
<summary>deleteZpaDeviceByMacAddress</summary>

Delete ZPA device by vendor and mac address.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `vendor` | <code>string</code> | Yes | The device's manufacturer. |
| `macAddress` | <code>string</code> | Yes | The device's mac address. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteZpaDeviceByMacAddress("string", "string");
```

</details>

<details>
<summary>listZpaVersions</summary>

Get ZPA version info.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `zdmGroupId` | <code>string</code> | Yes | The Zoom Device Management (ZDM) group ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListZpaVersionsResponse|error`

**Sample code:**

```ballerina
meetings:ListZpaVersionsResponse result = check meetingsClient->listZpaVersions("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "app_versions": [
    "string"
  ],
  "firmware_versions": [
    {
      "vendor": "string",
      "model": "string",
      "version": "string"
    }
  ]
}
```

</details>

<details>
<summary>getDevice</summary>

Get device detail.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | The device's unique identifier. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetDeviceResponse|error`

**Sample code:**

```ballerina
meetings:GetDeviceResponse result = check meetingsClient->getDevice("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "room_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "connected_to_zdm": false,
  "device_status": -1,
  "enrolled_in_zdm": false,
  "user_email": "user@example.com",
  "device_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>deleteDevice</summary>

Delete device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | Unique identifier of the device. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteDevice("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>updateDevice</summary>

Change device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | Unique identifier of the device. |
| `payload` | <code>UpdateDeviceRequest</code> | Yes | New name for the device. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateDevice("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    deviceName: "Sample name",
    roomId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    deviceType: 0,
    tag: "string"
});
```

</details>

<details>
<summary>assignDeviceGroup</summary>

Assign a device to a group.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | The device ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `groupId` | <code>string</code> | Yes | The group's ID. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->assignDeviceGroup("3fa85f64-5717-4562-b3fc-2c963f66afa6", groupId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>updateDeviceAssignment</summary>

Change device association.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | The device's unique identifier. |
| `payload` | <code>UpdateDeviceAssignmentRequest</code> | Yes | Room or user to associate the device with. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateDeviceAssignment("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    roomId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    appType: "ZR"
});
```

</details>

#### H323

<details>
<summary>listH323Devices</summary>

List H.323/SIP devices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | **Deprecated.** We will no longer support this field in a future release. Instead, use the `next_page_token` for pagination. Defaults to `1`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListH323DevicesResponse|error`

**Sample code:**

```ballerina
meetings:ListH323DevicesResponse result = check meetingsClient->listH323Devices();
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "devices": [
    {
      "protocol": "H.323",
      "encryption": "auto",
      "ip": "string",
      "name": "Sample name"
    }
  ]
}
```

</details>

<details>
<summary>createH323Device</summary>

Create a H.323/SIP device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateH323DeviceRequest</code> | Yes | H.323/SIP device. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateH323DeviceResponse|error`

**Sample code:**

```ballerina
meetings:CreateH323DeviceResponse result = check meetingsClient->createH323Device({
    protocol: "H.323",
    encryption: "auto",
    ip: "string",
    name: "Sample name"
});
```

**Sample response:**

```json
{
  "protocol": "H.323",
  "encryption": "auto",
  "ip": "string",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>deleteH323Device</summary>

Delete a H.323/SIP device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | The device ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteH323Device("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>updateH323Device</summary>

Update a H.323/SIP device.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `deviceId` | <code>string</code> | Yes | The device ID. |
| `payload` | <code>UpdateH323DeviceRequest</code> | Yes | H.323/SIP device fields to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateH323Device("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    protocol: "H.323",
    encryption: "auto",
    ip: "string",
    name: "Sample name"
});
```

</details>

#### Live meetings

<details>
<summary>deleteMeetingChatMessage</summary>

Delete a live meeting message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `messageId` | <code>string</code> | Yes | The live meeting chat message's unique identifier (UUID), in base64-encoded format. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fileIds` | <code>string</code> | No | The live webinar chat file's universally unique identifier, in base64-encoded format. Separate multiple values with commas. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteMeetingChatMessage(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>updateMeetingChatMessage</summary>

Update a live meeting message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `messageId` | <code>string</code> | Yes | The live meeting chat message's unique identifier (UUID), in base64-encoded format. |
| `payload` | <code>UpdateMeetingChatMessageRequest</code> | Yes | Updated content of the live meeting chat message. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingChatMessage(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    messageContent: "string"
});
```

</details>

<details>
<summary>controlLiveMeeting</summary>

In-meeting controls.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The live meeting's ID. |
| `payload` | <code>ControlLiveMeetingRequest</code> | Yes | In-meeting control method and its parameters. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->controlLiveMeeting("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    method: "recording.start",
    params: {
        waitingRoomTitle: "string",
        waitingRoomDescription: "Sample description",
        deleteMeetingAssets: false
    }
});
```

</details>

<details>
<summary>updateMeetingRtmsAppStatus</summary>

Update participant Real-Time Media Streams (RTMS) app status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>int</code> | Yes | The meeting's ID. |
| `payload` | <code>UpdateMeetingRtmsAppStatusRequest</code> | Yes | Meeting. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateMeetingRtmsAppStatus(1, {
    settings: {
        clientId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        participantUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    action: "start"
});
```

</details>

#### Report

<details>
<summary>getSignInActivityReport</summary>

Get sign In / sign out activity report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Next page token is used to paginate through large result sets. |
| `'from` | <code>string</code> | No | Start date for which you would like to view the activity logs report. Using the `from` and `to` parameters, specify a monthly date range for the report as the API only provides one month worth of data in one request. The specified date range should fall within the last six months. |
| `to` | <code>string</code> | No | End date up to which you would like to view the activity logs report. |
| `pageSize` | <code>int</code> | No | The number of records to be returned within a single API call. |

**Returns:** `GetSignInActivityReportResponse|error`

**Sample code:**

```ballerina
meetings:GetSignInActivityReportResponse result = check meetingsClient->getSignInActivityReport();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "activity_logs": [
    {
      "client_type": "string",
      "ip_address": "string",
      "time": "string"
    }
  ],
  "from": "string",
  "to": "string",
  "page_size": 1
}
```

</details>

<details>
<summary>getBillingReport</summary>

Get billing reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetBillingReportResponse|error`

**Sample code:**

```ballerina
meetings:GetBillingReportResponse result = check meetingsClient->getBillingReport();
```

**Sample response:**

```json
{
  "billing_reports": [
    {
      "end_date": "2026-01-15T00:00:00",
      "tax_amount": "string",
      "total_amount": "string"
    }
  ],
  "currency": "string"
}
```

</details>

<details>
<summary>getBillingInvoiceReport</summary>

Get billing invoice reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `billingId` | <code>string</code> | Yes | The billing report's unique identifier. Retrieve this ID from the response of **Get Billing Reports** API request. |

**Returns:** `GetBillingInvoiceReportResponse|error`

**Sample code:**

```ballerina
meetings:GetBillingInvoiceReportResponse result = check meetingsClient->getBillingInvoiceReport(billingId = "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "invoices": [
    {
      "end_date": "2026-01-15T00:00:00",
      "tax_amount": "string",
      "quantity": 1
    }
  ],
  "currency": "string"
}
```

</details>

<details>
<summary>getCloudRecordingReport</summary>

Get cloud recording usage report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `groupId` | <code>string</code> | No | The group ID. To get a group ID, use the [**List groups**](/api-reference/zoom-api/methods#operation/groups) API. **Note:** The API response will only contain users who are members of the queried group ID. |
| `'from` | <code>string</code> | Yes | Start date in 'yyyy-mm-dd' format. The date range defined by the &quot;from&quot; and &quot;to&quot; parameters should only be one month as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | End date in 'yyyy-mm-dd' format. |

**Returns:** `GetCloudRecordingReportResponse|error`

**Sample code:**

```ballerina
meetings:GetCloudRecordingReportResponse result = check meetingsClient->getCloudRecordingReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "from": "string",
  "to": "string",
  "cloud_recording_storage": [
    {
      "date": "2026-01-15T00:00:00",
      "free_usage": "string",
      "usage": "string"
    }
  ]
}
```

</details>

<details>
<summary>getDailyUsageReport</summary>

Get daily usage report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `month` | <code>int</code> | No | Month for this report. |
| `year` | <code>int</code> | No | Year for this report. |
| `groupId` | <code>string</code> | No | The group ID. To get a group ID, use the [**List groups**](/docs/api/users/#tag/groups/GET/groups) API. **Note:** The API response will only contain users who are members of the queried group ID. |

**Returns:** `GetDailyUsageReportResponse|error`

**Sample code:**

```ballerina
meetings:GetDailyUsageReportResponse result = check meetingsClient->getDailyUsageReport();
```

**Sample response:**

```json
{
  "month": 1,
  "year": 1,
  "dates": [
    {
      "date": "2026-01-15T00:00:00",
      "meeting_minutes": 1,
      "meetings": 1
    }
  ]
}
```

</details>

<details>
<summary>getDisclaimerReport</summary>

Get disclaimer report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `searchValue` | <code>string</code> | No | The user email or meeting number. |
| `disclaimerType` | <code>"login"&#124;"joinMeeting"&#124;"recording"&#124;"remoteControl"&#124;"meetingConnector"&#124;"archive"&#124;"summary"&#124;"query"&#124;"AICompanion"&#124;"caption"&#124;"joinSDKMeeting"&#124;"NDI"&#124;"joinWebinar"&#124;"internalMMRGuestJoin"&#124;"liveStream"&#124;"phoneACR"&#124;"viewBOActivity"&#124;"webinarBO"&#124;"unmuteAudio"&#124;"joinOnZoom"&#124;"GDPR"&#124;"chinaMeeting"&#124;"zappJoin"&#124;"softUpdateReminder"&#124;"all"</code> | No | The disclaimer type. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `groupId` | <code>string</code> | No | The user's group ID. |
| `'from` | <code>string</code> | Yes | The start date in `yyyy-MM-dd` format. The date range defined by the `from` and `to` parameters should only be one month, as the report includes only one month's worth of data at once. It is the date range in which the disclaimer was generated. |
| `to` | <code>string</code> | Yes | The end date in `yyyy-MM-dd` format. |
| `pageSize` | <code>int</code> | No | The number of records returned in a single API call. |

**Returns:** `GetDisclaimerReportResponse|error`

**Sample code:**

```ballerina
meetings:GetDisclaimerReportResponse result = check meetingsClient->getDisclaimerReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "disclaimer_records": [
    {
      "disclaimer_type": "string",
      "user_email": "user@example.com",
      "is_zoom_event": false
    }
  ],
  "page_size": 1
}
```

</details>

<details>
<summary>getHistoryMeetingsReport</summary>

Get history meeting and webinar list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `dateType` | <code>"start_time"&#124;"end_time"</code> | No | The type of date to query. * `start_time` - Query by meeting's start time. * `end_time` - Query by meeting's end time. This value defaults to `start_time`. |
| `searchKey` | <code>string</code> | No | The keywords of meeting topic or meeting ID. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `groupId` | <code>string</code> | No | The group ID. To get a group ID, use the [**List groups**](/docs/api/rest/reference/user/methods/#operation/groups) API. **Note:** The API response will only contain users who are members of the queried group ID. |
| `meetingFeature` | <code>"screen_sharing"&#124;"video_on"&#124;"remote_control"&#124;"closed_caption"&#124;"language_interpretation"&#124;"telephone_usage"&#124;"in_meeting_chat"&#124;"poll"&#124;"join_by_room"&#124;"waiting_room"&#124;"live_transcription"&#124;"reaction"&#124;"zoom_apps"&#124;"annotation"&#124;"raise_hand"&#124;"virtual_background"&#124;"whiteboard"&#124;"immersive_scene"&#124;"avatar"&#124;"switch_to_mobile"&#124;"file_sharing"&#124;"meeting_summary"&#124;"meeting_questions"&#124;"record_to_computer"&#124;"record_to_cloud"&#124;"live_translation"&#124;"registration"&#124;"smart_recording"&#124;"multi_speaker"&#124;"meeting_wallpaper"&#124;"gen_ai_virtual_background"&#124;"multi_share"&#124;"document_collaboration"&#124;"portrait_lighting"&#124;"personalized_audio_isolation"&#124;"color_themes"</code> | No | The meeting features to query and return history meetings that use one or more of these features. To provide multiple values, separate them with commas, like `meeting_summary,meeting_questions`. |
| `meetingType` | <code>"meeting"&#124;"webinar"&#124;"all"</code> | No | The meeting type to query. - `all` - rerturn meetings and webinars - `meeting` - only return meetings - `webinar` - only return webinars. |
| `'from` | <code>string</code> | Yes | The start date in `yyyy-mm-dd` format. The date range defined by the `from` and `to` parameters should only be one month, as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | The end date in `yyyy-mm-dd` format. |
| `reportType` | <code>"all"&#124;"poll"&#124;"survey"&#124;"qa"&#124;"resource"&#124;"reaction"</code> | No | Query meetings that have this type of report. - `all` - all meetings - `poll` - meetings with poll data - `survey` - meetings with survey data - `qa` - meetings with Q&A data - `resource` - meetings with resource link data - `reaction` - meetings with reaction data. |
| `pageSize` | <code>int</code> | No | The number of records to be returned within a single API call. |

**Returns:** `GetHistoryMeetingsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetHistoryMeetingsReportResponse result = check meetingsClient->getHistoryMeetingsReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "history_meetings": [
    {
      "max_concurrent_views": 1,
      "create_time": "string",
      "meeting_id": 1
    }
  ],
  "page_size": 1
}
```

</details>

<details>
<summary>getMeetingActivitiesReport</summary>

Get a meeting activities report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `searchKey` | <code>string</code> | No | An operator's name or email. |
| `activityType` | <code>"All Activities"&#124;"Meeting Created"&#124;"Meeting Started"&#124;"User Join"&#124;"User Left"&#124;"Remote Control"&#124;"In-Meeting Chat"&#124;"Meeting Ended"</code> | No | Activity type. -1 - All activities. 0 - Meeting created. 1 - Meeting started. 2 - User joined. 3 - User left. 4 - Remote control. 5 - In-meeting chat. 9 - Meeting ended. Defaults to `"All Activities"`. |
| `'from` | <code>string</code> | Yes | The start date in 'yyyy-MM-dd'format. The date range defined by the `from` and `to` parameters should only be one month, as the report includes only one month's worth of data at once. |
| `to` | <code>string</code> | Yes | The end date 'yyyy-MM-dd' format. |
| `meetingNumber` | <code>string</code> | No | The meeting's number. |
| `pageSize` | <code>int</code> | No | The number of records to be returned within a single API call. Defaults to `30`. |

**Returns:** `GetMeetingActivitiesReportResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingActivitiesReportResponse result = check meetingsClient->getMeetingActivitiesReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "meeting_activity_logs": [
    {
      "activity_time": "string",
      "activity_category": "string",
      "operator_email": "user@example.com",
      "activity_detail": "string",
      "meeting_number": "INV-0001",
      "operator": "string"
    }
  ],
  "page_size": 100.00
}
```

</details>

<details>
<summary>getMeetingReport</summary>

Get meeting detail reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingReportResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingReportResponse result = check meetingsClient->getMeetingReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "user_email": "user@example.com",
  "participants_count": 1,
  "total_minutes": 1,
  "user_name": "Sample name",
  "end_time": "string",
  "custom_keys": [
    {
      "value": "string",
      "key": "string"
    }
  ]
}
```

</details>

<details>
<summary>getMeetingParticipantsReport</summary>

Get meeting participant reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `includeFields` | <code>"registrant_id"</code> | No | Provide `registrant_id` as the value for this field if you would like to see the registrant ID attribute in the response of this API call. A registrant ID is a unique identifier of a [meeting registrant](/docs/api-reference/zoom-api/methods#operation/meetingRegistrants). |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetMeetingParticipantsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingParticipantsReportResponse result = check meetingsClient->getMeetingParticipantsReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "participants": [
    {
      "leave_time": "string",
      "user_email": "user@example.com",
      "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>getMeetingPollsReport</summary>

Get meeting poll reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>MeetingIdentifier</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingPollsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingPollsReportResponse result = check meetingsClient->getMeetingPollsReport("string");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "name": "Sample name",
      "last_name": "Sample name",
      "first_name": "Sample name"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>getMeetingQaReport</summary>

Get meeting Q&A report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingQaReportResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingQaReportResponse result = check meetingsClient->getMeetingQaReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>getMeetingSurveyReport</summary>

Get meeting survey report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `meetingId` | <code>string</code> | Yes | The meeting's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetMeetingSurveyReportResponse|error`

**Sample code:**

```ballerina
meetings:GetMeetingSurveyReportResponse result = check meetingsClient->getMeetingSurveyReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "survey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "meeting_id": 1,
  "meeting_uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "survey_answers": [
    {
      "name": "Sample name",
      "last_name": "Sample name",
      "first_name": "Sample name"
    }
  ],
  "survey_name": "Sample name"
}
```

</details>

<details>
<summary>getOperationLogsReport</summary>

Get operation logs report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `categoryType` | <code>"all"&#124;"user"&#124;"user_settings"&#124;"account"&#124;"billing"&#124;"im"&#124;"recording"&#124;"phone_contacts"&#124;"webinar"&#124;"sub_account"&#124;"role"&#124;"zoom_rooms"</code> | No | **Optional** Filter your response by a category type to see reports for a specific category. The value for this field can be one of the following: `all` `user` `user_settings` `account` `billing` `im` `recording` `phone_contacts` `webinar` `sub_account` `role` `zoom_rooms`. |
| `'from` | <code>string</code> | Yes | Start date in 'yyyy-mm-dd' or 'yyyy-MM-dd HH:mm' format. The date range defined by the `from` and `to` parameters should only be one month as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | End date in 'yyyy-mm-dd' or 'yyyy-MM-dd HH:mm' format. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetOperationLogsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetOperationLogsReportResponse result = check meetingsClient->getOperationLogsReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "page_size": 1,
  "operation_logs": [
    {
      "operation_detail": "string",
      "action": "string",
      "category_type": "string"
    }
  ]
}
```

</details>

<details>
<summary>getRemoteSupportReport</summary>

Get remote support report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | Yes | The start date in `yyyy-MM-dd` format. The date range defined by the `from` and `to` parameters should only be one month, as the report includes only one month's worth of data at once. It is the date range for remote support to start. |
| `to` | <code>string</code> | Yes | The end date in `yyyy-MM-dd` format. |
| `pageSize` | <code>string</code> | No | The number of records to be returned within a single API call. |

**Returns:** `GetRemoteSupportReportResponse|error`

**Sample code:**

```ballerina
meetings:GetRemoteSupportReportResponse result = check meetingsClient->getRemoteSupportReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "remote_support_logs": [
    {
      "meeting_host_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "supporter_name": "Sample name",
      "wait_time": "string"
    }
  ],
  "next_page_token": "string",
  "page_size": 1
}
```

</details>

<details>
<summary>getTelephoneReport</summary>

Get telephone reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | The page number of the current page in the returned records. This field is **not** available if the `query_date_type` parameter is the `meeting_start_time` or `meeting_end_time` value. This field is deprecated. Use the `next_page_token` query parameter for pagination. Defaults to `1`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token will be returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | Yes | Start date in 'yyyy-mm-dd' format. The date range defined by the &quot;from&quot; and &quot;to&quot; parameters should only be one month as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | End date in 'yyyy-mm-dd' format. |
| `'type` | <code>"1"&#124;"2"&#124;"3"</code> | No | Audio types: `1` - Toll-free Call-in &amp; Call-out. `2` - Toll `3` - SIP Connected Audio. Defaults to `"1"`. |
| `queryDateType` | <code>"start_time"&#124;"end_time"&#124;"meeting_start_time"&#124;"meeting_end_time"</code> | No | The type of date to query. * `start_time` &mdash; Query by call start time. * `end_time` &mdash; Query by call end time. * `meeting_start_time` &mdash; Query by meeting start time. * `meeting_end_time` &mdash; Query by meeting end time. This value defaults to `start_time`. Defaults to `"start_time"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetTelephoneReportResponse|error`

**Sample code:**

```ballerina
meetings:GetTelephoneReportResponse result = check meetingsClient->getTelephoneReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "from": "string",
  "to": "string",
  "page_count": 1,
  "page_size": 1
}
```

</details>

<details>
<summary>getUpcomingEventsReport</summary>

Get upcoming events report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `groupId` | <code>string</code> | No | The group ID. To get a group ID, use the [**List groups**](/api-reference/zoom-api/methods#operation/groups) API. **Note:** The API response will only contain meetings where the host is a member of the queried group ID. |
| `'from` | <code>string</code> | Yes | Start date in 'yyyy-mm-dd' format. The date range defined by the &quot;from&quot; and &quot;to&quot; parameters should only be one month as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | End date in 'yyyy-mm-dd' format. |
| `'type` | <code>"meeting"&#124;"webinar"&#124;"all"</code> | No | The type of event to query. * `meeting` &mdash; A meeting event. * `webinar` &mdash; A webinar event. * `all` &mdash; Both meeting and webinar events. This value defaults to `all`. Defaults to `"all"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetUpcomingEventsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetUpcomingEventsReportResponse result = check meetingsClient->getUpcomingEventsReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "upcoming_events": [
    {
      "start_time": "string",
      "topic": "string",
      "dept": "string"
    }
  ],
  "from": "string",
  "to": "string",
  "page_size": 1
}
```

</details>

<details>
<summary>getActiveHostsReport</summary>

Get active or inactive host reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | The page number of the current page in the returned records. Defaults to `1`. |
| `nextPageToken` | <code>string</code> | No | The next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceeds the current page size. The expiration period for this token is 15 minutes. |
| `groupId` | <code>string</code> | No | The group ID. To get a group ID, use the [**List groups**](/docs/api/rest/reference/user/methods/#operation/groups) API. **Note:** The API response will only contain users who are members of the queried group ID. |
| `'from` | <code>string</code> | Yes | Start date in 'yyyy-mm-dd' format. The date range defined by the `from` and `to` parameters should only be one month as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | End date in 'yyyy-mm-dd' format. |
| `'type` | <code>"active"&#124;"inactive"</code> | No | Active or inactive hosts. `active` - Active hosts. `inactive` - Inactive hosts. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetActiveHostsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetActiveHostsReportResponse result = check meetingsClient->getActiveHostsReport('from = "string", to = "string");
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "from": "string",
  "to": "string",
  "page_count": 1
}
```

</details>

<details>
<summary>getUserMeetingsReport</summary>

Get meeting reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | <code>string</code> | Yes | The user ID or email address of the user. For user-level apps, pass the `me` value. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `'from` | <code>string</code> | Yes | Start date in 'yyyy-mm-dd' format. The date range defined by the &quot;from&quot; and &quot;to&quot; parameters should only be one month as the report includes only one month worth of data at once. |
| `to` | <code>string</code> | Yes | End date in 'yyyy-mm-dd' format. |
| `'type` | <code>"past"&#124;"pastOne"&#124;"pastJoined"</code> | No | The meeting type to query for: * `past` - All past meetings. * `pastOne` - A single past user meeting. * `pastJoined` - All past meetings the account's users hosted or joined. Defaults to `"past"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetUserMeetingsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetUserMeetingsReportResponse result = check meetingsClient->getUserMeetingsReport("3fa85f64-5717-4562-b3fc-2c963f66afa6", 'from = "string", to = "string");
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "from": "string"
}
```

</details>

<details>
<summary>getWebinarReport</summary>

Get webinar detail reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarReportResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarReportResponse result = check meetingsClient->getWebinarReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "user_email": "user@example.com",
  "participants_count": 1,
  "total_minutes": 1,
  "user_name": "Sample name",
  "end_time": "string",
  "custom_keys": [
    {
      "value": "string",
      "key": "string"
    }
  ]
}
```

</details>

<details>
<summary>getWebinarParticipantsReport</summary>

Get webinar participant reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `includeFields` | <code>"registrant_id"</code> | No | The additional query parameters to include. * `registrant_id` - Include the registrant's ID in the API response. The registrant ID is the webinar participant's unique ID. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `GetWebinarParticipantsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarParticipantsReportResponse result = check meetingsClient->getWebinarParticipantsReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "participants": [
    {
      "leave_time": "string",
      "user_email": "user@example.com",
      "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>getWebinarPollsReport</summary>

Get webinar poll reports.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarPollsReportResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarPollsReportResponse result = check meetingsClient->getWebinarPollsReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "name": "Sample name",
      "last_name": "Sample name",
      "first_name": "Sample name"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>getWebinarQaReport</summary>

Get webinar Q&A report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarQaReportResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarQaReportResponse result = check meetingsClient->getWebinarQaReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "user_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>getWebinarSurveyReport</summary>

Get webinar survey report.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarSurveyReportResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarSurveyReportResponse result = check meetingsClient->getWebinarSurveyReport("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "survey_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "webinar_uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "webinar_id": 1,
  "survey_answers": [
    {
      "name": "Sample name",
      "last_name": "Sample name",
      "first_name": "Sample name"
    }
  ],
  "survey_name": "Sample name"
}
```

</details>

#### Sip phones

<details>
<summary>listSipPhones</summary>

List SIP phones.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `searchKey` | <code>string</code> | No | A user's user name or email address. If this parameter is provided, only the SIP phone system integration enabled for that specific user will be returned. Otherwise, all SIP phones on an account will be returned. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token will be returned whenever the set of available results exceeds the current page size. This tokan's expiration period is 15 minutes. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListSipPhonesResponse|error`

**Sample code:**

```ballerina
meetings:ListSipPhonesResponse result = check meetingsClient->listSipPhones();
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "phones": [
    {
      "password": "string",
      "user_email": "user@example.com",
      "voice_mail": "user@example.com"
    }
  ],
  "page_size": 1
}
```

</details>

<details>
<summary>enableSipPhone</summary>

Enable SIP phone.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>EnableSipPhoneRequest</code> | Yes | SIP phone configuration to enable for a user. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `EnableSipPhoneResponse|error`

**Sample code:**

```ballerina
meetings:EnableSipPhoneResponse result = check meetingsClient->enableSipPhone({
    server: {
        proxyServer: "string",
        registerServer: "string",
        transportProtocol: "UDP"
    },
    password: "string",
    userEmail: "user@example.com",
    userName: "Sample name",
    domain: "string",
    authorizationName: "Sample name"
});
```

**Sample response:**

```json
{
  "server": {
    "proxy_server": "string",
    "register_server": "string",
    "transport_protocol": "UDP"
  },
  "password": "string",
  "user_email": "user@example.com",
  "server_3": {
    "proxy_server": "string",
    "register_server": "string",
    "transport_protocol": "UDP"
  },
  "voice_mail": "user@example.com",
  "server_2": {
    "proxy_server": "string",
    "register_server": "string",
    "transport_protocol": "UDP"
  }
}
```

</details>

<details>
<summary>deleteSipPhone</summary>

Delete SIP phone.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneId` | <code>string</code> | Yes | The SIP phone ID. It can be retrieved from the **List SIP phones** API. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteSipPhone("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>updateSipPhone</summary>

Update SIP phone.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneId` | <code>string</code> | Yes | The SIP phone ID. Retrieve this with the **List SIP phones** API. |
| `payload` | <code>UpdateSipPhoneRequest</code> | Yes | SIP phone configuration fields to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateSipPhone("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    server: {
        proxyServer: "string",
        registerServer: "string",
        transportProtocol: "UDP"
    },
    password: "string",
    server3: {
        proxyServer: "string",
        registerServer: "string",
        transportProtocol: "UDP"
    },
    voiceMail: "user@example.com"
});
```

</details>

#### Tsp

<details>
<summary>getAccountTsp</summary>

Get account's TSP information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetAccountTspResponse|error`

**Sample code:**

```ballerina
meetings:GetAccountTspResponse result = check meetingsClient->getAccountTsp();
```

**Sample response:**

```json
{
  "dial_in_number_unrestricted": false,
  "modify_credential_forbidden": false,
  "dial_in_numbers": [
    {
      "number": "INV-0001",
      "code": "200",
      "type": "string"
    }
  ],
  "master_account_setting_extended": false,
  "enable": false,
  "tsp_provider": "string"
}
```

</details>

<details>
<summary>updateAccountTsp</summary>

Update an account's TSP information.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>UpdateAccountTspRequest</code> | Yes | TSP Account. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateAccountTsp({
    dialInNumberUnrestricted: false,
    modifyCredentialForbidden: false,
    masterAccountSettingExtended: false,
    enable: false
});
```

</details>

#### Tracking fields

<details>
<summary>listTrackingFields</summary>

List tracking fields.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListTrackingFieldsResponse|error`

**Sample code:**

```ballerina
meetings:ListTrackingFieldsResponse result = check meetingsClient->listTrackingFields();
```

**Sample response:**

```json
{
  "tracking_fields": [
    {
      "recommended_values": [
        "string"
      ],
      "visible": false,
      "field": "string"
    }
  ],
  "total_records": 1
}
```

</details>

<details>
<summary>createTrackingField</summary>

Create a tracking field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateTrackingFieldRequest</code> | Yes | Tracking Field. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateTrackingFieldResponse|error`

**Sample code:**

```ballerina
meetings:CreateTrackingFieldResponse result = check meetingsClient->createTrackingField({
    recommendedValues: ["string"],
    visible: false,
    'field: "string",
    required: false
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "recommended_values": [
    "string"
  ],
  "visible": false,
  "field": "string",
  "required": false
}
```

</details>

<details>
<summary>getTrackingField</summary>

Get a tracking field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldId` | <code>string</code> | Yes | The tracking field ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetTrackingFieldResponse|error`

**Sample code:**

```ballerina
meetings:GetTrackingFieldResponse result = check meetingsClient->getTrackingField("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "recommended_values": [
    "string"
  ],
  "visible": false,
  "field": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "required": false
}
```

</details>

<details>
<summary>deleteTrackingField</summary>

Delete a tracking field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldId` | <code>string</code> | Yes | The tracking field ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteTrackingField("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>updateTrackingField</summary>

Update a tracking field.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldId` | <code>string</code> | Yes | The tracking field ID. |
| `payload` | <code>UpdateTrackingFieldRequest</code> | Yes | Tracking field attributes to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateTrackingField("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    recommendedValues: ["string"],
    visible: false,
    'field: "string",
    required: false
});
```

</details>

#### Live webinars

<details>
<summary>deleteWebinarChatMessage</summary>

Delete a live webinar message.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `messageId` | <code>string</code> | Yes | The live webinar chat message's unique identifier (UUID), in base64-encoded format. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `fileIds` | <code>string</code> | No | The live webinar chat file's universally unique identifier (UUID), in base64-encoded format. Separate multiple values with commas. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarChatMessage(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

#### Past webinars

<details>
<summary>listWebinarAbsentees</summary>

Get webinar absentees.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListWebinarAbsenteesResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarAbsenteesResponse result = check meetingsClient->listWebinarAbsentees("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "registrants": [
    {
      "first_name": "Sample name",
      "email": "user@example.com",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>listPastWebinarInstances</summary>

List past webinar instances.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListPastWebinarInstancesResponse|error`

**Sample code:**

```ballerina
meetings:ListPastWebinarInstancesResponse result = check meetingsClient->listPastWebinarInstances(1);
```

**Sample response:**

```json
{
  "webinars": [
    {
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>listPastWebinarParticipants</summary>

List webinar participants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListPastWebinarParticipantsResponse|error`

**Sample code:**

```ballerina
meetings:ListPastWebinarParticipantsResponse result = check meetingsClient->listPastWebinarParticipants("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "participants": [
    {
      "duration": 1,
      "user_email": "user@example.com",
      "leave_time": "string"
    }
  ]
}
```

</details>

<details>
<summary>listPastWebinarPolls</summary>

List past webinar poll results.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListPastWebinarPollsResponse|error`

**Sample code:**

```ballerina
meetings:ListPastWebinarPollsResponse result = check meetingsClient->listPastWebinarPolls("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>listPastWebinarQa</summary>

List Q&As of a past webinar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListPastWebinarQaResponse|error`

**Sample code:**

```ballerina
meetings:ListPastWebinarQaResponse result = check meetingsClient->listPastWebinarQa("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "start_time": "string",
  "questions": [
    {
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "id": 1,
  "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

#### Webinars

<details>
<summary>getWebinar</summary>

Get a webinar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's ID or universally unique ID (UUID). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `showPreviousOccurrences` | <code>boolean</code> | No | Set the value of this field to `true` to view webinar details of all previous occurrences of a recurring webinar. |
| `occurrenceId` | <code>string</code> | No | Unique identifier for an occurrence of a recurring webinar. [Recurring webinars](https://support.zoom.us/hc/en-us/articles/216354763-How-to-Schedule-A-Recurring-Webinar) can have a maximum of 50 occurrences. When you create a recurring Webinar using [**Create a webinar**](/docs/api-reference/zoom-api/methods#operation/webinarCreate) API, you can retrieve the Occurrence ID from the response of the API call. |

**Returns:** `GetWebinarResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarResponse result = check meetingsClient->getWebinar("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "occurrences": [
    {
      "duration": 1,
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "h323_passcode": "200",
  "registration_url": "https://example.com/resource",
  "timezone": "string",
  "start_url": "https://example.com/resource",
  "created_at": "string"
}
```

</details>

<details>
<summary>deleteWebinar</summary>

Delete a webinar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |
| `cancelWebinarReminder` | <code>boolean</code> | No | `true` - Notify panelists and registrants about the webinar cancellation via email. `false` - Do not send any email notification to webinar registrants and panelists. The default value of this field is `false`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinar(1);
```

</details>

<details>
<summary>updateWebinar</summary>

Update a webinar.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarRequest</code> | Yes | Webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | Webinar occurrence ID. Support change of agenda, start time, duration, and settings `host_video`, `panelist_video`, `hd_video, watermark`, `auto_recording`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinar(1, {
    settings: {
        postWebinarSurvey: false,
        authenticationOption: "string",
        emailLanguage: "user@example.com"
    },
    timezone: "string",
    recordFileId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    scheduleFor: "string"
});
```

</details>

<details>
<summary>addWebinarBatchRegistrants</summary>

Perform batch registration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's unique identifier. |
| `payload` | <code>AddWebinarBatchRegistrantsRequest</code> | Yes | Registrants to register for the webinar in one batch. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddWebinarBatchRegistrantsResponse|error`

**Sample code:**

```ballerina
meetings:AddWebinarBatchRegistrantsResponse result = check meetingsClient->addWebinarBatchRegistrants("3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    registrants: [{
        firstName: "Sample name",
        email: "user@example.com",
        lastName: "Sample name"
    }],
    autoApprove: false
});
```

**Sample response:**

```json
{
  "registrants": [
    {
      "join_url": "https://example.com/resource",
      "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "user@example.com"
    }
  ]
}
```

</details>

<details>
<summary>getWebinarBranding</summary>

Get webinar's session branding.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarBrandingResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarBrandingResponse result = check meetingsClient->getWebinarBranding(1);
```

**Sample response:**

```json
{
  "virtual_backgrounds": [
    {
      "name": "Sample name",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "is_default": false
    }
  ],
  "wallpaper": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "name_tags": [
    {
      "accent_color": "string",
      "background_color": "string",
      "name": "Sample name"
    }
  ]
}
```

</details>

<details>
<summary>createWebinarNameTag</summary>

Create a webinar's branding name tag.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>CreateWebinarNameTagRequest</code> | Yes | Name tag design to create for the webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateWebinarNameTagResponse|error`

**Sample code:**

```ballerina
meetings:CreateWebinarNameTagResponse result = check meetingsClient->createWebinarNameTag(1, {
    accentColor: "string",
    backgroundColor: "string",
    name: "Sample name",
    textColor: "string"
});
```

**Sample response:**

```json
{
  "accent_color": "string",
  "background_color": "string",
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "text_color": "string",
  "is_default": false
}
```

</details>

<details>
<summary>deleteWebinarNameTags</summary>

Delete a webinar's branding name tag.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `nameTagIds` | <code>string</code> | No | A comma-separated list of the name tag IDs to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarNameTags(1);
```

</details>

<details>
<summary>updateWebinarNameTag</summary>

Update a webinar's branding name tag.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `nameTagId` | <code>string</code> | Yes | The name tag's ID. |
| `payload` | <code>UpdateWebinarNameTagRequest</code> | Yes | Name tag design fields to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarNameTag(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    setDefaultForAllPanelists: false,
    accentColor: "string",
    backgroundColor: "string",
    name: "Sample name"
});
```

</details>

<details>
<summary>uploadWebinarVirtualBackground</summary>

Upload a webinar's branding virtual background.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UploadWebinarVirtualBackgroundRequest</code> | Yes | Virtual background image file to upload for the webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadWebinarVirtualBackgroundResponse|error`

**Sample code:**

```ballerina
meetings:UploadWebinarVirtualBackgroundResponse result = check meetingsClient->uploadWebinarVirtualBackground(1, {
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    },
    setDefaultForAllPanelists: false,
    default: false
});
```

**Sample response:**

```json
{
  "size": 1,
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "is_default": false,
  "type": "image"
}
```

</details>

<details>
<summary>deleteWebinarVirtualBackgrounds</summary>

Delete a webinar's branding virtual backgrounds.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `ids` | <code>string</code> | No | A comma-separated list of the virtual background file IDs to delete. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarVirtualBackgrounds(1);
```

</details>

<details>
<summary>setWebinarVirtualBackground</summary>

Set webinar's default branding virtual background.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `setDefaultForAllPanelists` | <code>boolean</code> | No | Whether to set the virtual background file as the new default for all panelists. This includes panelists not currently assigned a default virtual background. |
| `id` | <code>string</code> | No | The virtual background file ID to update. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->setWebinarVirtualBackground(1);
```

</details>

<details>
<summary>uploadWebinarWallpaper</summary>

Upload a webinar's branding wallpaper.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UploadWebinarWallpaperRequest</code> | Yes | Wallpaper image file to upload for the webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `UploadWebinarWallpaperResponse|error`

**Sample code:**

```ballerina
meetings:UploadWebinarWallpaperResponse result = check meetingsClient->uploadWebinarWallpaper(1, {
    file: {
        fileContent: check io:fileReadBytes("import.csv"),
        fileName: "import.csv"
    }
});
```

**Sample response:**

```json
{
  "size": 1,
  "name": "Sample name",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "type": "image"
}
```

</details>

<details>
<summary>deleteWebinarWallpaper</summary>

Delete a webinar's branding wallpaper.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarWallpaper(1);
```

</details>

<details>
<summary>createWebinarInviteLinks</summary>

Create webinar's invite links.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>CreateWebinarInviteLinksRequest</code> | Yes | Webinar invite link object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `InviteLinksResponse|error`

**Sample code:**

```ballerina
meetings:InviteLinksResponse result = check meetingsClient->createWebinarInviteLinks(1, {
    attendees: [{
        name: "Sample name",
        disableAudio: false,
        disableVideo: false
    }],
    ttl: 1
});
```

**Sample response:**

```json
{
  "attendees": [
    {
      "join_url": "https://example.com/resource",
      "name": "Sample name"
    }
  ]
}
```

</details>

<details>
<summary>getWebinarLiveStreamingToken</summary>

Get a webinar's join token for live streaming.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarLiveStreamingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarLiveStreamingTokenResponse result = check meetingsClient->getWebinarLiveStreamingToken(1);
```

**Sample response:**

```json
{
  "expire_in": "string",
  "token": "string"
}
```

</details>

<details>
<summary>getWebinarLocalArchivingToken</summary>

Get a webinar's archive token for local archiving.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarLocalArchivingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarLocalArchivingTokenResponse result = check meetingsClient->getWebinarLocalArchivingToken(1);
```

**Sample response:**

```json
{
  "expire_in": "string",
  "token": "string"
}
```

</details>

<details>
<summary>getWebinarLocalRecordingToken</summary>

Get a webinar's join token for local recording.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarLocalRecordingTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarLocalRecordingTokenResponse result = check meetingsClient->getWebinarLocalRecordingToken(1);
```

**Sample response:**

```json
{
  "expire_in": "string",
  "token": "string"
}
```

</details>

<details>
<summary>getWebinarLivestream</summary>

Get live stream details.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>string</code> | Yes | The webinar's unique ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarLivestreamResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarLivestreamResponse result = check meetingsClient->getWebinarLivestream("3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "page_url": "https://example.com/resource",
  "resolution": "string",
  "stream_key": "string",
  "stream_url": "https://example.com/resource"
}
```

</details>

<details>
<summary>updateWebinarLivestream</summary>

Update a live stream.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarLivestreamRequest</code> | Yes | Webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarLivestream(1, {
    pageUrl: "https://example.com/resource",
    streamKey: "string",
    streamUrl: "https://example.com/resource",
    resolution: "string"
});
```

</details>

<details>
<summary>updateWebinarLivestreamStatus</summary>

Update live stream status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarLivestreamStatusRequest</code> | Yes | Webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarLivestreamStatus(1, {
    settings: {
        activeSpeakerName: false,
        displayName: "Sample name",
        closeCaption: "burnt-in"
    },
    action: "start"
});
```

</details>

<details>
<summary>listWebinarPanelists</summary>

List panelists.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListWebinarPanelistsResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarPanelistsResponse result = check meetingsClient->listWebinarPanelists(1);
```

**Sample response:**

```json
{
  "panelists": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Sample name",
      "email": "user@example.com"
    }
  ],
  "total_records": 1
}
```

</details>

<details>
<summary>addWebinarPanelists</summary>

Add panelists.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>AddWebinarPanelistsRequest</code> | Yes | Panelists to add to the webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `AddWebinarPanelistsResponse|error`

**Sample code:**

```ballerina
meetings:AddWebinarPanelistsResponse result = check meetingsClient->addWebinarPanelists(1, {
    panelists: [{
        name: "Sample name",
        email: "user@example.com",
        nameTagName: "Sample name"
    }]
});
```

**Sample response:**

```json
{
  "updated_at": "2026-01-15T00:00:00",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

<details>
<summary>deleteWebinarPanelists</summary>

Remove all panelists.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarPanelists(1);
```

</details>

<details>
<summary>deleteWebinarPanelist</summary>

Remove a panelist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `panelistId` | <code>string</code> | Yes | The panelist's ID or email. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarPanelist(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>listWebinarPolls</summary>

List a webinar's polls.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `anonymous` | <code>boolean</code> | No | Whether to query for polls with the **Anonymous** option enabled: * `true` &mdash; Query for polls with the **Anonymous** option enabled. * `false` &mdash; Do not query for polls with the **Anonymous** option enabled. |

**Returns:** `ListWebinarPollsResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarPollsResponse result = check meetingsClient->listWebinarPolls(1);
```

**Sample response:**

```json
{
  "total_records": 1,
  "polls": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "status": "notstart",
      "anonymous": false
    }
  ]
}
```

</details>

<details>
<summary>createWebinarPoll</summary>

Create a webinar's poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>CreateWebinarPollRequest</code> | Yes | The Webinar poll object. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `CreateWebinarPollResponse|error`

**Sample code:**

```ballerina
meetings:CreateWebinarPollResponse result = check meetingsClient->createWebinarPoll(1, {
    questions: [{
        answerRequired: false,
        answerMinCharacter: 1,
        ratingMinValue: 1
    }],
    anonymous: false,
    pollType: 1,
    title: "string"
});
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "notstart",
  "questions": [
    {
      "answer_required": false,
      "answer_min_character": 1,
      "rating_min_value": 1
    }
  ],
  "anonymous": false,
  "poll_type": 1,
  "title": "string"
}
```

</details>

<details>
<summary>getWebinarPoll</summary>

Get a webinar poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `pollId` | <code>string</code> | Yes | The poll ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarPollResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarPollResponse result = check meetingsClient->getWebinarPoll(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "notstart",
  "questions": [
    {
      "answer_required": false,
      "answer_min_character": 1,
      "rating_min_value": 1
    }
  ],
  "anonymous": false,
  "poll_type": 1,
  "title": "string"
}
```

</details>

<details>
<summary>updateWebinarPoll</summary>

Update a webinar poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `pollId` | <code>string</code> | Yes | The poll ID. |
| `payload` | <code>UpdateWebinarPollRequest</code> | Yes | The webinar poll. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarPoll(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6", {
    questions: [{
        answerRequired: false,
        answerMinCharacter: 1,
        ratingMinValue: 1
    }],
    anonymous: false,
    pollType: 1,
    title: "string"
});
```

</details>

<details>
<summary>deleteWebinarPoll</summary>

Delete a webinar poll.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `pollId` | <code>string</code> | Yes | The poll ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarPoll(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>listWebinarRegistrants</summary>

List webinar registrants.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `pageNumber` | <code>int</code> | No | **Deprecated** This field will be deprecated. We will no longer support this field in a future release. Instead, use the `next_page_token` for pagination. Defaults to `1`. |
| `nextPageToken` | <code>string</code> | No | Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |
| `trackingSourceId` | <code>string</code> | No | The tracking source ID for the registrants. Useful if you share the webinar registration page in multiple locations. See [Creating source tracking links for webinar registration](https://support.zoom.us/hc/en-us/articles/360000315683-Creating-source-tracking-links-for-webinar-registration) for details. |
| `status` | <code>"pending"&#124;"approved"&#124;"denied"</code> | No | Query by the registrant's status. * `pending` - The registration is pending. * `approved` - The registrant is approved. * `denied` - The registration is denied. Defaults to `"approved"`. |
| `pageSize` | <code>int</code> | No | The number of records returned within a single API call. Defaults to `30`. |

**Returns:** `ListWebinarRegistrantsResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarRegistrantsResponse result = check meetingsClient->listWebinarRegistrants(1);
```

**Sample response:**

```json
{
  "page_number": 1,
  "next_page_token": "string",
  "total_records": 1,
  "page_count": 1,
  "page_size": 1,
  "registrants": [
    {
      "first_name": "Sample name",
      "email": "user@example.com",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

</details>

<details>
<summary>addWebinarRegistrant</summary>

Add a webinar registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>AddWebinarRegistrantRequest</code> | Yes | Details of the registrant to add to the webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceIds` | <code>string</code> | No | A comma-separated list of webinar occurrence IDs. Get this value with the [Get a webinar](/docs/api/rest/reference/zoom-api/methods/#operation/webinar) API. Make sure the `registration_type` is 3 if updating multiple occurrences with this API. |

**Returns:** `AddWebinarRegistrantResponse|error`

**Sample code:**

```ballerina
meetings:AddWebinarRegistrantResponse result = check meetingsClient->addWebinarRegistrant(1, {
    firstName: "Sample name",
    email: "user@example.com",
    zip: "string",
    country: "string"
});
```

**Sample response:**

```json
{
  "occurrences": [
    {
      "duration": 1,
      "start_time": "string",
      "occurrence_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "start_time": "string",
  "join_url": "https://example.com/resource",
  "registrant_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "share_url": "https://example.com/resource",
  "topic": "string"
}
```

</details>

<details>
<summary>getWebinarRegistrationQuestions</summary>

List registration questions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarRegistrationQuestionsResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarRegistrationQuestionsResponse result = check meetingsClient->getWebinarRegistrationQuestions(1);
```

**Sample response:**

```json
{
  "custom_questions": [
    {
      "answers": [
        "string"
      ],
      "title": "string",
      "type": "short"
    }
  ],
  "questions": [
    {
      "required": false,
      "field_name": "last_name"
    }
  ]
}
```

</details>

<details>
<summary>updateWebinarRegistrationQuestions</summary>

Update registration questions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarRegistrationQuestionsRequest</code> | Yes | Webinar registrant questions. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarRegistrationQuestions(1, {
    customQuestions: [{
        answers: ["string"],
        title: "string",
        'type: "short"
    }],
    questions: [{
        required: false,
        fieldName: "last_name"
    }]
});
```

</details>

<details>
<summary>updateWebinarRegistrantStatus</summary>

Update registrant's status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarRegistrantStatusRequest</code> | Yes | Status action and the webinar registrants it applies to. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarRegistrantStatus(1, {
    action: "approve",
    registrants: [{
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        email: "user@example.com"
    }]
});
```

</details>

<details>
<summary>getWebinarRegistrant</summary>

Get a webinar registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `registrantId` | <code>string</code> | Yes | The registrant ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | The meeting or webinar occurrence ID. |

**Returns:** `GetWebinarRegistrantResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarRegistrantResponse result = check meetingsClient->getWebinarRegistrant(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

**Sample response:**

```json
{
  "first_name": "Sample name",
  "email": "user@example.com",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "zip": "string",
  "country": "string",
  "custom_questions": [
    {
      "title": "string",
      "value": "string"
    }
  ]
}
```

</details>

<details>
<summary>deleteWebinarRegistrant</summary>

Delete a webinar registrant.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar ID. |
| `registrantId` | <code>string</code> | Yes | The registrant ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `occurrenceId` | <code>string</code> | No | The webinar occurrence ID. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarRegistrant(1, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
```

</details>

<details>
<summary>getWebinarSipUri</summary>

Get a webinar SIP URI with passcode.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>GetWebinarSipUriRequest</code> | Yes | Passcode to embed in the webinar SIP URI. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarSipUriResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarSipUriResponse result = check meetingsClient->getWebinarSipUri(1, {
    passcode: "200"
});
```

**Sample response:**

```json
{
  "participant_identifier_code": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "paid_crc_plan_participant": false,
  "sip_dialing": "string",
  "expire_in": 1
}
```

</details>

<details>
<summary>updateWebinarStatus</summary>

Update webinar status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarStatusRequest</code> | Yes | Status action to apply to the webinar. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarStatus(1, {
    action: "end"
});
```

</details>

<details>
<summary>getWebinarSurvey</summary>

Get a webinar survey.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `GetWebinarSurveyResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarSurveyResponse result = check meetingsClient->getWebinarSurvey(1);
```

**Sample response:**

```json
{
  "show_in_the_browser": false,
  "custom_survey": {
    "feedback": "string",
    "numbered_questions": false,
    "anonymous": false
  },
  "show_in_the_follow_up_email": false,
  "third_party_survey": "string"
}
```

</details>

<details>
<summary>deleteWebinarSurvey</summary>

Delete a webinar survey.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->deleteWebinarSurvey(1);
```

</details>

<details>
<summary>updateWebinarSurvey</summary>

Update a webinar survey.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `payload` | <code>UpdateWebinarSurveyRequest</code> | Yes | Webinar survey questions and settings to update. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `error?`

**Sample code:**

```ballerina
check meetingsClient->updateWebinarSurvey(1, {
    showInTheBrowser: false,
    customSurvey: {
        feedback: "string",
        numberedQuestions: false,
        anonymous: false
    },
    showInTheFollowUpEmail: false,
    thirdPartySurvey: "string"
});
```

</details>

<details>
<summary>getWebinarToken</summary>

Get webinar's token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |
| `'type` | <code>"closed_caption_token"</code> | No | The webinar token type: * `closed_caption_token` &mdash; The third-party closed caption API token. This defaults to `closed_caption_token`. Defaults to `"closed_caption_token"`. |

**Returns:** `GetWebinarTokenResponse|error`

**Sample code:**

```ballerina
meetings:GetWebinarTokenResponse result = check meetingsClient->getWebinarToken(1);
```

**Sample response:**

```json
{
  "token": "string"
}
```

</details>

<details>
<summary>listWebinarTrackingSources</summary>

Get webinar tracking sources.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `webinarId` | <code>int</code> | Yes | The webinar's ID. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. Defaults to `{}`. |

**Returns:** `ListWebinarTrackingSourcesResponse|error`

**Sample code:**

```ballerina
meetings:ListWebinarTrackingSourcesResponse result = check meetingsClient->listWebinarTrackingSources(1);
```

**Sample response:**

```json
{
  "tracking_sources": [
    {
      "visitor_count": 1,
      "registration_count": 1,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "total_records": 1
}
```

</details>
