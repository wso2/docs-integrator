---
title: Actions
---

# Actions

The `ballerinax/twilio` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Primary client for all Twilio REST API operations: messaging, calls, phone number management, and account operations. |

---

## Client

Primary client for all Twilio REST API operations: messaging, calls, phone number management, and account operations.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>AuthTokenConfig&#124;ApiKeyConfig</code> | Required | Authentication configuration. Use `AuthTokenConfig` (accountSid + authToken) for simple setups, or `ApiKeyConfig` (apiKey + apiSecret + accountSid) for scoped API key authentication.
 |
| `httpVersion` | <code>http:HttpVersion</code> | `HTTP_2_0` | HTTP protocol version to use for requests. |
| `timeout` | <code>decimal</code> | `60` | Request timeout in seconds. |
| `retryConfig` | <code>http:RetryConfig</code> | `()` | Retry configuration for failed requests. |
| `secureSocket` | <code>http:ClientSecureSocket</code> | `()` | SSL/TLS configuration. |
| `proxy` | <code>http:ProxyConfig</code> | `()` | Proxy server configuration. |
| `validation` | <code>boolean</code> | `true` | Enables inbound payload validation using the constraint package. |

### Initializing the client

```ballerina
import ballerinax/twilio;

// Using Auth Token authentication
configurable string accountSid = ?;
configurable string authToken = ?;

twilio:Client twilioClient = check new ({
    auth: {
        accountSid: accountSid,
        authToken: authToken
    }
});

// --- OR using API Key authentication ---
// configurable string apiKey = ?;
// configurable string apiSecret = ?;
// configurable string accountSid = ?;
//
// twilio:Client twilioClient = check new ({
//     auth: {
//         apiKey: apiKey,
//         apiSecret: apiSecret,
//         accountSid: accountSid
//     }
// });
```

### Operations

#### Message operations

<details>
<summary>createMessage</summary>

Sends an SMS, MMS, or WhatsApp message. The `To` field accepts E.164 phone numbers or channel addresses such as `whatsapp:+15552229999`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateMessageRequest</code> | Yes | Message request body. Must include `To` and either `From` (or `MessagingServiceSid`) plus `Body` or `MediaUrl`. |
| `accountSid` | <code>string?</code> | No | Override the account SID. Defaults to the SID supplied during client initialisation. |

Returns: `Message|error`

Sample code:

```ballerina
import ballerinax/twilio;

twilio:CreateMessageRequest messageRequest = {
    To: "+14155551234",
    From: "+18005550100",
    Body: "Hello from Ballerina"
};

twilio:Message response = check twilioClient->createMessage(messageRequest);
```

Sample response:

```ballerina
{
  "sid": "SM1234567890abcdef1234567890abcdef",
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "from": "+18005550100",
  "to": "+14155551234",
  "body": "Hello from Ballerina",
  "status": "queued",
  "direction": "outbound-api",
  "date_created": "Fri, 13 Oct 2023 10:00:00 +0000",
  "date_sent": null,
  "price": null,
  "price_unit": "USD",
  "num_segments": "1",
  "num_media": "0",
  "uri": "/2010-04-01/Accounts/ACxx/Messages/SMxx.json"
}
```

</details>

<details>
<summary>fetchMessage</summary>

Fetches the details of a specific message by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The unique SID of the Message resource (begins with `SM`). |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Message|error`

Sample code:

```ballerina
twilio:Message message = check twilioClient->fetchMessage("SM4f16fca1d7391c99249b842f063c4da0");
```

Sample response:

```ballerina
{
  "sid": "SM4f16fca1d7391c99249b842f063c4da0",
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "from": "+18005550100",
  "to": "+14155551234",
  "body": "Hello from Ballerina",
  "status": "delivered",
  "direction": "outbound-api",
  "date_created": "Fri, 13 Oct 2023 10:00:00 +0000",
  "date_sent": "Fri, 13 Oct 2023 10:00:01 +0000",
  "price": "-0.00750",
  "price_unit": "USD",
  "num_segments": "1",
  "num_media": "0"
}
```

</details>

<details>
<summary>listMessage</summary>

Retrieves a paginated list of messages sent from or received by the account, with optional filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | <code>string?</code> | No | Filter by the recipient's phone number. |
| `from` | <code>string?</code> | No | Filter by the sender's phone number. |
| `dateSent` | <code>string?</code> | No | Filter by date sent (GMT, format `YYYY-MM-DD`). |
| `pageSize` | <code>int?</code> | No | Number of records to return per page. Maximum 1000. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `ListMessageResponse|error`

Sample code:

```ballerina
twilio:ListMessageResponse response = check twilioClient->listMessage(pageSize = 10);
twilio:Message[]? messages = response.messages;
if messages is twilio:Message[] {
    foreach twilio:Message msg in messages {
        string sid = msg?.sid ?: "";
        string status = msg?.status.toString();
    }
}
```

Sample response:

```ballerina
{
  "messages": [
    {
      "sid": "SM1234567890abcdef1234567890abcdef",
      "from": "+18005550100",
      "to": "+14155551234",
      "body": "Hello from Ballerina",
      "status": "delivered",
      "date_sent": "Fri, 13 Oct 2023 10:00:01 +0000"
    }
  ],
  "page": 0,
  "page_size": 10,
  "first_page_uri": "/2010-04-01/Accounts/ACxx/Messages.json?PageSize=10&Page=0",
  "next_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACxx/Messages.json?PageSize=10"
}
```

</details>

<details>
<summary>deleteMessage</summary>

Deletes a message record from the account. Once deleted, it cannot be recovered.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the message to delete. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `http:Response|error`

Sample code:

```ballerina

