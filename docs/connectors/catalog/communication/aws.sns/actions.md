---
title: Actions
---

# Actions

The `ballerinax/aws.sns` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides operations to interact with AWS SNS: topic management, publishing, subscriptions, platform applications, SMS, and more. |

---

## Client

Provides operations to interact with AWS SNS: topic management, publishing, subscriptions, platform applications, SMS, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accessKeyId` | `string` | Required | AWS access key ID. |
| `secretAccessKey` | `string` | Required | AWS secret access key. |
| `region` | `string` | `"us-east-1"` | AWS region for the SNS service. |
| `securityToken` | `string` | `()` | AWS security token for temporary credentials (e.g., from STS AssumeRole). |

### Initializing the client

```ballerina
import ballerinax/aws.sns;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string region = ?;

sns:Client snsClient = check new ({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
});
```

### Operations

#### Topic management

<details>
<summary>createTopic</summary>

Creates a new SNS topic and returns its ARN.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name of the topic to create. |
| `attributes` | `InitializableTopicAttributes` | No | Optional topic attributes such as delivery policy, display name, FIFO settings, etc. |
| `dataProtectionPolicy` | `json` | No | Optional data protection policy for the topic. |
| `tags` | `map<string>` | No | Optional key-value tags to associate with the topic. |

Returns: `string|error`

Sample code:

```ballerina
string topicArn = check snsClient->createTopic("WeatherAlerts");
```

Sample response:

```ballerina
"arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
```

</details>

<details>
<summary>deleteTopic</summary>

Deletes an SNS topic and all its subscriptions.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic to delete. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->deleteTopic("arn:aws:sns:us-east-1:123456789012:WeatherAlerts");
```

</details>

<details>
<summary>listTopics</summary>

Returns a stream of all topic ARNs in the account.

Returns: `stream<string, error?>`

Sample code:

```ballerina
stream<string, error?> topics = check snsClient->listTopics();
check from string topicArn in topics
    do {
        io:println(topicArn);
    };
```

Sample response:

```ballerina
"arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
```

</details>

<details>
<summary>getTopicAttributes</summary>

Retrieves the attributes of an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |

Returns: `GettableTopicAttributes|error`

Sample code:

```ballerina
sns:GettableTopicAttributes attrs = check snsClient->getTopicAttributes(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
);
```

Sample response:

```ballerina
{
  "topicArn": "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
  "displayName": "Weather Alerts",
  "owner": "123456789012",
  "subscriptionsConfirmed": 3,
  "subscriptionsPending": 1,
  "subscriptionsDeleted": 0
}
```

</details>

<details>
<summary>setTopicAttributes</summary>

