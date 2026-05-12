---
title: Actions
---

# Actions

The `ballerinax/hubspot.marketing.events` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Marketing Events API v3: event CRUD, attendance, analytics, list associations, and settings. |

---

## Client

Marketing Events API v3: event CRUD, attendance, analytics, list associations, and settings.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | Authentication configuration: OAuth 2.0 refresh token grant, bearer token, or API keys. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |

### Initializing the client

```ballerina
import ballerinax/hubspot.marketing.events as hsmktevents;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsmktevents:Client mktEventsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
    }
});
```

### Operations

#### Event CRUD (external iDs)

<details>
<summary>postEventsCreate</summary>

Creates a new marketing event.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `MarketingEventCreateRequestParams` | Yes | Marketing event creation parameters including `externalAccountId`, `externalEventId`, `eventName`, `eventOrganizer`, and optional fields. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `MarketingEventDefaultResponse|error`

Sample code:

```ballerina
hsmktevents:MarketingEventDefaultResponse response = check mktEventsClient->postEventsCreate({
    externalAccountId: "app-12345",
    externalEventId: "webinar-2026-03",
    eventName: "Ballerina Integration Summit 2026",
    eventOrganizer: "WSO2",
    eventType: "WEBINAR",
    startDateTime: "2026-06-15T09:00:00Z",
    endDateTime: "2026-06-15T17:00:00Z"
});
```

Sample response:

```ballerina
{"eventName": "Ballerina Integration Summit 2026", "eventOrganizer": "WSO2", "externalAccountId": "app-12345", "externalEventId": "webinar-2026-03", "eventType": "WEBINAR", "startDateTime": "2026-06-15T09:00:00Z", "endDateTime": "2026-06-15T17:00:00Z"}
```

</details>

<details>
<summary>getEventsExternalEventIdGetDetails</summary>

Retrieves a marketing event by its external account ID and external event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `queries` | `GetEventsExternalEventIdGetDetailsQueries` | Yes | Query parameters including `externalAccountId`. |

Returns: `MarketingEventPublicReadResponse|error`

Sample code:

```ballerina
hsmktevents:MarketingEventPublicReadResponse event = check mktEventsClient->getEventsExternalEventIdGetDetails(
    "webinar-2026-03",
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
{"eventName": "Ballerina Integration Summit 2026", "eventOrganizer": "WSO2", "externalAccountId": "app-12345", "externalEventId": "webinar-2026-03", "eventType": "WEBINAR", "startDateTime": "2026-06-15T09:00:00Z", "endDateTime": "2026-06-15T17:00:00Z"}
```

</details>

<details>
<summary>putEventsExternalEventIdUpsert</summary>

Creates or updates a marketing event by external event ID. If the event exists, it is updated; otherwise, a new event is created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `payload` | `MarketingEventCreateRequestParams` | Yes | Marketing event parameters. |

Returns: `MarketingEventPublicDefaultResponse|error`

Sample code:

```ballerina
hsmktevents:MarketingEventPublicDefaultResponse response = check mktEventsClient->putEventsExternalEventIdUpsert(
    "webinar-2026-03",
    {
        externalAccountId: "app-12345",
        externalEventId: "webinar-2026-03",
        eventName: "Ballerina Integration Summit 2026 (Updated)",
        eventOrganizer: "WSO2"
    }
);
```

Sample response:

```ballerina
{"eventName": "Ballerina Integration Summit 2026 (Updated)", "eventOrganizer": "WSO2", "externalAccountId": "app-12345", "externalEventId": "webinar-2026-03"}
```

</details>

<details>
<summary>patchEventsExternalEventIdUpdate</summary>

Updates an existing marketing event by external event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `payload` | `MarketingEventUpdateRequestParams` | Yes | Fields to update. |
| `queries` | `PatchEventsExternalEventIdUpdateQueries` | No | Query parameters including `externalAccountId`. |

Returns: `MarketingEventPublicDefaultResponse|error`

Sample code:

```ballerina
hsmktevents:MarketingEventPublicDefaultResponse response = check mktEventsClient->patchEventsExternalEventIdUpdate(
    "webinar-2026-03",
    {eventName: "Updated Webinar Title"},
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
{"eventName": "Updated Webinar Title", "eventOrganizer": "WSO2", "externalAccountId": "app-12345", "externalEventId": "webinar-2026-03"}
```

</details>

<details>
<summary>deleteEventsExternalEventIdArchive</summary>

Deletes a marketing event by external event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `queries` | `DeleteEventsExternalEventIdArchiveQueries` | Yes | Query parameters including `externalAccountId`. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->deleteEventsExternalEventIdArchive(
    "webinar-2026-03",
    externalAccountId = "app-12345"
);
```

</details>

#### Event CRUD (object ID)

<details>
<summary>get</summary>

Retrieves all marketing events with optional pagination and filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetQueries` | No | Query parameters for pagination (`limit`, `after`) and filtering. |

Returns: `CollectionResponseMarketingEventPublicReadResponseV2ForwardPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->get();
```

Sample response:

```ballerina
{"results": [{"id": "12345", "properties": {"hs_marketing_event_name": "Webinar 2026", "hs_marketing_event_type": "WEBINAR"}}], "paging": {"next": {"after": "12345"}}}
```

</details>

<details>
<summary>getObjectId</summary>

Retrieves a marketing event by its internal HubSpot object ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectId` | `string` | Yes | The HubSpot internal object ID of the marketing event. |

Returns: `MarketingEventPublicReadResponseV2|error`

Sample code:

```ballerina
hsmktevents:MarketingEventPublicReadResponseV2 event = check mktEventsClient->getObjectId("12345");
```

Sample response:

```ballerina
{"id": "12345", "properties": {"hs_marketing_event_name": "Ballerina Integration Summit 2026", "hs_marketing_event_type": "WEBINAR", "hs_marketing_event_organizer": "WSO2"}}
```

</details>

<details>
<summary>patchObjectId</summary>

Updates a marketing event by its internal HubSpot object ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectId` | `string` | Yes | The HubSpot internal object ID. |
| `payload` | `MarketingEventPublicUpdateRequestV2` | Yes | Fields to update. |

Returns: `MarketingEventPublicDefaultResponseV2|error`

Sample code:

```ballerina
hsmktevents:MarketingEventPublicDefaultResponseV2 response = check mktEventsClient->patchObjectId(
    "12345",
    {
        properties: {
            "hs_marketing_event_name": "Updated Event Name"
        }
    }
);
```

Sample response:

```ballerina
{"id": "12345", "properties": {"hs_marketing_event_name": "Updated Event Name"}}
```

</details>

<details>
<summary>deleteObjectId</summary>

Deletes a marketing event by its internal HubSpot object ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectId` | `string` | Yes | The HubSpot internal object ID. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->deleteObjectId("12345");
```

</details>

#### Batch operations

<details>
<summary>postEventsUpsertBatchUpsert</summary>

Batch creates or updates multiple marketing events using external IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputMarketingEventCreateRequestParams` | Yes | Batch input containing an array of marketing event creation parameters. |

Returns: `BatchResponseMarketingEventPublicDefaultResponse|error`

Sample code:

```ballerina
hsmktevents:BatchResponseMarketingEventPublicDefaultResponse response = check mktEventsClient->postEventsUpsertBatchUpsert({
    inputs: [
        {
            externalAccountId: "app-12345",
            externalEventId: "event-001",
            eventName: "Event One",
            eventOrganizer: "WSO2"
        },
        {
            externalAccountId: "app-12345",
            externalEventId: "event-002",
            eventName: "Event Two",
            eventOrganizer: "WSO2"
        }
    ]
});
```

Sample response:

```ballerina
{"status": "COMPLETE", "results": [{"eventName": "Event One", "externalEventId": "event-001"}, {"eventName": "Event Two", "externalEventId": "event-002"}]}
```

</details>

<details>
<summary>postBatchUpdate</summary>

Batch updates multiple marketing events by their internal object IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputMarketingEventPublicUpdateRequestFullV2` | Yes | Batch input containing an array of update requests with object IDs. |