```

</details>

<details>
<summary>updateMessage</summary>

Updates a message: primarily used to cancel a scheduled message by setting `status` to `canceled`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the message to update. |
| `payload` | <code>UpdateMessageRequest</code> | Yes | Update payload, e.g., `{ Status: "canceled" }`. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Message|error`

Sample code:

```ballerina
twilio:UpdateMessageRequest updateReq = {
    Body: ""
};
twilio:Message updated = check twilioClient->updateMessage(
    "SM4f16fca1d7391c99249b842f063c4da0",
    updateReq
);
```

Sample response:

```ballerina
{
  "sid": "SM4f16fca1d7391c99249b842f063c4da0",
  "status": "canceled",
  "body": "",
  "date_updated": "Fri, 13 Oct 2023 10:05:00 +0000"
}
```

</details>

#### Call operations

<details>
<summary>createCall</summary>

Initiates an outbound voice call. The call is controlled by TwiML returned from a `Url` or inline `Twiml`.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateCallRequest</code> | Yes | Call request body. Must include `To`, `From`, and either `Url` or `Twiml`. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Call|error`

Sample code:

```ballerina
twilio:CreateCallRequest callRequest = {
    To: "+14155551234",
    From: "+18005550100",
    Url: "http://demo.twilio.com/docs/voice.xml"
};

twilio:Call response = check twilioClient->createCall(callRequest);
```

Sample response:

```ballerina
{
  "sid": "CA1234567890abcdef1234567890abcdef",
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "from": "+18005550100",
  "to": "+14155551234",
  "status": "queued",
  "direction": "outbound-api",
  "duration": null,
  "start_time": null,
  "end_time": null,
  "price": null,
  "price_unit": "USD",
  "uri": "/2010-04-01/Accounts/ACxx/Calls/CAxx.json"
}
```

</details>

<details>
<summary>fetchCall</summary>

Fetches the details of a specific call by its SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The unique SID of the Call resource (begins with `CA`). |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Call|error`

Sample code:

```ballerina
twilio:Call call = check twilioClient->fetchCall("CA1234567890abcdef1234567890abcdef");
```

Sample response:

```ballerina
{
  "sid": "CA1234567890abcdef1234567890abcdef",
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "from": "+18005550100",
  "to": "+14155551234",
  "status": "completed",
  "direction": "outbound-api",
  "duration": "30",
  "start_time": "Fri, 13 Oct 2023 10:00:00 +0000",
  "end_time": "Fri, 13 Oct 2023 10:00:30 +0000",
  "price": "-0.01350",
  "price_unit": "USD"
}
```

</details>

<details>
<summary>listCall</summary>

Retrieves a paginated list of calls made to and from the account, with optional filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `to` | <code>string?</code> | No | Filter calls by the `To` phone number. |
| `from` | <code>string?</code> | No | Filter calls by the `From` phone number. |
| `status` | <code>Call_enum_status?</code> | No | Filter by call status (e.g., `queued`, `ringing`, `in-progress`, `completed`). |
| `pageSize` | <code>int?</code> | No | Number of records per page. Maximum 1000. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `ListCallResponse|error`

Sample code:

```ballerina
twilio:ListCallResponse response = check twilioClient->listCall(pageSize = 10);
twilio:Call[]? calls = response.calls;
if calls is twilio:Call[] {
    foreach twilio:Call c in calls {
        string sid = c?.sid ?: "";
        string status = c?.status.toString();
    }
}
```

