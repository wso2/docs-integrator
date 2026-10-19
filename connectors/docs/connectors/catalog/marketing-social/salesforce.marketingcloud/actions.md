---
title: Actions
---

# Actions

The `ballerinax/salesforce.marketingcloud` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides programmatic access to Salesforce Marketing Cloud REST APIs for journeys, events, campaigns, contacts, data extensions, assets, and messaging. |

---

## Client

Provides programmatic access to Salesforce Marketing Cloud REST APIs for journeys, events, campaigns, contacts, data extensions, assets, and messaging.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials configuration with `clientId`, `clientSecret`, and `accountId`. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `circuitBreaker` | `CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `cache` | `CacheConfig` | `{}` | HTTP caching configuration. |
| `compression` | `Compression` | `AUTO` | HTTP compression setting. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Enable/disable lax data binding for responses. |

### Initializing the client

```ballerina
import ballerinax/salesforce.marketingcloud as mc;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string subDomain = ?;
configurable string accountId = ?;

mc:Client mcClient = check new (subDomain, {
    auth: {
        clientId,
        clientSecret,
        accountId
    }
});
```

### Operations

#### Event management

<details>
<summary>getEventDefinitions</summary>

Retrieves a list of event definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetEventDefinitionsQueries` | No | Query parameters for filtering and pagination. |

Returns: `EventDefinitionList|error`

Sample code:

```ballerina
mc:EventDefinitionList events = check mcClient->getEventDefinitions();
```

Sample response:

```ballerina
{"count": 2, "items": [{"id": "a1b2c3d4", "name": "Welcome Event", "type": "APIEvent", "eventDefinitionKey": "welcome-event-key"}, {"id": "e5f6g7h8", "name": "Purchase Event", "type": "APIEvent", "eventDefinitionKey": "purchase-event-key"}]}
```

</details>

<details>
<summary>createEventDefinition</summary>

Creates a new event definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EventDefinition` | Yes | The event definition to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EventDefinition|error`

Sample code:

```ballerina
mc:EventDefinition event = check mcClient->createEventDefinition({
    name: "New Signup Event",
    'type: "APIEvent",
    eventDefinitionKey: "new-signup-event"
});
```

Sample response:

```ballerina
{"id": "f9e8d7c6", "name": "New Signup Event", "type": "APIEvent", "eventDefinitionKey": "new-signup-event", "createdDate": "2025-01-15T10:30:00Z"}
```

</details>

<details>
<summary>getEventDefinitionByKey</summary>

Retrieves an event definition by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventDefinitionKey` | `string` | Yes | Key of the event definition. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EventDefinition|error`

Sample code:

```ballerina
mc:EventDefinition event = check mcClient->getEventDefinitionByKey("welcome-event-key");
```

Sample response:

```ballerina
{"id": "a1b2c3d4", "name": "Welcome Event", "type": "APIEvent", "eventDefinitionKey": "welcome-event-key"}
```

</details>

<details>
<summary>updateEventDefinitionByKey</summary>

Updates an event definition identified by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventDefinitionKey` | `string` | Yes | Key of the event definition. |
| `payload` | `EventDefinition` | Yes | Updated event definition payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EventDefinition|error`

Sample code:

```ballerina
mc:EventDefinition updated = check mcClient->updateEventDefinitionByKey("welcome-event-key", {
    name: "Updated Welcome Event",
    'type: "APIEvent",
    eventDefinitionKey: "welcome-event-key"
});
```

Sample response:

```ballerina
{"id": "a1b2c3d4", "name": "Updated Welcome Event", "type": "APIEvent", "eventDefinitionKey": "welcome-event-key"}
```

</details>

<details>
<summary>deleteEventDefinitionByKey</summary>