Sets a single attribute on an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |
| `attributeName` | `TopicAttributeName` | Yes | The attribute to set (e.g., `DISPLAY_NAME`, `DELIVERY_POLICY`). |
| `value` | `json\|string\|int\|boolean` | Yes | The new value for the attribute. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->setTopicAttributes(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    sns:DISPLAY_NAME,
    "Global Weather Alerts"
);
```

</details>

#### Publishing

<details>
<summary>publish</summary>

Publishes a message to an SNS topic, a specific ARN, or a phone number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `target` | `string` | Yes | The topic ARN, target ARN, or phone number to publish to. |
| `message` | `Message` | Yes | The message to send: either a plain string or a `MessageRecord` with protocol-specific bodies. |
| `targetType` | `TargetType` | No | Type of the target: `TOPIC` (default), `ARN`, or `PHONE_NUMBER`. |
| `attributes` | `map` | No | Optional message attributes for filtering. |
| `deduplicationId` | `string` | No | Deduplication ID for FIFO topics. |
| `groupId` | `string` | No | Message group ID for FIFO topics. |

Returns: `PublishMessageResponse|error`

Sample code:

```ballerina
sns:PublishMessageResponse response = check snsClient->publish(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    "The temperature in Colombo is 24 degrees Celsius"
);
```

Sample response:

```ballerina
{"messageId": "d9b9b0e8-5b6e-4c1e-9a3b-1f2e3d4c5b6a"}
```

</details>

<details>
<summary>publishBatch</summary>

Publishes up to 10 messages to an SNS topic in a single request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic to publish to. |
| `entries` | `PublishBatchRequestEntry[]` | Yes | Array of batch entries, each containing a message and optional attributes. |

Returns: `PublishBatchResponse|error`

Sample code:

```ballerina
sns:PublishBatchResponse response = check snsClient->publishBatch(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    [
        {message: "Alert 1: Heavy rain expected"},
        {message: "Alert 2: High winds forecast"}
    ]
);
```

Sample response:

```ballerina
{
  "successful": [
    {"id": "1", "messageId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"},
    {"id": "2", "messageId": "b2c3d4e5-f6a7-8901-bcde-f12345678901"}
  ],
  "failed": []
}
```

</details>

#### Subscriptions

<details>
<summary>subscribe</summary>

Subscribes an endpoint to an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic to subscribe to. |
| `endpoint` | `string` | Yes | The endpoint to receive notifications (email address, phone number, URL, SQS ARN, etc.). |
| `protocol` | `SubscriptionProtocol` | Yes | The subscription protocol (e.g., `EMAIL`, `SMS`, `SQS`, `HTTPS`, `LAMBDA`). |
| `attributes` | `SubscriptionAttributes` | No | Optional subscription attributes such as filter policy and delivery policy. |
| `returnSubscriptionArn` | `boolean` | No | Whether to return the subscription ARN even if pending confirmation. |

Returns: `string|error`

Sample code:

```ballerina
string subscriptionArn = check snsClient->subscribe(
    "arn:aws:sns:us-east-1:123456789012:FootballScores",
    "user@example.com",
    sns:EMAIL,
    attributes = {
        filterPolicy: {messiPlaying: ["true"]},
        filterPolicyScope: sns:MESSAGE_ATTRIBUTES
    }
);
```

Sample response:

```ballerina
"pending confirmation"
```

</details>

<details>
<summary>confirmSubscription</summary>

Confirms a pending subscription using the token from the confirmation message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |
| `token` | `string` | Yes | The confirmation token from the subscription confirmation message. |
| `authenticateOnUnsubscribe` | `boolean` | No | Whether to require authentication for unsubscribe requests. |

Returns: `string|error`

Sample code:

```ballerina
string subscriptionArn = check snsClient->confirmSubscription(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    "2336412f37fb687f5d51e6e2425dacbbfd..."
);
```

Sample response:

```ballerina
"arn:aws:sns:us-east-1:123456789012:WeatherAlerts:a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

</details>

<details>
<summary>listSubscriptions</summary>

Returns a stream of all subscriptions, optionally filtered by topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | No | If provided, lists only subscriptions for this topic. |

Returns: `stream<Subscription, error?>`

Sample code:

```ballerina
stream<sns:Subscription, error?> subscriptions = check snsClient->listSubscriptions(
    topicArn = "arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
);
check from sns:Subscription sub in subscriptions
    do {
        io:println(sub.endpoint);
    };
```

Sample response:

```ballerina
{
  "subscriptionArn": "arn:aws:sns:us-east-1:123456789012:WeatherAlerts:a1b2c3d4",
  "owner": "123456789012",
  "protocol": "email",
  "endpoint": "user@example.com",
  "topicArn": "arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
}
```

</details>

<details>
<summary>getSubscriptionAttributes</summary>