Sample response:

```ballerina
{
  "calls": [
    {
      "sid": "CA1234567890abcdef1234567890abcdef",
      "from": "+18005550100",
      "to": "+14155551234",
      "status": "completed",
      "duration": "30",
      "start_time": "Fri, 13 Oct 2023 10:00:00 +0000"
    }
  ],
  "page": 0,
  "page_size": 10,
  "first_page_uri": "/2010-04-01/Accounts/ACxx/Calls.json?PageSize=10&Page=0",
  "next_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACxx/Calls.json?PageSize=10"
}
```

</details>

<details>
<summary>deleteCall</summary>

Deletes a call log record from the account. The call must have a terminal status (`completed`, `busy`, `failed`, `no-answer`, or `canceled`).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the call to delete. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `http:Response|error`

Sample code:

```ballerina

```

</details>

<details>
<summary>updateCall</summary>

Modifies a live call in progress: for example, redirecting it to a new TwiML URL or hanging it up.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the call to update. |
| `payload` | <code>UpdateCallRequest</code> | Yes | Update payload, e.g., `{ Status: "completed" }` to hang up. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Call|error`

Sample code:

```ballerina
twilio:UpdateCallRequest updateReq = {
    Status: "completed"
};
twilio:Call updated = check twilioClient->updateCall(
    "CA1234567890abcdef1234567890abcdef",
    updateReq
);
```

Sample response:

```ballerina
{
  "sid": "CA1234567890abcdef1234567890abcdef",
  "status": "completed",
  "date_updated": "Fri, 13 Oct 2023 10:05:00 +0000"
}
```

</details>

#### Phone number management

<details>
<summary>createIncomingPhoneNumber</summary>

Purchases a new Twilio phone number and adds it to the account. Specify either `PhoneNumber` (E.164) or `AreaCode` to select the number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateIncomingPhoneNumberRequest</code> | Yes | Purchase request. Provide `PhoneNumber` (e.g., `+14155551234`) or `AreaCode` (US/Canada only). |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Incoming_phone_number|error`

Sample code:

```ballerina
twilio:CreateIncomingPhoneNumberRequest purchaseReq = {
    PhoneNumber: "+14155558000",
    FriendlyName: "My Ballerina Number",
    SmsUrl: "https://example.com/sms/webhook"
};
twilio:Incoming_phone_number number = check twilioClient->createIncomingPhoneNumber(purchaseReq);
```

Sample response:

```ballerina
{
  "sid": "PN1234567890abcdef1234567890abcdef",
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "phone_number": "+14155558000",
  "friendly_name": "My Ballerina Number",
  "sms_url": "https://example.com/sms/webhook",
  "origin": "twilio",
  "date_created": "Fri, 13 Oct 2023 10:00:00 +0000",
  "capabilities": {"voice": true, "sms": true, "mms": true},
  "uri": "/2010-04-01/Accounts/ACxx/IncomingPhoneNumbers/PNxx.json"
}
```

</details>

<details>
<summary>fetchIncomingPhoneNumber</summary>

Fetches the configuration and properties of a specific incoming phone number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the IncomingPhoneNumber resource (begins with `PN`). |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `Incoming_phone_number|error`

Sample code:

```ballerina
twilio:Incoming_phone_number number = check twilioClient->fetchIncomingPhoneNumber(
    "PN1234567890abcdef1234567890abcdef"
);
```

Sample response:

```ballerina
{
  "sid": "PN1234567890abcdef1234567890abcdef",
  "phone_number": "+14155558000",
  "friendly_name": "My Ballerina Number",
  "sms_url": "https://example.com/sms/webhook",
  "voice_url": "https://example.com/voice/webhook",
  "capabilities": {"voice": true, "sms": true, "mms": true},
  "status_callback": "",
  "uri": "/2010-04-01/Accounts/ACxx/IncomingPhoneNumbers/PNxx.json"
}
```

</details>

<details>
<summary>listIncomingPhoneNumber</summary>

Retrieves a paginated list of all incoming phone numbers associated with the account.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `friendlyName` | <code>string?</code> | No | Filter by the friendly name assigned to the phone number. |
| `phoneNumber` | <code>string?</code> | No | Filter by the phone number in E.164 format. |
| `pageSize` | <code>int?</code> | No | Number of records per page. Maximum 1000. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `ListIncomingPhoneNumberResponse|error`