Deletes an event definition by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventDefinitionKey` | `string` | Yes | Key of the event definition. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `json|error`

Sample code:

```ballerina
json result = check mcClient->deleteEventDefinitionByKey("welcome-event-key");
```

Sample response:

```ballerina
{"message": "Event definition deleted successfully"}
```

</details>

<details>
<summary>updateEventDefinitionById</summary>

Updates an event definition identified by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventDefinitionId` | `string` | Yes | ID of the event definition. |
| `payload` | `EventDefinition` | Yes | Updated event definition payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EventDefinition|error`

Sample code:

```ballerina
mc:EventDefinition updated = check mcClient->updateEventDefinitionById("a1b2c3d4", {
    name: "Renamed Event",
    'type: "APIEvent",
    eventDefinitionKey: "welcome-event-key"
});
```

Sample response:

```ballerina
{"id": "a1b2c3d4", "name": "Renamed Event", "type": "APIEvent", "eventDefinitionKey": "welcome-event-key"}
```

</details>

<details>
<summary>deleteEventDefinitionById</summary>

Deletes an event definition by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `eventDefinitionId` | `string` | Yes | ID of the event definition. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `json|error`

Sample code:

```ballerina
json result = check mcClient->deleteEventDefinitionById("a1b2c3d4");
```

Sample response:

```ballerina
{"message": "Event definition deleted successfully"}
```

</details>

<details>
<summary>fireEntryEvent</summary>

Fires an entry event to inject a contact into a journey.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `FireEvent` | Yes | The event payload with contact key and event data. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `FireEventResponse|error`

Sample code:

```ballerina
mc:FireEventResponse res = check mcClient->fireEntryEvent({
    contactKey: "user@example.com",
    eventDefinitionKey: "welcome-event-key",
    data: {
        "Email": "user@example.com",
        "FirstName": "Jane"
    }
});
```

Sample response:

```ballerina
{"requestId": "r1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6", "eventInstanceId": "e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6"}
```

</details>

#### Journey management

<details>
<summary>getJourneys</summary>

Retrieves a list of journeys (interactions).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetJourneysQueries` | No | Query parameters for filtering and pagination. |

Returns: `JourneysList|error`

Sample code:

```ballerina
mc:JourneysList journeys = check mcClient->getJourneys();
```

Sample response:

```ballerina
{"count": 1, "items": [{"id": "j1a2b3c4-d5e6-f7g8-h9i0", "key": "seasonal-journey", "name": "Seasonal Journey", "status": "Published", "version": 1}]}
```

</details>

<details>
<summary>createJourney</summary>

Creates a new journey (interaction).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Journey` | Yes | The journey definition to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Journey|error`

Sample code:

```ballerina
mc:Journey journey = check mcClient->createJourney({
    name: "Welcome Journey",
    'key: "welcome-journey-key"
});
```

Sample response:

```ballerina
{"id": "j9e8d7c6-b5a4-3210", "key": "welcome-journey-key", "name": "Welcome Journey", "status": "Draft", "version": 1}
```

</details>

<details>
<summary>updateJourney</summary>

Updates an existing journey version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UpdateJourney` | Yes | Updated journey payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Journey|error`

Sample code:

```ballerina
mc:Journey updated = check mcClient->updateJourney({
    id: "j1a2b3c4-d5e6-f7g8-h9i0",
    name: "Updated Seasonal Journey",
    'key: "seasonal-journey"
});
```

Sample response:

```ballerina
{"id": "j1a2b3c4-d5e6-f7g8-h9i0", "key": "seasonal-journey", "name": "Updated Seasonal Journey", "status": "Draft", "version": 2}
```

</details>

<details>
<summary>getJourneyById</summary>

Retrieves a journey by its ID (UUID).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journeyId` | `string` | Yes | ID of version 1 of the journey (UUID). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetJourneyByIdQueries` | No | Query parameters (e.g., extras). |

Returns: `Journey|error`

Sample code:

```ballerina
mc:Journey journey = check mcClient->getJourneyById("j1a2b3c4-d5e6-f7g8-h9i0");
```

Sample response:

```ballerina
{"id": "j1a2b3c4-d5e6-f7g8-h9i0", "key": "seasonal-journey", "name": "Seasonal Journey", "status": "Published", "version": 1}
```

</details>

<details>
<summary>updateJourneyById</summary>

Updates an existing journey by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journeyId` | `string` | Yes | ID of the journey (UUID). |
| `payload` | `UpdateJourney` | Yes | Updated journey payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Journey|error`