Retrieves the attributes of a subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionArn` | `string` | Yes | ARN of the subscription. |

Returns: `GettableSubscriptionAttributes|error`

Sample code:

```ballerina
sns:GettableSubscriptionAttributes attrs = check snsClient->getSubscriptionAttributes(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts:a1b2c3d4"
);
```

Sample response:

```ballerina
{
  "subscriptionArn": "arn:aws:sns:us-east-1:123456789012:WeatherAlerts:a1b2c3d4",
  "topicArn": "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
  "protocol": "email",
  "endpoint": "user@example.com",
  "rawMessageDelivery": false,
  "confirmationWasAuthenticated": true
}
```

</details>

<details>
<summary>setSubscriptionAttributes</summary>

Sets a single attribute on a subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionArn` | `string` | Yes | ARN of the subscription. |
| `attributeName` | `SubscriptionAttributeName` | Yes | The attribute to set (e.g., `FILTER_POLICY`, `RAW_MESSAGE_DELIVERY`). |
| `value` | `json\|FilterPolicyScope\|boolean\|string` | Yes | The new value for the attribute. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->setSubscriptionAttributes(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts:a1b2c3d4",
    sns:FILTER_POLICY,
    {severity: ["high", "critical"]}
);
```

</details>

<details>
<summary>unsubscribe</summary>

Unsubscribes an endpoint from an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptionArn` | `string` | Yes | ARN of the subscription to remove. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->unsubscribe(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts:a1b2c3d4"
);
```

</details>

#### Platform applications

<details>
<summary>createPlatformApplication</summary>

Creates a platform application for mobile push notifications (APNs, FCM, ADM, etc.).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name of the platform application. |
| `platform` | `Platform` | Yes | The push notification platform (e.g., `APNS`, `GCM`, `ADM`). |
| `auth` | `PlatformApplicationAuthentication` | Yes | Authentication credentials for the platform (e.g., API key, certificate). |
| `attributes` | `PlatformApplicationAttributes` | No | Optional attributes such as event notification endpoints and feedback settings. |

Returns: `string|error`

Sample code:

```ballerina
string platformAppArn = check snsClient->createPlatformApplication(
    "MyMobileApp",
    sns:GCM,
    {platformCredential: "<FCM_SERVER_KEY>"}
);
```

Sample response:

```ballerina
"arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp"
```

</details>

<details>
<summary>listPlatformApplications</summary>

Returns a stream of all platform applications in the account.

Returns: `stream<PlatformApplication, error?>`

Sample code:

```ballerina
stream<sns:PlatformApplication, error?> apps = check snsClient->listPlatformApplications();
check from sns:PlatformApplication app in apps
    do {
        io:println(app.platformApplicationArn);
    };
```

Sample response:

```ballerina
{
  "platformApplicationArn": "arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp",
  "enabled": true
}
```

</details>

<details>
<summary>getPlatformApplicationAttributes</summary>

Retrieves the attributes of a platform application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `platformApplicationArn` | `string` | Yes | ARN of the platform application. |

Returns: `RetrievablePlatformApplicationAttributes|error`

Sample code:

```ballerina
sns:RetrievablePlatformApplicationAttributes attrs =
    check snsClient->getPlatformApplicationAttributes(
        "arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp"
    );
```

Sample response:

```ballerina
{
  "enabled": true,
  "applePlatformTeamId": null,
  "applePlatformBundleId": null
}
```

</details>

<details>
<summary>setPlatformApplicationAttributes</summary>

Updates the attributes of a platform application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `platformApplicationArn` | `string` | Yes | ARN of the platform application. |
| `attributes` | `SettablePlatformApplicationAttributes` | Yes | The attributes to set. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->setPlatformApplicationAttributes(
    "arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp",
    {eventEndpointCreated: "arn:aws:sns:us-east-1:123456789012:EndpointEvents"}
);
```

</details>

<details>
<summary>deletePlatformApplication</summary>

Deletes a platform application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `platformApplicationArn` | `string` | Yes | ARN of the platform application to delete. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->deletePlatformApplication(
    "arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp"
);
```

</details>

#### Platform endpoints

<details>
<summary>createEndpoint</summary>

Creates a platform endpoint for a device to receive push notifications.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `platformApplicationArn` | `string` | Yes | ARN of the platform application. |
| `token` | `string` | Yes | The device token from the push notification service. |
| `attributes` | `EndpointAttributes` | No | Optional endpoint attributes. |
| `customUserData` | `string` | No | Arbitrary user data to associate with the endpoint. |

Returns: `string|error`

Sample code:

```ballerina
string endpointArn = check snsClient->createEndpoint(
    "arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp",
    "device-token-abc123"
);
```

Sample response:

```ballerina
"arn:aws:sns:us-east-1:123456789012:endpoint/GCM/MyMobileApp/a1b2c3d4-e5f6-7890"
```

</details>

<details>
<summary>listEndpoints</summary>

Returns a stream of all endpoints for a platform application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `platformApplicationArn` | `string` | Yes | ARN of the platform application. |

Returns: `stream<Endpoint, error?>`

Sample code:

```ballerina
stream<sns:Endpoint, error?> endpoints = check snsClient->listEndpoints(
    "arn:aws:sns:us-east-1:123456789012:app/GCM/MyMobileApp"
);
check from sns:Endpoint ep in endpoints
    do {
        io:println(ep.endpointArn);
    };