Sample code:

```ballerina
twilio:ListIncomingPhoneNumberResponse response = check twilioClient->listIncomingPhoneNumber();
```

Sample response:

```ballerina
{
  "incoming_phone_numbers": [
    {
      "sid": "PN1234567890abcdef1234567890abcdef",
      "phone_number": "+14155558000",
      "friendly_name": "My Ballerina Number",
      "capabilities": {"voice": true, "sms": true, "mms": true}
    }
  ],
  "page": 0,
  "page_size": 50,
  "uri": "/2010-04-01/Accounts/ACxx/IncomingPhoneNumbers.json"
}
```

</details>

<details>
<summary>deleteIncomingPhoneNumber</summary>

Releases a phone number from the account. The number will no longer be associated with the account and will become available for purchase by others.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the IncomingPhoneNumber resource to delete. |
| `accountSid` | <code>string?</code> | No | Override the account SID. |

Returns: `http:Response|error`

Sample code:

```ballerina

```

</details>

#### Account operations

<details>
<summary>fetchBalance</summary>

Fetches the current balance of the account in the account's billing currency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `accountSid` | <code>string?</code> | No | The SID of the account to fetch the balance for. Defaults to the authenticated account. |

Returns: `Balance|error`

Sample code:

```ballerina
twilio:Balance balance = check twilioClient->fetchBalance();
```

Sample response:

```ballerina
{
  "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "balance": "12.3450",
  "currency": "USD"
}
```

</details>

<details>
<summary>fetchAccount</summary>

Fetches the properties and settings of a specific account by SID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the account to fetch (begins with `AC`). |

Returns: `Account|error`

Sample code:

```ballerina
twilio:Account account = check twilioClient->fetchAccount("ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```

Sample response:

```ballerina
{
  "sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "friendly_name": "My Twilio Account",
  "status": "active",
  "type": "Full",
  "date_created": "Mon, 01 Jan 2023 00:00:00 +0000",
  "date_updated": "Fri, 13 Oct 2023 09:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACxx.json"
}
```

</details>

<details>
<summary>createAccount</summary>

Creates a new Twilio sub-account under the account making the request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CreateAccountRequest</code> | Yes | Sub-account request. Optionally provide `FriendlyName` to label the new account. |

Returns: `Account|error`

Sample code:

```ballerina
twilio:CreateAccountRequest subAccountReq = {
    FriendlyName: "Sample Sub Account"
};
twilio:Account subAccount = check twilioClient->createAccount(subAccountReq);
```

Sample response:

```ballerina
{
  "sid": "ACyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  "friendly_name": "Sample Sub Account",
  "status": "active",
  "type": "Full",
  "owner_account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "date_created": "Fri, 13 Oct 2023 10:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACyy.json"
}
```

</details>

<details>
<summary>listAccount</summary>

Retrieves a list of sub-accounts belonging to the authenticated account, with optional filters.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `friendlyName` | <code>string?</code> | No | Filter accounts with this exact friendly name. |
| `status` | <code>Account_enum_status?</code> | No | Filter by account status: `active`, `suspended`, or `closed`. |
| `pageSize` | <code>int?</code> | No | Number of records per page. Maximum 1000. |

Returns: `ListAccountResponse|error`

Sample code:

```ballerina
twilio:ListAccountResponse response = check twilioClient->listAccount(status = "active");
```

Sample response:

```ballerina
{
  "accounts": [
    {
      "sid": "ACyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "friendly_name": "Sample Sub Account",
      "status": "active",
      "type": "Full"
    }
  ],
  "page": 0,
  "page_size": 50,
  "uri": "/2010-04-01/Accounts.json?Status=active"
}
```

</details>

<details>
<summary>updateAccount</summary>

Modifies the properties of an account: for example, changing its friendly name or suspending it.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sid` | <code>string</code> | Yes | The SID of the account to update. |
| `payload` | <code>UpdateAccountRequest</code> | Yes | Update fields such as `FriendlyName` or `Status`. |

Returns: `Account|error`

Sample code:

```ballerina
twilio:UpdateAccountRequest updateReq = {
    FriendlyName: "Renamed Sub Account"
};
twilio:Account updated = check twilioClient->updateAccount(
    "ACyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    updateReq
);
```

Sample response:

```ballerina
{
  "sid": "ACyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  "friendly_name": "Renamed Sub Account",
  "status": "active",
  "date_updated": "Fri, 13 Oct 2023 11:00:00 +0000"
}
```

</details>
