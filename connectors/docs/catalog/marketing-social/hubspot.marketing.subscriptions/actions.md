---
title: Actions
---

# Actions

The `ballerinax/hubspot.marketing.subscriptions` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages contact subscription statuses, opt-outs, and subscription definitions via the HubSpot Communication Preferences API v4. |

---

## Client

Manages contact subscription statuses, opt-outs, and subscription definitions via the HubSpot Communication Preferences API v4.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|ApiKeysConfig` | Required | OAuth 2.0 refresh token config, bearer token, or API key credentials. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | HTTP compression setting. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration. |
| `cache` | `http:CacheConfig` | `{}` | HTTP response cache configuration. |
| `validation` | `boolean` | `true` | Enable/disable constraint validation. |
| `laxDataBinding` | `boolean` | `true` | Enable/disable lax data binding. |

### Initializing the client

```ballerina
import ballerinax/hubspot.marketing.subscriptions as hsmsubscriptions;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string refreshToken = ?;

hsmsubscriptions:Client subscriptionsClient = check new ({
    auth: {
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        credentialBearer: oauth2:POST_BODY_BEARER
    }
});
```

### Operations

#### Subscription status: single contact

<details>
<summary>getCommunicationPreferencesV4StatusesSubscriberIdString</summary>

Retrieves the subscription statuses for a specific contact on a given channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberIdString` | `string` | Yes | The contact's subscriber ID (e.g., email address). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCommunicationPreferencesV4StatusesSubscriberIdStringQueries` | Yes | Query parameters including `channel` (required) and optional `businessUnitId`. |

Returns: `ActionResponseWithResultsPublicStatus|error`

Sample code:

```ballerina
hsmsubscriptions:ActionResponseWithResultsPublicStatus response =
    check subscriptionsClient->getCommunicationPreferencesV4StatusesSubscriberIdString(
        "user@example.com",
        queries = {channel: "EMAIL"}
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user@example.com",
      "subscriptionId": 12345,
      "subscriptionName": "Marketing Newsletter",
      "channel": "EMAIL",
      "status": "SUBSCRIBED",
      "source": "SUBSCRIPTION_STATUS",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "User opted in via website form",
      "timestamp": "2025-06-15T10:30:00Z"
    }
  ],
  "startedAt": "2025-06-15T10:30:00.123Z",
  "completedAt": "2025-06-15T10:30:00.456Z"
}
```

</details>

<details>
<summary>postCommunicationPreferencesV4StatusesSubscriberIdString</summary>

Updates the subscription status for a specific contact.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberIdString` | `string` | Yes | The contact's subscriber ID (e.g., email address). |
| `payload` | `PartialPublicStatusRequest` | Yes | The subscription status update payload including `statusState`, `channel`, and `subscriptionId`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `ActionResponseWithResultsPublicStatus|error`

Sample code:

```ballerina
hsmsubscriptions:ActionResponseWithResultsPublicStatus response =
    check subscriptionsClient->postCommunicationPreferencesV4StatusesSubscriberIdString(
        "user@example.com",
        {
            statusState: "SUBSCRIBED",
            channel: "EMAIL",
            subscriptionId: 12345,
            legalBasis: "CONSENT_WITH_NOTICE",
            legalBasisExplanation: "User opted in via website form"
        }
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user@example.com",
      "subscriptionId": 12345,
      "subscriptionName": "Marketing Newsletter",
      "channel": "EMAIL",
      "status": "SUBSCRIBED",
      "source": "SUBSCRIPTION_STATUS",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "User opted in via website form",
      "setStatusSuccessReason": "REQUESTED_CHANGE_OCCURRED",
      "timestamp": "2025-06-15T11:00:00Z"
    }
  ],
  "startedAt": "2025-06-15T11:00:00.123Z",
  "completedAt": "2025-06-15T11:00:00.456Z"
}
```

</details>

#### Unsubscribe all: single contact

<details>
<summary>getCommunicationPreferencesV4StatusesSubscriberIdStringUnsubscribeAll</summary>

Retrieves the opt-out-of-all (wide) status for a specific contact on a given channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberIdString` | `string` | Yes | The contact's subscriber ID (e.g., email address). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCommunicationPreferencesV4StatusesSubscriberIdStringUnsubscribeAllQueries` | Yes | Query parameters including `channel` (required), optional `businessUnitId` and `verbose`. |