```

Sample response:

```ballerina
{
  "endpointArn": "arn:aws:sns:us-east-1:123456789012:endpoint/GCM/MyMobileApp/a1b2c3d4",
  "enabled": true,
  "token": "device-token-abc123"
}
```

</details>

<details>
<summary>getEndpointAttributes</summary>

Retrieves the attributes of a platform endpoint.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `endpointArn` | `string` | Yes | ARN of the endpoint. |

Returns: `EndpointAttributes|error`

Sample code:

```ballerina
sns:EndpointAttributes attrs = check snsClient->getEndpointAttributes(
    "arn:aws:sns:us-east-1:123456789012:endpoint/GCM/MyMobileApp/a1b2c3d4"
);
```

Sample response:

```ballerina
{"enabled": true, "token": "device-token-abc123", "customUserData": null}
```

</details>

<details>
<summary>setEndpointAttributes</summary>

Updates the attributes of a platform endpoint.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `endpointArn` | `string` | Yes | ARN of the endpoint. |
| `attributes` | `EndpointAttributes` | Yes | The attributes to set. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->setEndpointAttributes(
    "arn:aws:sns:us-east-1:123456789012:endpoint/GCM/MyMobileApp/a1b2c3d4",
    {enabled: true, token: "new-device-token-xyz789"}
);
```

</details>

<details>
<summary>deleteEndpoint</summary>

Deletes a platform endpoint.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `endpointArn` | `string` | Yes | ARN of the endpoint to delete. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->deleteEndpoint(
    "arn:aws:sns:us-east-1:123456789012:endpoint/GCM/MyMobileApp/a1b2c3d4"
);
```

</details>

#### SMS sandbox

<details>
<summary>createSMSSandboxPhoneNumber</summary>

Adds a phone number to the SMS sandbox for verification.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumber` | `string` | Yes | The phone number to add (E.164 format, e.g., `+14155552671`). |
| `languageCode` | `LanguageCode` | No | Language for the verification SMS (default: `EN_US`). |

Returns: `error?`

Sample code:

```ballerina
check snsClient->createSMSSandboxPhoneNumber("+14155552671");
```

</details>

<details>
<summary>verifySMSSandboxPhoneNumber</summary>

Verifies a phone number in the SMS sandbox using the OTP received.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumber` | `string` | Yes | The phone number to verify. |
| `otp` | `string` | Yes | The one-time password received via SMS. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->verifySMSSandboxPhoneNumber("+14155552671", "123456");
```

</details>

<details>
<summary>listSMSSandboxPhoneNumbers</summary>

Returns a stream of all phone numbers in the SMS sandbox.

Returns: `stream<SMSSandboxPhoneNumber, error?>`

Sample code:

```ballerina
stream<sns:SMSSandboxPhoneNumber, error?> numbers =
    check snsClient->listSMSSandboxPhoneNumbers();
check from sns:SMSSandboxPhoneNumber num in numbers
    do {
        io:println(num.phoneNumber, " - ", num.status);
    };
```

Sample response:

```ballerina
{"phoneNumber": "+14155552671", "status": "Verified"}
```

</details>

<details>
<summary>deleteSMSSandboxPhoneNumber</summary>

Removes a phone number from the SMS sandbox.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumber` | `string` | Yes | The phone number to remove. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->deleteSMSSandboxPhoneNumber("+14155552671");
```

</details>

<details>
<summary>getSMSSandboxAccountStatus</summary>

Checks whether the account is still in the SMS sandbox. Returns `true` if in sandbox.

Returns: `boolean|error`

Sample code:

```ballerina
boolean inSandbox = check snsClient->getSMSSandboxAccountStatus();
```

Sample response:

```ballerina
true
```

</details>

#### SMS & phone numbers

<details>
<summary>listOriginationNumbers</summary>

Returns a stream of origination phone numbers associated with the account.

Returns: `stream<OriginationPhoneNumber, error?>`

Sample code:

```ballerina
stream<sns:OriginationPhoneNumber, error?> numbers =
    check snsClient->listOriginationNumbers();
check from sns:OriginationPhoneNumber num in numbers
    do {
        io:println(num.phoneNumber, " - ", num.status);
    };
```

Sample response:

```ballerina
{
  "phoneNumber": "+14155552671",
  "status": "Active",
  "iso2CountryCode": "US",
  "routeType": "TRANSACTIONAL",
  "numberCapabilities": ["SMS"]
}
```

</details>

<details>
<summary>listPhoneNumbersOptedOut</summary>

Returns a stream of phone numbers that have opted out of receiving SMS.

Returns: `stream<string, error?>`