Returns: `BatchResponseMarketingEventPublicDefaultResponseV2|BatchResponseMarketingEventPublicDefaultResponseV2WithErrors|error`

Sample code:

```ballerina
var response = check mktEventsClient->postBatchUpdate({
    inputs: [
        {
            id: "12345",
            properties: {"hs_marketing_event_name": "Updated Event One"}
        },
        {
            id: "12346",
            properties: {"hs_marketing_event_name": "Updated Event Two"}
        }
    ]
});
```

Sample response:

```ballerina
{"status": "COMPLETE", "results": [{"id": "12345", "properties": {"hs_marketing_event_name": "Updated Event One"}}, {"id": "12346", "properties": {"hs_marketing_event_name": "Updated Event Two"}}]}
```

</details>

<details>
<summary>postBatchArchive</summary>

Batch deletes multiple marketing events by their internal object IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputMarketingEventPublicObjectIdDeleteRequest` | Yes | Batch input containing object IDs to delete. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->postBatchArchive({
    inputs: [{id: "12345"}, {id: "12346"}]
});
```

</details>

<details>
<summary>postEventsDeleteBatchArchive</summary>

Batch deletes multiple marketing events by their external identifiers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputMarketingEventExternalUniqueIdentifier` | Yes | Batch input containing external account ID and external event ID pairs. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check mktEventsClient->postEventsDeleteBatchArchive({
    inputs: [
        {externalAccountId: "app-12345", externalEventId: "event-001"},
        {externalAccountId: "app-12345", externalEventId: "event-002"}
    ]
});
```

Sample response:

```ballerina
204 No Content
```

</details>

#### Event lifecycle

<details>
<summary>postEventsExternalEventIdCompleteComplete</summary>

Marks a marketing event as completed, setting its start and end date/time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `payload` | `MarketingEventCompleteRequestParams` | Yes | Completion parameters including `startDateTime` and `endDateTime`. |
| `queries` | `PostEventsExternalEventIdCompleteCompleteQueries` | No | Query parameters including `externalAccountId`. |

Returns: `MarketingEventDefaultResponse|error`

Sample code:

```ballerina
hsmktevents:MarketingEventDefaultResponse response = check mktEventsClient->postEventsExternalEventIdCompleteComplete(
    "webinar-2026-03",
    {
        startDateTime: "2026-06-15T09:00:00Z",
        endDateTime: "2026-06-15T17:00:00Z"
    },
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
{"eventName": "Ballerina Integration Summit 2026", "externalEventId": "webinar-2026-03", "startDateTime": "2026-06-15T09:00:00Z", "endDateTime": "2026-06-15T17:00:00Z"}
```

</details>

<details>
<summary>postEventsExternalEventIdCancelCancel</summary>

Marks a marketing event as cancelled.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `queries` | `PostEventsExternalEventIdCancelCancelQueries` | No | Query parameters including `externalAccountId`. |

Returns: `MarketingEventDefaultResponse|error`

Sample code:

```ballerina
hsmktevents:MarketingEventDefaultResponse response = check mktEventsClient->postEventsExternalEventIdCancelCancel(
    "webinar-2026-03",
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
{"eventName": "Ballerina Integration Summit 2026", "externalEventId": "webinar-2026-03", "eventCancelled": true}
```

</details>

#### Attendance by contact ID

<details>
<summary>postAttendanceExternalEventIdSubscriberStateCreateRecordByContactIds</summary>

Records participant attendance by contact IDs using external event identifiers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `subscriberState` | `string` | Yes | Subscriber state: `register`, `attend`, `cancel`, or `noshow`. |
| `payload` | `BatchInputMarketingEventSubscriber` | Yes | Batch of contact IDs with optional interaction timestamps. |
| `queries` | `PostAttendanceExternalEventIdSubscriberStateCreateRecordByContactIdsQueries` | No | Query parameters including `externalAccountId`. |