Returns: `ActionResponseWithResultsPublicWideStatus|error`

Sample code:

```ballerina
hsmsubscriptions:ActionResponseWithResultsPublicWideStatus response =
    check subscriptionsClient->getCommunicationPreferencesV4StatusesSubscriberIdStringUnsubscribeAll(
        "user@example.com",
        queries = {channel: "EMAIL"}
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user@example.com",
      "channel": "EMAIL",
      "wideStatusType": "PORTAL_WIDE",
      "status": "SUBSCRIBED",
      "timestamp": "2025-06-15T10:30:00Z"
    }
  ],
  "startedAt": "2025-06-15T10:30:00.123Z",
  "completedAt": "2025-06-15T10:30:00.456Z"
}
```

</details>

<details>
<summary>postCommunicationPreferencesV4StatusesSubscriberIdStringUnsubscribeAll</summary>

Unsubscribes a contact from all communication subscriptions on a given channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriberIdString` | `string` | Yes | The contact's subscriber ID (e.g., email address). |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `PostCommunicationPreferencesV4StatusesSubscriberIdStringUnsubscribeAllQueries` | Yes | Query parameters including `channel` (required), optional `businessUnitId` and `verbose`. |

Returns: `ActionResponseWithResultsPublicStatus|error`

Sample code:

```ballerina
hsmsubscriptions:ActionResponseWithResultsPublicStatus response =
    check subscriptionsClient->postCommunicationPreferencesV4StatusesSubscriberIdStringUnsubscribeAll(
        "user@example.com",
        queries = {channel: "EMAIL"}
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user@example.com",
      "subscriptionId": 12345,
      "subscriptionName": "Marketing Newsletter",
      "channel": "EMAIL",
      "status": "UNSUBSCRIBED",
      "source": "SUBSCRIPTION_STATUS",
      "setStatusSuccessReason": "UNSUBSCRIBE_FROM_ALL_OCCURRED",
      "timestamp": "2025-06-15T11:00:00Z"
    }
  ],
  "startedAt": "2025-06-15T11:00:00.123Z",
  "completedAt": "2025-06-15T11:00:00.456Z"
}
```

</details>

#### Batch subscription operations

<details>
<summary>postCommunicationPreferencesV4StatusesBatchRead</summary>

Batch retrieves subscription statuses for multiple contacts on a given channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputString` | Yes | A batch input containing an array of subscriber ID strings. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `PostCommunicationPreferencesV4StatusesBatchReadQueries` | Yes | Query parameters including `channel` (required) and optional `businessUnitId`. |

Returns: `BatchResponsePublicStatusBulkResponse|BatchResponsePublicStatusBulkResponseWithErrors|error`

Sample code:

```ballerina
hsmsubscriptions:BatchResponsePublicStatusBulkResponse|hsmsubscriptions:BatchResponsePublicStatusBulkResponseWithErrors response =
    check subscriptionsClient->postCommunicationPreferencesV4StatusesBatchRead(
        {inputs: ["user1@example.com", "user2@example.com"]},
        queries = {channel: "EMAIL"}
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user1@example.com",
      "statuses": [
        {
          "subscriberIdString": "user1@example.com",
          "subscriptionId": 12345,
          "subscriptionName": "Marketing Newsletter",
          "channel": "EMAIL",
          "status": "SUBSCRIBED",
          "source": "SUBSCRIPTION_STATUS",
          "timestamp": "2025-06-15T10:30:00Z"
        }
      ]
    },
    {
      "subscriberIdString": "user2@example.com",
      "statuses": [
        {
          "subscriberIdString": "user2@example.com",
          "subscriptionId": 12345,
          "subscriptionName": "Marketing Newsletter",
          "channel": "EMAIL",
          "status": "UNSUBSCRIBED",
          "source": "SUBSCRIPTION_STATUS",
          "timestamp": "2025-06-15T09:00:00Z"
        }
      ]
    }
  ],
  "startedAt": "2025-06-15T10:30:00.123Z",
  "completedAt": "2025-06-15T10:30:00.789Z"
}
```