Sample code:

```ballerina
mc:Journey updated = check mcClient->updateJourneyById("j1a2b3c4-d5e6-f7g8-h9i0", {
    name: "Renamed Journey"
});
```

Sample response:

```ballerina
{"id": "j1a2b3c4-d5e6-f7g8-h9i0", "name": "Renamed Journey", "status": "Draft", "version": 2}
```

</details>

<details>
<summary>deleteJourneyById</summary>

Deletes a journey by its ID. Deletes all versions unless a version number is specified.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `journeyId` | `string` | Yes | ID of the journey (UUID). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `DeleteJourneyByIdQueries` | No | Query parameters (e.g., versionNumber). |

Returns: `json|error`

Sample code:

```ballerina
json result = check mcClient->deleteJourneyById("j1a2b3c4-d5e6-f7g8-h9i0");
```

Sample response:

```ballerina
{"message": "Journey deleted successfully"}
```

</details>

<details>
<summary>getJourneyByKey</summary>

Retrieves a journey by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key of the journey. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetJourneyByKeyQueries` | No | Query parameters (e.g., extras). |

Returns: `Journey|error`

Sample code:

```ballerina
mc:Journey journey = check mcClient->getJourneyByKey("seasonal-journey");
```

Sample response:

```ballerina
{"id": "j1a2b3c4-d5e6-f7g8-h9i0", "key": "seasonal-journey", "name": "Seasonal Journey", "status": "Published", "version": 1}
```

</details>

<details>
<summary>updateJourneyByKey</summary>

Updates an existing journey by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | The key of the journey. |
| `payload` | `UpdateJourney` | Yes | Updated journey payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Journey|error`

Sample code:

```ballerina
mc:Journey updated = check mcClient->updateJourneyByKey("seasonal-journey", {
    name: "Updated Seasonal Journey"
});
```

Sample response:

```ballerina
{"id": "j1a2b3c4-d5e6-f7g8-h9i0", "key": "seasonal-journey", "name": "Updated Seasonal Journey", "status": "Draft", "version": 2}
```

</details>

<details>
<summary>deleteJourneyByKey</summary>

Deletes a journey by its key. Deletes all versions unless a version number is specified.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | Yes | Key of the journey. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `DeleteJourneyByKeyQueries` | No | Query parameters (e.g., versionNumber). |

Returns: `json|error`

Sample code:

```ballerina
json result = check mcClient->deleteJourneyByKey("seasonal-journey");
```

Sample response:

```ballerina
{"message": "Journey deleted successfully"}
```

</details>

#### Contact membership & exit

<details>
<summary>getContactMembership</summary>

Retrieves the list of journeys a contact is currently enrolled in.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContactMembershipRequest` | Yes | Request containing contact key list. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ContactMembershipResponse|error`

Sample code:

```ballerina
mc:ContactMembershipResponse membership = check mcClient->getContactMembership({
    contactKeyList: ["user@example.com"]
});
```

Sample response:

```ballerina
{"results": {"contactMemberships": [{"contactKey": "user@example.com", "definitionKey": "aa0c871b-d1eb-66fb-c039-0a7cab4e20cd", "journeyName": "Seasonal Journey", "status": "Active"}]}}
```

</details>

<details>
<summary>removeContactFromJourney</summary>

Removes a contact from a journey.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContactExitRequest` | Yes | Contact exit request payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ContactExitResponse|error`

Sample code:

```ballerina
mc:ContactExitResponse res = check mcClient->removeContactFromJourney({
    contactKey: "user@example.com",
    definitionKey: "seasonal-journey-key"
});
```

Sample response:

```ballerina
{"status": "Accepted", "message": "Contact exit request received"}
```

</details>

<details>
<summary>getContactExitStatus</summary>

Retrieves the exit status of a contact removal request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContactExitRequest` | Yes | Contact exit request to check status for. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ContactExitStatusResponse|error`

Sample code:

```ballerina
mc:ContactExitStatusResponse status = check mcClient->getContactExitStatus({
    contactKey: "user@example.com",
    definitionKey: "seasonal-journey-key"
});
```

