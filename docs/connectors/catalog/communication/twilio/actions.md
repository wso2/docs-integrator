---
title: Actions
---

# Actions

The `ballerinax/twilio` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Full Twilio REST API access: messaging, voice calls, phone numbers, recordings, conferences, and account management. |

## Client

Full Twilio REST API access: messaging, voice calls, phone numbers, recordings, conferences, and account management.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>AuthTokenConfig&#124;ApiKeyConfig</code> | Required | Authentication configuration: either Auth Token or API Key based. |
| `httpVersion` | `HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `http1Settings` | `ClientHttp1Settings` | `()` | Configurations for HTTP/1.x protocol. |
| `http2Settings` | `ClientHttp2Settings` | `()` | Configurations for HTTP/2 protocol. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `forwarded` | `string` | `"disable"` | The choice of setting `forwarded`/`x-forwarded` header. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration for failed requests. |
| `responseLimits` | `ResponseLimitConfigs` | `()` | Configurations associated with inbound response size limits. |
| `secureSocket` | `ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `Compression` | `COMPRESSION_AUTO` | HTTP compression configuration. |
| `circuitBreaker` | `CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `poolConfig` | `PoolConfiguration` | `()` | HTTP connection pool configuration. |
| `cache` | `CacheConfig` | `()` | HTTP response cache configuration. |
| `validation` | `boolean` | `true` | Enable/disable payload validation. |

### Initializing the client

**Using Auth Token authentication:**

```ballerina
import ballerinax/twilio;

configurable string accountSid = ?;
configurable string authToken = ?;

twilio:Client twilioClient = check new ({
    auth: {
        accountSid: accountSid,
        authToken: authToken
    }
});
```

**Using API Key authentication:**

```ballerina
import ballerinax/twilio;

configurable string accountSid = ?;
configurable string apiKey = ?;
configurable string apiSecret = ?;

twilio:Client twilioClient = check new ({
    auth: {
        accountSid: accountSid,
        apiKey: apiKey,
        apiSecret: apiSecret
    }
});
```

### Operations

#### Messaging

<details>
<summary>createMessage</summary>

Sends an SMS, MMS, or WhatsApp message.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateMessageRequest` | Yes | Message details including `To`, `From`, `Body`, and optional `MediaUrl`. |
| `accountSid` | `string` | No | Account SID override. Defaults to the authenticated account. |

Returns: `Message|error`

Sample code:

```ballerina
twilio:CreateMessageRequest messageRequest = {
    To: "+1234567890",
    From: "+0987654321",
    Body: "Hello from Ballerina"
};

twilio:Message response = check twilioClient->createMessage(messageRequest);
```

Sample response:

```json
{"sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "status": "queued", "to": "+1234567890", "from": "+0987654321", "body": "Hello from Ballerina", "num_segments": "1", "direction": "outbound-api"}
```

</details>

<details>
<summary>fetchMessage</summary>

Retrieves a message by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Message SID. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `Message|error`

Sample code:

```ballerina
twilio:Message message = check twilioClient->fetchMessage("SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

Sample response:

```json
{"sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "status": "delivered", "to": "+1234567890", "from": "+0987654321", "body": "Hello from Ballerina", "date_sent": "Mon, 10 Mar 2026 14:30:00 +0000"}
```

</details>

<details>
<summary>listMessage</summary>

Lists messages, optionally filtered by sender, recipient, or date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string` | No | Filter by recipient phone number. |
| `from` | `string` | No | Filter by sender phone number. |
| `dateSent` | `string` | No | Filter by date sent (YYYY-MM-DD). |
| `pageSize` | `int` | No | Number of records to return per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListMessageResponse|error`

Sample code:

```ballerina
twilio:ListMessageResponse messages = check twilioClient->listMessage(to = "+1234567890", pageSize = 10);
```

Sample response:

```json
{"messages": [{"sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "status": "delivered", "to": "+1234567890", "body": "Hello"}], "page_size": 10, "page": 0}
```

</details>

<details>
<summary>deleteMessage</summary>

Deletes a message by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Message SID to delete. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check twilioClient->deleteMessage("SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

</details>

#### Voice calls

<details>
<summary>createCall</summary>

Initiates an outbound voice call.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateCallRequest` | Yes | Call details — see required and optional fields below. |
| `accountSid` | `string` | No | Account SID override. |

`CreateCallRequest` required fields:

| Name | Type | Description |
|------|------|-------------|
| `To` | `string` | The phone number to call, in E.164 format. |
| `From` | `string` | Your Twilio number to use as the caller ID, in E.164 format. |

Provide exactly one of `Url`, `Twiml`, or `ApplicationSid` to specify the call instructions:
- `Url` — URL of a TwiML document or Twilio Application to fetch call instructions from.
- `Twiml` — Inline TwiML string for simple call flows that do not require a separate server.
- `ApplicationSid` — SID of a Twilio Application with configured voice URLs.

Optional fields include `StatusCallback`, `StatusCallbackMethod`, `StatusCallbackEvent`, `Record`, `Timeout`, and others — see the [Twilio REST API reference](https://www.twilio.com/docs/voice/api/call-resource) for the full list.

Returns: `Call|error`

Sample code:

```ballerina
twilio:CreateCallRequest callRequest = {
    To: "+1234567890",
    From: "+0987654321",
    Url: "http://demo.twilio.com/docs/voice.xml",
    StatusCallback: "https://your-app.example.com/status",
    StatusCallbackMethod: "POST"
};

twilio:Call response = check twilioClient->createCall(callRequest);
```

Sample response:

```json
{"sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "status": "queued", "to": "+1234567890", "from": "+0987654321", "direction": "outbound-api"}
```

</details>

<details>
<summary>fetchCall</summary>

Retrieves details of a call by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Call SID. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `Call|error`

Sample code:

```ballerina
twilio:Call call = check twilioClient->fetchCall("CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

Sample response:

```json
{"sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "status": "completed", "to": "+1234567890", "from": "+0987654321", "duration": "45", "price": "-0.0085", "price_unit": "USD"}
```

</details>

<details>
<summary>listCall</summary>

Lists calls, optionally filtered by status, phone number, or date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string` | No | Filter by recipient. |
| `from` | `string` | No | Filter by caller. |
| `status` | `Call_enum_status` | No | Filter by call status. |
| `pageSize` | `int` | No | Number of records per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListCallResponse|error`

Sample code:

```ballerina
twilio:ListCallResponse calls = check twilioClient->listCall(status = "completed", pageSize = 20);
```

Sample response:

```json
{"calls": [{"sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "status": "completed", "duration": "45"}], "page_size": 20, "page": 0}
```

</details>

<details>
<summary>deleteCall</summary>

Deletes a call record by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Call SID to delete. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check twilioClient->deleteCall("CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

</details>

#### Account management

<details>
<summary>createAccount</summary>

Creates a new Twilio sub-account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateAccountRequest` | Yes | Account creation details including optional `FriendlyName`. |

Returns: `Account|error`

Sample code:

```ballerina
twilio:CreateAccountRequest accountRequest = {
    FriendlyName: "My Sub Account"
};

twilio:Account subAccount = check twilioClient->createAccount(accountRequest);
```

Sample response:

```json
{"sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "My Sub Account", "status": "active", "type": "Full"}
```

</details>

<details>
<summary>fetchAccount</summary>

Retrieves account details by SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Account SID. |

Returns: `Account|error`

Sample code:

```ballerina
twilio:Account account = check twilioClient->fetchAccount("ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

Sample response:

```json
{"sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "My Account", "status": "active", "type": "Full"}
```

</details>

<details>
<summary>fetchBalance</summary>

Retrieves the account balance.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountSid` | `string` | No | Account SID. Defaults to the authenticated account. |

Returns: `Balance|error`

Sample code:

```ballerina
twilio:Balance balance = check twilioClient->fetchBalance();
```

Sample response:

```json
{"account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "balance": "25.50", "currency": "USD"}
```

</details>

<details>
<summary>listAccount</summary>

Lists accounts, optionally filtered by name or status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `friendlyName` | `string` | No | Filter by friendly name. |
| `status` | `Account_enum_status` | No | Filter by account status. |
| `pageSize` | `int` | No | Number of records per page. |

Returns: `ListAccountResponse|error`

Sample code:

```ballerina
twilio:ListAccountResponse accounts = check twilioClient->listAccount(status = "active");
```

Sample response:

```json
{"accounts": [{"sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "My Account", "status": "active"}], "page_size": 50, "page": 0}
```

</details>

<details>
<summary>updateAccount</summary>

Updates properties of an account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Account SID of the account to update. |
| `payload` | `UpdateAccountRequest` | Yes | Update parameters. |

`UpdateAccountRequest` fields:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `FriendlyName` | `string` | No | A human-readable name for the account. |
| `Status` | `Account_enum_status` | No | The new status for the account: `active`, `suspended`, or `closed`. |

Returns: `Account|error`

Sample code:

```ballerina
twilio:Account updated = check twilioClient->updateAccount("ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", {
    FriendlyName: "Updated Account Name"
});
```

</details>

#### Phone number management

<details>
<summary>createIncomingPhoneNumber</summary>

Purchases a new phone number for your account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateIncomingPhoneNumberRequest` | Yes | Phone number purchase details including the number or area code. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `Incoming_phone_number|error`

Sample code:

```ballerina
twilio:Incoming_phone_number number = check twilioClient->createIncomingPhoneNumber({
    PhoneNumber: "+1234567890"
});
```

Sample response:

```json
{"sid": "PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "phone_number": "+1234567890", "friendly_name": "(123) 456-7890", "capabilities": {"voice": true, "sms": true, "mms": true}}
```

</details>

<details>
<summary>listIncomingPhoneNumber</summary>

Lists phone numbers owned by the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `phoneNumber` | `string` | No | Filter by phone number. |
| `friendlyName` | `string` | No | Filter by friendly name. |
| `pageSize` | `int` | No | Number of records per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListIncomingPhoneNumberResponse|error`

Sample code:

```ballerina
twilio:ListIncomingPhoneNumberResponse numbers = check twilioClient->listIncomingPhoneNumber(pageSize = 20);
```

Sample response:

```json
{"incoming_phone_numbers": [{"sid": "PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "phone_number": "+1234567890", "friendly_name": "(123) 456-7890"}], "page_size": 20}
```

</details>

<details>
<summary>listAvailablePhoneNumberLocal</summary>

Searches for available local phone numbers to purchase.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryCode` | `string` | Yes | ISO 3166-1 alpha-2 country code (e.g., `"US"`). |
| `areaCode` | `int` | No | Filter by area code. |
| `smsEnabled` | `boolean` | No | Filter for SMS-capable numbers. |
| `voiceEnabled` | `boolean` | No | Filter for voice-capable numbers. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListAvailablePhoneNumberLocalResponse|error`

Sample code:

```ballerina
twilio:ListAvailablePhoneNumberLocalResponse available = check twilioClient->listAvailablePhoneNumberLocal(
    "US", areaCode = 415, smsEnabled = true
);
```

Sample response:

```json
{"available_phone_numbers": [{"phone_number": "+14155551234", "friendly_name": "(415) 555-1234", "capabilities": {"voice": true, "SMS": true, "MMS": true}}]}
```

</details>

#### Recordings

<details>
<summary>listRecording</summary>

Lists recordings for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dateCreated` | `string` | No | Filter by creation date (YYYY-MM-DD). |
| `pageSize` | `int` | No | Number of records per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListRecordingResponse|error`

Sample code:

```ballerina
twilio:ListRecordingResponse recordings = check twilioClient->listRecording(pageSize = 10);
```

Sample response:

```json
{"recordings": [{"sid": "RExxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "duration": "30", "status": "completed", "call_sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}], "page_size": 10}
```

</details>

<details>
<summary>fetchRecording</summary>

Retrieves a recording by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Recording SID. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `Recording|error`

Sample code:

```ballerina
twilio:Recording recording = check twilioClient->fetchRecording("RExxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

Sample response:

```json
{"sid": "RExxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "duration": "30", "status": "completed", "call_sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "price": "-0.0025", "price_unit": "USD"}
```

</details>

<details>
<summary>deleteRecording</summary>

Deletes a recording by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Recording SID to delete. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check twilioClient->deleteRecording("RExxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

</details>

#### Conferences

<details>
<summary>listConference</summary>

Lists conferences for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `friendlyName` | `string` | No | Filter by conference friendly name. |
| `status` | `Conference_enum_status` | No | Filter by conference status. |
| `pageSize` | `int` | No | Number of records per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListConferenceResponse|error`

Sample code:

```ballerina
twilio:ListConferenceResponse conferences = check twilioClient->listConference(status = "completed", pageSize = 10);
```

Sample response:

```json
{"conferences": [{"sid": "CFxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "MyConference", "status": "completed"}], "page_size": 10}
```

</details>

<details>
<summary>fetchConference</summary>

Retrieves a conference by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | `string` | Yes | The Conference SID. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `Conference|error`

Sample code:

```ballerina
twilio:Conference conference = check twilioClient->fetchConference("CFxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

Sample response:

```json
{"sid": "CFxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "MyConference", "status": "completed", "region": "us1"}
```

</details>

#### Queue management

<details>
<summary>createQueue</summary>

Creates a new call queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateQueueRequest` | Yes | Queue creation details including `FriendlyName`. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `Queue|error`

Sample code:

```ballerina
twilio:Queue queue = check twilioClient->createQueue({
    FriendlyName: "Support Queue"
});
```

Sample response:

```json
{"sid": "QUxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "Support Queue", "current_size": 0, "max_size": 1000}
```

</details>

<details>
<summary>listQueue</summary>

Lists call queues for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pageSize` | `int` | No | Number of records per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListQueueResponse|error`

Sample code:

```ballerina
twilio:ListQueueResponse queues = check twilioClient->listQueue(pageSize = 10);
```

Sample response:

```json
{"queues": [{"sid": "QUxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "friendly_name": "Support Queue", "current_size": 0}], "page_size": 10}
```

</details>

#### Usage

<details>
<summary>listUsageRecord</summary>

Lists usage records for the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `category` | `Usage_record_enum_category` | No | Filter by usage category (e.g., `sms`, `calls`). |
| `startDate` | `string` | No | Start date for the usage period (YYYY-MM-DD). |
| `endDate` | `string` | No | End date for the usage period (YYYY-MM-DD). |
| `pageSize` | `int` | No | Number of records per page. |
| `accountSid` | `string` | No | Account SID override. |

Returns: `ListUsageRecordResponse|error`

Sample code:

```ballerina
twilio:ListUsageRecordResponse usage = check twilioClient->listUsageRecord(pageSize = 10);
```

Sample response:

```json
{"usage_records": [{"category": "sms", "description": "SMS Messages", "count": "150", "price": "1.125", "price_unit": "USD"}], "page_size": 10}
```

</details>

## What's next

- [Trigger Reference](triggers.md) — Event-driven webhook integration using the Twilio listener.
- [Example](example.md) — Complete example integrations for the Twilio connector and trigger.
- [Setup Guide](setup-guide.md) — Create a Twilio account and obtain credentials.