Returns: `BatchResponseSubscriberVidResponse|error`

Sample code:

```ballerina
hsmktevents:BatchResponseSubscriberVidResponse response = check mktEventsClient->postAttendanceExternalEventIdSubscriberStateCreateRecordByContactIds(
    "webinar-2026-03",
    "register",
    {
        inputs: [
            {vid: 101, interactionDateTime: 1750000000000},
            {vid: 102, interactionDateTime: 1750000000000}
        ]
    },
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
{"status": "COMPLETE", "results": [{"vid": 101, "status": "register"}, {"vid": 102, "status": "register"}]}
```

</details>

<details>
<summary>postObjectIdAttendanceSubscriberStateCreate</summary>

Records participant attendance by contact IDs using the internal marketing event object ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectId` | `string` | Yes | The HubSpot internal object ID of the marketing event. |
| `subscriberState` | `string` | Yes | Subscriber state: `register`, `attend`, `cancel`, or `noshow`. |
| `payload` | `BatchInputMarketingEventSubscriber` | Yes | Batch of contact IDs with optional interaction timestamps. |

Returns: `BatchResponseSubscriberVidResponse|error`

Sample code:

```ballerina
hsmktevents:BatchResponseSubscriberVidResponse response = check mktEventsClient->postObjectIdAttendanceSubscriberStateCreate(
    "12345",
    "attend",
    {
        inputs: [{vid: 101, interactionDateTime: 1750000000000}]
    }
);
```

Sample response:

```ballerina
{"status": "COMPLETE", "results": [{"vid": 101, "status": "attend"}]}
```

</details>

#### Attendance by email

<details>
<summary>postAttendanceExternalEventIdSubscriberStateEmailCreateRecordByContactEmails</summary>

Records participant attendance by email addresses using external event identifiers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `subscriberState` | `string` | Yes | Subscriber state: `register`, `attend`, `cancel`, or `noshow`. |
| `payload` | `BatchInputMarketingEventEmailSubscriber` | Yes | Batch of email addresses with optional interaction timestamps. |
| `queries` | `PostAttendanceExternalEventIdSubscriberStateEmailCreateRecordByContactEmailsQueries` | No | Query parameters including `externalAccountId`. |

Returns: `BatchResponseSubscriberEmailResponse|error`

Sample code:

```ballerina
hsmktevents:BatchResponseSubscriberEmailResponse response = check mktEventsClient->postAttendanceExternalEventIdSubscriberStateEmailCreateRecordByContactEmails(
    "webinar-2026-03",
    "register",
    {
        inputs: [
            {email: "alice@example.com", interactionDateTime: 1750000000000},
            {email: "bob@example.com", interactionDateTime: 1750000000000}
        ]
    },
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
{"status": "COMPLETE", "results": [{"email": "alice@example.com", "status": "register"}, {"email": "bob@example.com", "status": "register"}]}
```

</details>

<details>
<summary>postObjectIdAttendanceSubscriberStateEmailCreate</summary>

Records participant attendance by email addresses using the internal marketing event object ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `objectId` | `string` | Yes | The HubSpot internal object ID of the marketing event. |
| `subscriberState` | `string` | Yes | Subscriber state: `register`, `attend`, `cancel`, or `noshow`. |
| `payload` | `BatchInputMarketingEventEmailSubscriber` | Yes | Batch of email addresses with optional interaction timestamps. |

Returns: `BatchResponseSubscriberEmailResponse|error`

Sample code:

```ballerina
hsmktevents:BatchResponseSubscriberEmailResponse response = check mktEventsClient->postObjectIdAttendanceSubscriberStateEmailCreate(
    "12345",
    "attend",
    {
        inputs: [
            {email: "alice@example.com", interactionDateTime: 1750000000000}
        ]
    }
);
```

Sample response:

```ballerina
{"status": "COMPLETE", "results": [{"email": "alice@example.com", "status": "attend"}]}
```

</details>

#### Subscriber state upsert

<details>
<summary>postEventsExternalEventIdSubscriberStateUpsertUpsertByContactId</summary>

Records or updates subscriber state by contact ID using external event identifiers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `subscriberState` | `string` | Yes | Subscriber state: `register`, `attend`, `cancel`, or `noshow`. |
| `payload` | `BatchInputMarketingEventSubscriber` | Yes | Batch of contact IDs with optional interaction timestamps. |
| `queries` | `PostEventsExternalEventIdSubscriberStateUpsertUpsertByContactIdQueries` | No | Query parameters including `externalAccountId`. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check mktEventsClient->postEventsExternalEventIdSubscriberStateUpsertUpsertByContactId(
    "webinar-2026-03",
    "attend",
    {
        inputs: [{vid: 101, interactionDateTime: 1750000000000}]
    },
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
204 No Content
```

</details>

<details>
<summary>postEventsExternalEventIdSubscriberStateEmailUpsertUpsertByContactEmail</summary>

Records or updates subscriber state by email using external event identifiers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |
| `subscriberState` | `string` | Yes | Subscriber state: `register`, `attend`, `cancel`, or `noshow`. |
| `payload` | `BatchInputMarketingEventEmailSubscriber` | Yes | Batch of email addresses with optional interaction timestamps. |
| `queries` | `PostEventsExternalEventIdSubscriberStateEmailUpsertUpsertByContactEmailQueries` | No | Query parameters including `externalAccountId`. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check mktEventsClient->postEventsExternalEventIdSubscriberStateEmailUpsertUpsertByContactEmail(
    "webinar-2026-03",
    "cancel",
    {
        inputs: [{email: "alice@example.com", interactionDateTime: 1750000000000}]
    },
    externalAccountId = "app-12345"
);
```

Sample response:

```ballerina
204 No Content
```

</details>

#### Participation analytics

<details>
<summary>getParticipationsMarketingEventIdBreakdownGetParticipationsBreakdownByMarketingEventId</summary>

Retrieves a detailed participation breakdown for a marketing event by its internal event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `marketingEventId` | `int` | Yes | The internal HubSpot marketing event ID. |
| `queries` | `GetParticipationsMarketingEventIdBreakdownGetParticipationsBreakdownByMarketingEventIdQueries` | No | Query parameters for pagination and filtering. |

Returns: `CollectionResponseWithTotalParticipationBreakdownForwardPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getParticipationsMarketingEventIdBreakdownGetParticipationsBreakdownByMarketingEventId(12345);
```

Sample response:

```ballerina
{"total": 2, "results": [{"contactId": "101", "state": "ATTENDED", "timestamp": "2026-06-15T10:00:00Z"}, {"contactId": "102", "state": "REGISTERED", "timestamp": "2026-06-10T14:00:00Z"}]}
```

</details>

<details>
<summary>getParticipationsExternalAccountIdExternalEventIdBreakdownGetParticipationsBreakdownByExternalEventId</summary>

Retrieves a detailed participation breakdown for a marketing event by external account and event IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalAccountId` | `string` | Yes | The external account identifier. |
| `externalEventId` | `string` | Yes | The external event identifier. |
| `queries` | `GetParticipationsExternalAccountIdExternalEventIdBreakdownGetParticipationsBreakdownByExternalEventIdQueries` | No | Query parameters for pagination and filtering. |

Returns: `CollectionResponseWithTotalParticipationBreakdownForwardPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getParticipationsExternalAccountIdExternalEventIdBreakdownGetParticipationsBreakdownByExternalEventId(
    "app-12345",
    "webinar-2026-03"
);
```

Sample response:

```ballerina
{"total": 2, "results": [{"contactId": "101", "state": "ATTENDED", "timestamp": "2026-06-15T10:00:00Z"}, {"contactId": "102", "state": "REGISTERED", "timestamp": "2026-06-10T14:00:00Z"}]}
```

</details>

<details>
<summary>getParticipationsContactsContactIdentifierBreakdownGetParticipationsBreakdownByContactId</summary>

Retrieves a participation breakdown for a specific contact across all marketing events.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactIdentifier` | `string` | Yes | The contact identifier (contact ID or email). |
| `queries` | `GetParticipationsContactsContactIdentifierBreakdownGetParticipationsBreakdownByContactIdQueries` | No | Query parameters for pagination and filtering. |

Returns: `CollectionResponseWithTotalParticipationBreakdownForwardPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getParticipationsContactsContactIdentifierBreakdownGetParticipationsBreakdownByContactId("alice@example.com");
```

Sample response:

```ballerina
{"total": 1, "results": [{"eventId": "12345", "state": "ATTENDED", "timestamp": "2026-06-15T10:00:00Z"}]}
```

</details>

<details>
<summary>getParticipationsMarketingEventIdGetParticipationsCountersByMarketingEventId</summary>

Retrieves participation counters (registered, attended, cancelled, no-shows) for a marketing event by internal ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `marketingEventId` | `int` | Yes | The internal HubSpot marketing event ID. |

Returns: `AttendanceCounters|error`

Sample code:

```ballerina
hsmktevents:AttendanceCounters counters = check mktEventsClient->getParticipationsMarketingEventIdGetParticipationsCountersByMarketingEventId(12345);
```

Sample response:

```ballerina
{"registered": 150, "attended": 120, "cancelled": 20, "noShows": 10}
```

</details>

<details>
<summary>getParticipationsExternalAccountIdExternalEventIdGetParticipationsCountersByEventExternalId</summary>

Retrieves participation counters for a marketing event by external account and event IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalAccountId` | `string` | Yes | The external account identifier. |
| `externalEventId` | `string` | Yes | The external event identifier. |

Returns: `AttendanceCounters|error`

Sample code:

```ballerina
hsmktevents:AttendanceCounters counters = check mktEventsClient->getParticipationsExternalAccountIdExternalEventIdGetParticipationsCountersByEventExternalId(
    "app-12345",
    "webinar-2026-03"
);
```

Sample response:

```ballerina
{"registered": 150, "attended": 120, "cancelled": 20, "noShows": 10}
```

</details>

#### List associations

<details>
<summary>getAssociationsMarketingEventIdListsGetAllByMarketingEventId</summary>

Retrieves all HubSpot lists associated with a marketing event by its internal event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `marketingEventId` | `string` | Yes | The internal HubSpot marketing event ID. |

Returns: `CollectionResponseWithTotalPublicListNoPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getAssociationsMarketingEventIdListsGetAllByMarketingEventId("12345");
```

Sample response:

```ballerina
{"total": 1, "results": [{"listId": "67890", "name": "Webinar Registrants"}]}
```

</details>

<details>
<summary>getAssociationsExternalAccountIdExternalEventIdListsGetAllByExternalAccountAndEventIds</summary>

Retrieves all HubSpot lists associated with a marketing event by external account and event IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalAccountId` | `string` | Yes | The external account identifier. |
| `externalEventId` | `string` | Yes | The external event identifier. |

Returns: `CollectionResponseWithTotalPublicListNoPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getAssociationsExternalAccountIdExternalEventIdListsGetAllByExternalAccountAndEventIds(
    "app-12345",
    "webinar-2026-03"
);
```

Sample response:

```ballerina
{"total": 1, "results": [{"listId": "67890", "name": "Webinar Registrants"}]}
```

</details>

<details>
<summary>putAssociationsMarketingEventIdListsListIdAssociateByMarketingEventId</summary>

Associates a HubSpot list with a marketing event by internal event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `marketingEventId` | `string` | Yes | The internal HubSpot marketing event ID. |
| `listId` | `string` | Yes | The HubSpot list ID to associate. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->putAssociationsMarketingEventIdListsListIdAssociateByMarketingEventId("12345", "67890");
```

</details>

<details>
<summary>putAssociationsExternalAccountIdExternalEventIdListsListIdAssociateByExternalAccountAndEventIds</summary>

Associates a HubSpot list with a marketing event by external account and event IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalAccountId` | `string` | Yes | The external account identifier. |
| `externalEventId` | `string` | Yes | The external event identifier. |
| `listId` | `string` | Yes | The HubSpot list ID to associate. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->putAssociationsExternalAccountIdExternalEventIdListsListIdAssociateByExternalAccountAndEventIds(
    "app-12345",
    "webinar-2026-03",
    "67890"
);
```

</details>

<details>
<summary>deleteAssociationsMarketingEventIdListsListIdDisassociateByMarketingEventId</summary>

Disassociates a HubSpot list from a marketing event by internal event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `marketingEventId` | `string` | Yes | The internal HubSpot marketing event ID. |
| `listId` | `string` | Yes | The HubSpot list ID to disassociate. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->deleteAssociationsMarketingEventIdListsListIdDisassociateByMarketingEventId("12345", "67890");
```

</details>

<details>
<summary>deleteAssociationsExternalAccountIdExternalEventIdListsListIdDisassociateByExternalAccountAndEventIds</summary>

Disassociates a HubSpot list from a marketing event by external account and event IDs.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalAccountId` | `string` | Yes | The external account identifier. |
| `externalEventId` | `string` | Yes | The external event identifier. |
| `listId` | `string` | Yes | The HubSpot list ID to disassociate. |

Returns: `error?`

Sample code:

```ballerina
check mktEventsClient->deleteAssociationsExternalAccountIdExternalEventIdListsListIdDisassociateByExternalAccountAndEventIds(
    "app-12345",
    "webinar-2026-03",
    "67890"
);
```

</details>

#### Search & discovery

<details>
<summary>getEventsSearchDoSearch</summary>

Searches for marketing events by a query string (searches external event IDs).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetEventsSearchDoSearchQueries` | No | Query parameters including `q` (search term). |

Returns: `CollectionResponseSearchPublicResponseWrapperNoPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getEventsSearchDoSearch(q = "webinar");
```

Sample response:

```ballerina
{"results": [{"id": "12345", "eventName": "Ballerina Integration Summit 2026", "externalEventId": "webinar-2026-03"}]}
```

</details>

<details>
<summary>getExternalEventIdIdentifiers</summary>

Finds all marketing event identifiers associated with an external event ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `externalEventId` | `string` | Yes | The external event identifier. |

Returns: `CollectionResponseWithTotalMarketingEventIdentifiersResponseNoPaging|error`

Sample code:

```ballerina
var response = check mktEventsClient->getExternalEventIdIdentifiers("webinar-2026-03");
```

Sample response:

```ballerina
{"total": 1, "results": [{"externalAccountId": "app-12345", "externalEventId": "webinar-2026-03", "objectId": "12345"}]}
```

</details>

#### App settings

<details>
<summary>getAppIdSettingsGetAll</summary>

Retrieves the event detail settings for a HubSpot app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |

Returns: `EventDetailSettings|error`

Sample code:

```ballerina
hsmktevents:EventDetailSettings settings = check mktEventsClient->getAppIdSettingsGetAll(12345);
```

Sample response:

```ballerina
{"appId": 12345, "eventDetailsUrl": "https://example.com/events/%s"}
```

</details>

<details>
<summary>postAppIdSettingsUpdate</summary>

Updates the event detail settings for a HubSpot app.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `int:Signed32` | Yes | The HubSpot app ID. |
| `payload` | `EventDetailSettingsUrl` | Yes | Updated event detail settings URL. |

Returns: `EventDetailSettings|error`

Sample code:

```ballerina
hsmktevents:EventDetailSettings settings = check mktEventsClient->postAppIdSettingsUpdate(
    12345,
    {eventDetailsUrl: "https://example.com/events/%s"}
);
```

Sample response:

```ballerina
{"appId": 12345, "eventDetailsUrl": "https://example.com/events/%s"}
```

</details>