Sample response:

```ballerina
{"contactKey": "user@example.com", "definitionKey": "seasonal-journey-key", "status": "Completed"}
```

</details>

#### Email validation

<details>
<summary>validateEmail</summary>

Validates an email address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ValidateEmailRequest` | Yes | Request containing the email to validate. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ValidateEmailResponse|error`

Sample code:

```ballerina
mc:ValidateEmailResponse validation = check mcClient->validateEmail({
    email: "user@example.com"
});
```

Sample response:

```ballerina
{"valid": true, "email": "user@example.com"}
```

</details>

#### Campaign management

<details>
<summary>getCampaigns</summary>

Retrieves a list of campaigns.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCampaignsQueries` | No | Query parameters for filtering and pagination. |

Returns: `CampaignList|error`

Sample code:

```ballerina
mc:CampaignList campaigns = check mcClient->getCampaigns();
```

Sample response:

```ballerina
{"count": 2, "items": [{"id": "c001", "name": "Spring Sale 2025", "description": "Spring promotional campaign", "createdDate": "2025-03-01T00:00:00Z"}, {"id": "c002", "name": "Summer Campaign", "description": "Summer outreach", "createdDate": "2025-06-01T00:00:00Z"}]}
```

</details>

<details>
<summary>createCampaign</summary>

Creates a new campaign.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UpsertCampaign` | Yes | Campaign details to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Campaign|error`

Sample code:

```ballerina
mc:Campaign campaign = check mcClient->createCampaign({
    name: "Holiday Campaign 2025",
    description: "End-of-year holiday promotions"
});
```

Sample response:

```ballerina
{"id": "c003", "name": "Holiday Campaign 2025", "description": "End-of-year holiday promotions", "createdDate": "2025-11-01T10:00:00Z"}
```

</details>

<details>
<summary>updateCampaign</summary>

Updates an existing campaign by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | ID of the campaign to update. |
| `payload` | `UpsertCampaign` | Yes | Updated campaign details. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Campaign|error`

Sample code:

```ballerina
mc:Campaign updated = check mcClient->updateCampaign("c003", {
    name: "Holiday Campaign 2025 (Updated)",
    description: "Revised holiday promotions"
});
```

Sample response:

```ballerina
{"id": "c003", "name": "Holiday Campaign 2025 (Updated)", "description": "Revised holiday promotions", "createdDate": "2025-11-01T10:00:00Z"}
```

</details>

<details>
<summary>deleteCampaign</summary>

Deletes a campaign by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | ID of the campaign to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check mcClient->deleteCampaign("c003");
```

</details>

#### Data extension operations

<details>
<summary>upsertDERowSetByKey</summary>

Upserts (inserts or updates) a set of rows in a Data Extension by its external key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dEExternalKey` | `string` | Yes | External key of the Data Extension. |
| `payload` | `DataExtensionRowSet` | Yes | Array of row objects with keys and values. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DataExtensionRowSet|error`

Sample code:

```ballerina
mc:DataExtensionRowSet result = check mcClient->upsertDERowSetByKey("DecSeasonal25", [
    {
        keys: {"id": "user-001"},
        values: {
            "SubscriberKey": "user@example.com",
            "EmailAddress": "user@example.com"
        }
    }
]);
```

Sample response:

```ballerina
[{"keys": {"id": "user-001"}, "values": {"SubscriberKey": "user@example.com", "EmailAddress": "user@example.com"}}]
```

</details>

<details>
<summary>deleteDERowSetByKey</summary>

Deletes a set of rows from a Data Extension by its external key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dEExternalKey` | `string` | Yes | External key of the Data Extension. |
| `payload` | `DataExtensionRowSet` | Yes | Array of row objects identifying rows to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `DataExtensionRowSet|error`

Sample code:

```ballerina
mc:DataExtensionRowSet deleted = check mcClient->deleteDERowSetByKey("DecSeasonal25", [
    {
        keys: {"id": "user-001"}
    }
]);
```

Sample response:

```ballerina
[{"keys": {"id": "user-001"}, "values": {}}]
```

