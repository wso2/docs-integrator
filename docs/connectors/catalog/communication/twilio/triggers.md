---
title: Triggers
---

# Triggers

Trigger functionality uses the **`ballerinax/trigger.twilio`** package — a separate package from the `ballerinax/twilio` REST API client. Use `import ballerinax/trigger.twilio;` for all listener, service, and event type references.

The `ballerinax/trigger.twilio` package supports event-driven integration through Twilio webhooks. When SMS status changes or call status changes occur in Twilio, the listener receives the webhook request and dispatches it to the matching service callback automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `twilio:Listener` | Exposes the webhook endpoint and dispatches incoming Twilio events to attached services. |
| `twilio:SmsStatusService` | Defines SMS status callbacks such as `onAccepted`, `onDelivered`, `onFailed`, and `onReceived`. |
| `twilio:CallStatusService` | Defines call status callbacks such as `onQueued`, `onRinging`, `onInProgress`, and `onCompleted`. |
| `twilio:SmsStatusChangeEventWrapper` | The SMS status payload passed to SMS callbacks. |
| `twilio:CallStatusEventWrapper` | The call status payload passed to call callbacks. |

For action-based operations, see the [Action Reference](actions.md).

## Error handling

Each service callback returns `error?`. If a callback returns an `error`, the listener logs the failure and returns an HTTP `500` response to Twilio. Twilio treats non-`2xx` responses as delivery failures and will retry the webhook according to its retry policy (up to 3 retries with exponential backoff). To prevent unintended retries, handle expected failure cases within the callback and return `()` (nil) to acknowledge the event without triggering a retry.

## Listener

The `twilio:Listener` receives webhook requests from Twilio and routes events to the attached service type. Configure your Twilio phone number or messaging service to send status callback webhooks to the public URL of the running listener using `HTTP POST`.

### Configuration

The listener is initialized with the port used to expose the webhook endpoint.

| Config Type | Description |
|-------------|-------------|
| `int` | Webhook listener port. |

### Initializing the listener

**Listener with a configurable port:**

```ballerina
import ballerinax/trigger.twilio;

configurable int listenerPort = ?;

listener twilio:Listener twilioListener = new (listenerPort);
```

**Listener with a fixed port:**

```ballerina
import ballerinax/trigger.twilio;

listener twilio:Listener twilioListener = new (8090);
```

## Service

A Twilio trigger service is a Ballerina service attached to a `twilio:Listener`. Select `twilio:SmsStatusService` for SMS status callbacks or `twilio:CallStatusService` for voice call status callbacks.

### Callback signatures