Sample code:

```ballerina
stream<string, error?> optedOut = check snsClient->listPhoneNumbersOptedOut();
check from string phone in optedOut
    do {
        io:println(phone);
    };
```

Sample response:

```ballerina
"+14155552671"
```

</details>

<details>
<summary>checkIfPhoneNumberIsOptedOut</summary>

Checks whether a phone number has opted out of receiving SMS messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumber` | `string` | Yes | The phone number to check (E.164 format). |

Returns: `boolean|error`

Sample code:

```ballerina
boolean optedOut = check snsClient->checkIfPhoneNumberIsOptedOut("+14155552671");
```

Sample response:

```ballerina
false
```

</details>

<details>
<summary>optInPhoneNumber</summary>

Opts in a previously opted-out phone number to receive SMS messages.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumber` | `string` | Yes | The phone number to opt in. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->optInPhoneNumber("+14155552671");
```

</details>

<details>
<summary>setSMSAttributes</summary>

Sets the default SMS attributes for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `attributes` | `SMSAttributes` | Yes | SMS attributes to set (e.g., default SMS type, sender ID, spend limit). |

Returns: `error?`

Sample code:

```ballerina
check snsClient->setSMSAttributes({
    defaultSMSType: "Transactional",
    defaultSenderID: "MyApp"
});
```

</details>

<details>
<summary>getSMSAttributes</summary>

Retrieves the default SMS attributes for the account.

Returns: `SMSAttributes|error`

Sample code:

```ballerina
sns:SMSAttributes smsAttrs = check snsClient->getSMSAttributes();
```

Sample response:

```ballerina
{
  "defaultSMSType": "Transactional",
  "defaultSenderID": "MyApp",
  "monthlySpendLimit": "100"
}
```

</details>

#### Tags & permissions

<details>
<summary>tagResource</summary>

Adds or updates tags on an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic to tag. |
| `tags` | `Tags` | Yes | Key-value tag pairs to add. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->tagResource(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    {environment: "production", team: "platform"}
);
```

</details>

<details>
<summary>listTags</summary>

Lists all tags associated with an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |

Returns: `Tags|error`

Sample code:

```ballerina
sns:Tags tags = check snsClient->listTags(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
);
```

Sample response:

```ballerina
{"environment": "production", "team": "platform"}
```

</details>

<details>
<summary>untagResource</summary>

Removes tags from an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |
| `tagKeys` | `string[]` | Yes | Array of tag keys to remove. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->untagResource(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    ["team"]
);
```

</details>

<details>
<summary>addPermission</summary>

Adds a permission statement to a topic's access control policy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |
| `actions` | `Action[]` | Yes | Array of SNS actions to allow (e.g., `PUBLISH`, `SUBSCRIBE`). |
| `awsAccountIds` | `string[]` | Yes | AWS account IDs to grant permission to. |
| `label` | `string` | Yes | A unique label for this permission statement. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->addPermission(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    [sns:PUBLISH],
    ["987654321098"],
    "AllowCrossAccountPublish"
);
```

</details>

<details>
<summary>removePermission</summary>

Removes a permission statement from a topic's access control policy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |
| `label` | `string` | Yes | The label of the permission statement to remove. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->removePermission(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    "AllowCrossAccountPublish"
);
```

</details>

#### Data protection

<details>
<summary>putDataProtectionPolicy</summary>

Sets a data protection policy on an SNS topic for message data redaction and auditing.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |
| `dataProtectionPolicy` | `json` | Yes | The data protection policy document as JSON. |

Returns: `error?`

Sample code:

```ballerina
check snsClient->putDataProtectionPolicy(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts",
    {
        "Name": "WeatherAlertsPolicy",
        "Description": "Data protection policy",
        "Version": "2021-06-01",
        "Statement": []
    }
);
```

</details>

<details>
<summary>getDataProtectionPolicy</summary>

Retrieves the data protection policy of an SNS topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicArn` | `string` | Yes | ARN of the topic. |

Returns: `json|error`

Sample code:

```ballerina
json policy = check snsClient->getDataProtectionPolicy(
    "arn:aws:sns:us-east-1:123456789012:WeatherAlerts"
);
```

Sample response:

```ballerina
{
  "Name": "WeatherAlertsPolicy",
  "Description": "Data protection policy",
  "Version": "2021-06-01",
  "Statement": []
}
```

</details>