</details>

<details>
<summary>postCommunicationPreferencesV4StatusesBatchWrite</summary>

Batch updates subscription statuses for multiple contacts.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputPublicStatusRequest` | Yes | A batch input containing an array of `PublicStatusRequest` records. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |

Returns: `BatchResponsePublicStatus|error`

Sample code:

```ballerina
hsmsubscriptions:BatchResponsePublicStatus response =
    check subscriptionsClient->postCommunicationPreferencesV4StatusesBatchWrite({
        inputs: [
            {
                subscriberIdString: "user1@example.com",
                statusState: "SUBSCRIBED",
                channel: "EMAIL",
                subscriptionId: 12345,
                legalBasis: "CONSENT_WITH_NOTICE",
                legalBasisExplanation: "Re-subscribed via preference center"
            },
            {
                subscriberIdString: "user2@example.com",
                statusState: "SUBSCRIBED",
                channel: "EMAIL",
                subscriptionId: 12345,
                legalBasis: "CONSENT_WITH_NOTICE",
                legalBasisExplanation: "Re-subscribed via preference center"
            }
        ]
    });
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user1@example.com",
      "subscriptionId": 12345,
      "subscriptionName": "Marketing Newsletter",
      "channel": "EMAIL",
      "status": "SUBSCRIBED",
      "source": "SUBSCRIPTION_STATUS",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "Re-subscribed via preference center",
      "setStatusSuccessReason": "REQUESTED_CHANGE_OCCURRED",
      "timestamp": "2025-06-15T11:00:00Z"
    },
    {
      "subscriberIdString": "user2@example.com",
      "subscriptionId": 12345,
      "subscriptionName": "Marketing Newsletter",
      "channel": "EMAIL",
      "status": "SUBSCRIBED",
      "source": "SUBSCRIPTION_STATUS",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "Re-subscribed via preference center",
      "setStatusSuccessReason": "REQUESTED_CHANGE_OCCURRED",
      "timestamp": "2025-06-15T11:00:00Z"
    }
  ],
  "startedAt": "2025-06-15T11:00:00.123Z",
  "completedAt": "2025-06-15T11:00:00.789Z"
}
```

</details>

<details>
<summary>postCommunicationPreferencesV4StatusesBatchUnsubscribeAll</summary>

Batch unsubscribes multiple contacts from all communication subscriptions on a given channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputString` | Yes | A batch input containing an array of subscriber ID strings. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `PostCommunicationPreferencesV4StatusesBatchUnsubscribeAllQueries` | Yes | Query parameters including `channel` (required), optional `businessUnitId` and `verbose`. |

Returns: `BatchResponsePublicBulkOptOutFromAllResponse|error`

Sample code:

```ballerina
hsmsubscriptions:BatchResponsePublicBulkOptOutFromAllResponse response =
    check subscriptionsClient->postCommunicationPreferencesV4StatusesBatchUnsubscribeAll(
        {inputs: ["user1@example.com", "user2@example.com"]},
        queries = {channel: "EMAIL"}
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user1@example.com",
      "statuses": [
        {
          "subscriberIdString": "user1@example.com",
          "subscriptionId": 12345,
          "channel": "EMAIL",
          "status": "UNSUBSCRIBED",
          "source": "SUBSCRIPTION_STATUS",
          "timestamp": "2025-06-15T11:00:00Z"
        }
      ]
    },
    {
      "subscriberIdString": "user2@example.com",
      "statuses": [
        {
          "subscriberIdString": "user2@example.com",
          "subscriptionId": 12345,
          "channel": "EMAIL",
          "status": "UNSUBSCRIBED",
          "source": "SUBSCRIPTION_STATUS",
          "timestamp": "2025-06-15T11:00:00Z"
        }
      ]
    }
  ],
  "startedAt": "2025-06-15T11:00:00.123Z",
  "completedAt": "2025-06-15T11:00:00.789Z"
}
```