</details>

<details>
<summary>upsertDERowSetByKeyAsync</summary>

Asynchronously upserts a set of rows in a Data Extension by its external key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dEExternalKey` | `string` | Yes | External key of the Data Extension. |
| `payload` | `DataExtensionRowSet` | Yes | Array of row objects with keys and values. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check mcClient->upsertDERowSetByKeyAsync("DecSeasonal25", [
    {
        keys: {"id": "user-002"},
        values: {
            "SubscriberKey": "user2@example.com",
            "EmailAddress": "user2@example.com"
        }
    }
]);
```

</details>

<details>
<summary>deleteDERowSetByKeyAsync</summary>

Asynchronously deletes a set of rows from a Data Extension by its external key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dEExternalKey` | `string` | Yes | External key of the Data Extension. |
| `payload` | `DataExtensionRowSet` | Yes | Array of row objects identifying rows to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `error?`

Sample code:

```ballerina
check mcClient->deleteDERowSetByKeyAsync("DecSeasonal25", [
    {
        keys: {"id": "user-002"}
    }
]);
```

</details>

#### Contact management

<details>
<summary>searchContactsByAttribute</summary>

Searches contacts by a specific attribute name.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `attributeName` | `ContactAttributeName` | Yes | The attribute name to search by. |
| `payload` | `ContactAttributeFilterCondition` | Yes | Filter conditions for the search. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SearchContactsByAttributeResponse|error`

Sample code:

```ballerina
mc:SearchContactsByAttributeResponse contacts = check mcClient->searchContactsByAttribute("email", {
    conditionSet: [{
        condition: {
            attribute: {
                key: "Email Address"
            },
            operator: "Equals",
            value: {items: ["user@example.com"]}
        }
    }]
});
```

Sample response:

```ballerina
{"items": [{"contactKey": "user-001", "values": {"Email Address": "user@example.com"}}]}
```

</details>

<details>
<summary>searchContactsByEmail</summary>

Searches contacts by email address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchContactsByEmailRequest` | Yes | Request containing email addresses to search. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SearchContactsByEmailResponse|error`

Sample code:

```ballerina
mc:SearchContactsByEmailResponse results = check mcClient->searchContactsByEmail({
    emailAddresses: ["user@example.com"]
});
```

Sample response:

```ballerina
{"items": [{"contactKey": "user-001", "emailAddress": "user@example.com", "status": "Active"}]}
```

</details>

<details>
<summary>createContact</summary>

Creates a new contact.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UpsertContactRequest` | Yes | Contact details to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `UpsertContactResponse|error`

Sample code:

```ballerina
mc:UpsertContactResponse res = check mcClient->createContact({
    contactKey: "user-003",
    attributeSets: []
});
```

Sample response:

```ballerina
{"contactKey": "user-003", "operationStatus": "Created"}
```

</details>

<details>
<summary>updateContact</summary>

Updates an existing contact.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UpsertContactRequest` | Yes | Updated contact details. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `UpsertContactResponse|error`

Sample code:

```ballerina
mc:UpsertContactResponse res = check mcClient->updateContact({
    contactKey: "user-003",
    attributeSets: []
});
```

Sample response:

```ballerina
{"contactKey": "user-003", "operationStatus": "Updated"}
```

</details>

<details>
<summary>deleteContact</summary>

Submits a contact delete request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContactDeleteRequest` | Yes | Contact delete request payload. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `DeleteContactQueries` | No | Query parameters for the delete operation. |

Returns: `ContactDeleteResponse|error`

Sample code:

```ballerina
mc:ContactDeleteResponse res = check mcClient->deleteContact({
    contactKeys: ["user-003"]
});
```

Sample response:

```ballerina
{"requestId": "del-001", "status": "Accepted"}
```

</details>

<details>
<summary>getContactDeleteRequests</summary>

Retrieves details of contact delete requests.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetContactDeleteRequestsQueries` | No | Query parameters for filtering. |

Returns: `ContactDeleteRequestsResponse|error`

Sample code:

```ballerina
mc:ContactDeleteRequestsResponse requests = check mcClient->getContactDeleteRequests();
```