| Service Type | Callback | Signature | Description |
|--------------|----------|-----------|-------------|
| `twilio:SmsStatusService` | `onAccepted` | `remote function onAccepted(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when Twilio has accepted the message request. |
| `twilio:SmsStatusService` | `onQueued` | `remote function onQueued(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when the message is queued to be sent. |
| `twilio:SmsStatusService` | `onSending` | `remote function onSending(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when Twilio is sending the message. |
| `twilio:SmsStatusService` | `onSent` | `remote function onSent(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when the nearest upstream carrier accepted the message. |
| `twilio:SmsStatusService` | `onFailed` | `remote function onFailed(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when the message could not be sent. |
| `twilio:SmsStatusService` | `onDelivered` | `remote function onDelivered(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when Twilio receives delivery confirmation from the upstream carrier. |
| `twilio:SmsStatusService` | `onUndelivered` | `remote function onUndelivered(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when Twilio receives a delivery receipt indicating the message was not delivered. |
| `twilio:SmsStatusService` | `onReceiving` | `remote function onReceiving(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when an inbound message has been received by Twilio and is being processed. |
| `twilio:SmsStatusService` | `onReceived` | `remote function onReceived(twilio:SmsStatusChangeEventWrapper event) returns error?` | Invoked when an inbound message was received by one of your Twilio numbers. |
| `twilio:CallStatusService` | `onQueued` | `remote function onQueued(twilio:CallStatusEventWrapper event) returns error?` | Invoked when a call is ready and waiting in line before going out. |
| `twilio:CallStatusService` | `onRinging` | `remote function onRinging(twilio:CallStatusEventWrapper event) returns error?` | Invoked when the call is ringing. |
| `twilio:CallStatusService` | `onInProgress` | `remote function onInProgress(twilio:CallStatusEventWrapper event) returns error?` | Invoked when the call is answered and active. |
| `twilio:CallStatusService` | `onCompleted` | `remote function onCompleted(twilio:CallStatusEventWrapper event) returns error?` | Invoked when the call has ended normally. |
| `twilio:CallStatusService` | `onBusy` | `remote function onBusy(twilio:CallStatusEventWrapper event) returns error?` | Invoked when the caller receives a busy signal. |
| `twilio:CallStatusService` | `onFailed` | `remote function onFailed(twilio:CallStatusEventWrapper event) returns error?` | Invoked when the call could not be completed. |
| `twilio:CallStatusService` | `onNoAnswer` | `remote function onNoAnswer(twilio:CallStatusEventWrapper event) returns error?` | Invoked when the call ends without being answered. |
| `twilio:CallStatusService` | `onCanceled` | `remote function onCanceled(twilio:CallStatusEventWrapper event) returns error?` | Invoked when a queued or ringing call is canceled. |

Implement only the callbacks relevant to your use case. For example, SMS delivery tracking typically uses `twilio:SmsStatusService`, while voice call tracking uses `twilio:CallStatusService`.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/trigger.twilio;

configurable int listenerPort = ?;

listener twilio:Listener twilioListener = new (listenerPort);

service twilio:SmsStatusService on twilioListener {
    remote function onDelivered(twilio:SmsStatusChangeEventWrapper event) returns error? {
        log:printInfo("SMS delivered",
            messageSid = event.MessageSid,
            status = event.MessageStatus,
            to = event.To
        );
    }

    remote function onFailed(twilio:SmsStatusChangeEventWrapper event) returns error? {
        log:printInfo("SMS failed",
            messageSid = event.MessageSid,
            status = event.MessageStatus
        );
    }
}
```

## Event payload types

### `SmsStatusChangeEventWrapper`

| Field | Type | Description |
|-------|------|-------------|
| `MessageSid` | `string?` | Unique identifier for the message. |
| `SmsSid` | `string?` | Same value as `MessageSid`; included for backward compatibility. |
| `SmsStatus` | `string?` | SMS status reported by Twilio. |
| `MessageStatus` | `string?` | Message status reported by Twilio. |
| `AccountSid` | `string?` | Twilio account ID associated with the message. |
| `MessagingServiceSid` | `string?` | Messaging Service ID associated with the message. |
| `From` | `string?` | Sender phone number or channel address. |
| `To` | `string?` | Recipient phone number or channel address. |
| `Body` | `string?` | Message body. |
| `NumSegments` | `string?` | Number of SMS segments used for the message. |
| `NumMedia` | `string?` | Number of media items associated with the message. |
| `ApiVersion` | `string?` | Twilio API version used to handle the message. |

### `CallStatusEventWrapper`

| Field | Type | Description |
|-------|------|-------------|
| `CallSid` | `string?` | Unique identifier for the call. |
| `CallStatus` | `string?` | Descriptive status for the call. |
| `AccountSid` | `string?` | Twilio account ID associated with the call. |
| `From` | `string?` | Phone number or client identifier that initiated the call. |
| `To` | `string?` | Phone number or client identifier of the called party. |
| `Direction` | `string?` | Direction of the call. |
| `Caller` | `string?` | Caller number. |
| `Called` | `string?` | Called number. |
| `CallDuration` | `string?` | Duration of the completed call in seconds. |
| `RecordingUrl` | `string?` | URL of the recorded call audio, when available. |
| `RecordingSid` | `string?` | Recording identifier, when available. |
| `ApiVersion` | `string?` | Twilio API version used to handle the call. |

## What's next

- [Action Reference](actions.md) — REST API client operations for sending messages and making calls.
- [Example](example.md) — Complete example integrations for the Twilio connector and trigger.
- [Setup Guide](setup-guide.md) — Create a Twilio account and obtain credentials.