</details>

<details>
<summary>postCommunicationPreferencesV4StatusesBatchUnsubscribeAllRead</summary>

Batch retrieves the opt-out-of-all (wide) statuses for multiple contacts on a given channel.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BatchInputString` | Yes | A batch input containing an array of subscriber ID strings. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `PostCommunicationPreferencesV4StatusesBatchUnsubscribeAllReadQueries` | Yes | Query parameters including `channel` (required) and optional `businessUnitId`. |

Returns: `BatchResponsePublicWideStatusBulkResponse|BatchResponsePublicWideStatusBulkResponseWithErrors|error`

Sample code:

```ballerina
hsmsubscriptions:BatchResponsePublicWideStatusBulkResponse|hsmsubscriptions:BatchResponsePublicWideStatusBulkResponseWithErrors response =
    check subscriptionsClient->postCommunicationPreferencesV4StatusesBatchUnsubscribeAllRead(
        {inputs: ["user1@example.com", "user2@example.com"]},
        queries = {channel: "EMAIL"}
    );
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "subscriberIdString": "user1@example.com",
      "wideStatuses": [
        {
          "subscriberIdString": "user1@example.com",
          "channel": "EMAIL",
          "wideStatusType": "PORTAL_WIDE",
          "status": "SUBSCRIBED",
          "timestamp": "2025-06-15T10:30:00Z"
        }
      ]
    },
    {
      "subscriberIdString": "user2@example.com",
      "wideStatuses": [
        {
          "subscriberIdString": "user2@example.com",
          "channel": "EMAIL",
          "wideStatusType": "PORTAL_WIDE",
          "status": "UNSUBSCRIBED",
          "timestamp": "2025-06-15T09:00:00Z"
        }
      ]
    }
  ],
  "startedAt": "2025-06-15T10:30:00.123Z",
  "completedAt": "2025-06-15T10:30:00.789Z"
}
```

</details>

#### Subscription definitions

<details>
<summary>getCommunicationPreferencesV4Definitions</summary>

Retrieves all subscription definitions configured in the HubSpot portal.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetCommunicationPreferencesV4DefinitionsQueries` | No | Query parameters including optional `includeTranslations` and `businessUnitId`. |

Returns: `ActionResponseWithResultsSubscriptionDefinition|error`

Sample code:

```ballerina
hsmsubscriptions:ActionResponseWithResultsSubscriptionDefinition response =
    check subscriptionsClient->getCommunicationPreferencesV4Definitions();
```

Sample response:

```ballerina
{
  "status": "COMPLETE",
  "results": [
    {
      "id": "12345",
      "name": "Marketing Newsletter",
      "description": "Monthly marketing updates and product news",
      "purpose": "Marketing",
      "communicationMethod": "Email",
      "isActive": true,
      "isDefault": false,
      "isInternal": false,
      "createdAt": "2024-01-15T08:00:00Z",
      "updatedAt": "2025-03-10T14:30:00Z"
    },
    {
      "id": "12346",
      "name": "Product Updates",
      "description": "Notifications about new features and releases",
      "purpose": "Marketing",
      "communicationMethod": "Email",
      "isActive": true,
      "isDefault": false,
      "isInternal": false,
      "createdAt": "2024-02-20T10:00:00Z",
      "updatedAt": "2025-03-10T14:30:00Z"
    }
  ],
  "startedAt": "2025-06-15T10:30:00.123Z",
  "completedAt": "2025-06-15T10:30:00.456Z"
}
```

</details>