Sample response:

```ballerina
{"items": [{"requestId": "del-001", "status": "Completed", "completedDate": "2025-01-16T12:00:00Z"}]}
```

</details>

#### Contact preferences

<details>
<summary>getContactPreferencesByKey</summary>

Retrieves contact preferences by contact key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contactKey` | `string` | Yes | The contact key. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ContactPreferencesResponse|error`

Sample code:

```ballerina
mc:ContactPreferencesResponse prefs = check mcClient->getContactPreferencesByKey("user-001");
```

Sample response:

```ballerina
{"contactKey": "user-001", "preferences": {"email": {"optedIn": true}, "sms": {"optedIn": false}}}
```

</details>

<details>
<summary>upsertContactPreferences</summary>

Creates or updates contact preferences.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ContactPreferencesRequest` | Yes | Preference data to upsert. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `UpsertContactPreferencesResponse|error`

Sample code:

```ballerina
mc:UpsertContactPreferencesResponse res = check mcClient->upsertContactPreferences({
    contactKey: "user-001",
    preferences: {}
});
```

Sample response:

```ballerina
{"contactKey": "user-001", "operationStatus": "Updated"}
```

</details>

<details>
<summary>searchContactPreferences</summary>

Searches contact preferences based on filter criteria.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SearchPreferencesRequest` | Yes | Search criteria for preferences. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `SearchContactPreferencesQueries` | No | Query parameters for pagination. |

Returns: `SearchPreferencesResponse|error`

Sample code:

```ballerina
mc:SearchPreferencesResponse results = check mcClient->searchContactPreferences({
    contactKeyList: ["user-001", "user-002"]
});
```

Sample response:

```ballerina
{"items": [{"contactKey": "user-001", "preferences": {"email": {"optedIn": true}}}, {"contactKey": "user-002", "preferences": {"email": {"optedIn": false}}}]}
```

</details>

#### Asset management

<details>
<summary>getAssets</summary>

Retrieves a list of content assets from Content Builder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetAssetsQueries` | No | Query parameters for filtering and pagination. |

Returns: `AssetList|error`

Sample code:

```ballerina
mc:AssetList assets = check mcClient->getAssets();
```

Sample response:

```ballerina
{"count": 1, "items": [{"id": 1001, "name": "hero-banner.png", "assetType": {"name": "png", "id": 28}, "category": {"id": 50, "name": "Images"}}]}
```

</details>

<details>
<summary>createAsset</summary>

Creates a new content asset in Content Builder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `UpsertAsset` | Yes | Asset details including name, type, category, and file data. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Asset|error`

Sample code:

```ballerina
mc:Asset asset = check mcClient->createAsset({
    name: "promo-image.png",
    category: {"id": 50},
    assetType: {"name": "png", "id": 28}
});
```

Sample response:

```ballerina
{"id": 1002, "name": "promo-image.png", "assetType": {"name": "png", "id": 28}, "category": {"id": 50, "name": "Images"}, "createdDate": "2025-01-15T10:00:00Z"}
```

</details>

<details>
<summary>updateAsset</summary>

Updates an existing content asset by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | ID of the content asset. |
| `payload` | `UpsertAsset` | Yes | Updated asset details. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Asset|error`

Sample code:

```ballerina
mc:Asset updated = check mcClient->updateAsset(1002, {
    name: "promo-image-v2.png",
    category: {"id": 50},
    assetType: {"name": "png", "id": 28}
});
```

Sample response:

```ballerina
{"id": 1002, "name": "promo-image-v2.png", "assetType": {"name": "png", "id": 28}, "category": {"id": 50, "name": "Images"}}
```

</details>

<details>
<summary>deleteAsset</summary>

Deletes a content asset by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | ID of the content asset to delete. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `DeleteAssetQueries` | No | Query parameters for the delete operation. |

Returns: `error?`

Sample code:

```ballerina
check mcClient->deleteAsset(1002);
```

</details>

#### Category management

<details>
<summary>getCategories</summary>

Retrieves a list of content categories from Content Builder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCategoriesQueries` | No | Query parameters for filtering and pagination. |

Returns: `CategoryList|error`

Sample code:

```ballerina
mc:CategoryList categories = check mcClient->getCategories();
```

Sample response:

```ballerina
{"count": 2, "items": [{"id": 50, "name": "Images", "parentId": 0}, {"id": 51, "name": "Templates", "parentId": 0}]}
```

</details>

<details>
<summary>createCategory</summary>

Creates a new content category in Content Builder.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateCategory` | Yes | Category details. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `Category|error`

Sample code:

```ballerina
mc:Category category = check mcClient->createCategory({
    name: "Campaign Assets",
    parentId: 0
});
```

Sample response:

```ballerina
{"id": 52, "name": "Campaign Assets", "parentId": 0}
```

</details>

#### Email messaging

<details>
<summary>getEmailDefinitions</summary>

Retrieves a list of email definitions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetEmailDefinitionsQueries` | No | Query parameters for filtering and pagination. |

Returns: `EmailDefinitionList|error`

Sample code:

```ballerina
mc:EmailDefinitionList emailDefs = check mcClient->getEmailDefinitions();
```

Sample response:

```ballerina
{"count": 1, "definitions": [{"definitionKey": "welcome-email", "name": "Welcome Email", "status": "Active"}]}
```

</details>

<details>
<summary>createEmailDefinition</summary>

Creates a new email definition for transactional messaging.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateEmailDefinition` | Yes | Email definition details. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `EmailDefinition|error`

Sample code:

```ballerina
mc:EmailDefinition emailDef = check mcClient->createEmailDefinition({
    name: "Order Confirmation",
    definitionKey: "order-confirmation",
    content: {
        customerKey: "order-confirm-content"
    }
});
```

Sample response:

```ballerina
{"definitionKey": "order-confirmation", "name": "Order Confirmation", "status": "Active", "createdDate": "2025-01-15T10:00:00Z"}
```

</details>

<details>
<summary>sendEmailMessage</summary>

Sends a transactional email message using an email definition.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `SendEmailMessageRequest` | Yes | Email send request with recipient and definition key. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `SendEmailMessageResponse|error`

Sample code:

```ballerina
mc:SendEmailMessageResponse res = check mcClient->sendEmailMessage({
    definitionKey: "order-confirmation",
    recipient: {
        contactKey: "user@example.com",
        to: "user@example.com"
    }
});
```

Sample response:

```ballerina
{"requestId": "msg-001", "responses": [{"messageKey": "mk-001", "status": "Accepted"}]}
```

</details>

#### Bulk data operations

<details>
<summary>importDataExtensionAsync</summary>

Submits an asynchronous import request for a Data Extension file.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ImportRequest` | Yes | Import request details including file location and Data Extension key. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ImportResponse|error`

Sample code:

```ballerina
mc:ImportResponse res = check mcClient->importDataExtensionAsync({
    dataExtensionKey: "DecSeasonal25",
    fileName: "contacts.csv"
});
```

Sample response:

```ballerina
{"importId": 12345, "status": "Accepted", "message": "Import request accepted for processing"}
```

</details>

<details>
<summary>getImportSummary</summary>

Retrieves the summary of a Data Extension import operation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `int` | Yes | The unique identifier for the import operation. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ImportSummaryResponse|error`

Sample code:

```ballerina
mc:ImportSummaryResponse summary = check mcClient->getImportSummary(12345);
```

Sample response:

```ballerina
{"importId": 12345, "status": "Completed", "totalRows": 500, "importedRows": 498, "skippedRows": 2}
```

</details>

<details>
<summary>createBulkIngestJob</summary>

Creates a bulk ingest job to insert rows into a Data Extension.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateBulkIngestJob` | Yes | Bulk ingest job configuration. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `CreateBulkIngestJobResponse|error`

Sample code:

```ballerina
mc:CreateBulkIngestJobResponse job = check mcClient->createBulkIngestJob({
    dataExtensionKey: "DecSeasonal25"
});
```

Sample response:

```ballerina
{"jobId": "bulk-001", "status": "Created", "dataExtensionKey": "DecSeasonal25"}
```

</details>
