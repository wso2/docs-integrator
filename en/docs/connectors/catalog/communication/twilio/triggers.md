---
title: Triggers
description: "Reference for the Twilio status callback listener and service callbacks: receive call and message status changes in Ballerina integrations."
keywords: [twilio, status callback, webhook listener, event handler, ballerina]
connector: true
connector_name: "twilio"
connector_version: "5.0.x"
---

# Triggers

The `ballerinax/twilio.trigger` package receives Twilio status callbacks. As a call or a message moves through its states, such as `ringing`, `completed`, `sent` or `delivered`, Twilio sends an HTTP request to your integration, and the listener calls the callback for that status with a typed payload. It replaces the earlier `ballerinax/trigger.twilio` package.

This reference covers `ballerinax/twilio.trigger` version 1.0.0. The following components work together:

| Component | Role |
|-----------|------|
| `twilio:Listener` | Receives webhook requests from Twilio, verifies each one, and calls the attached service for its event. |
| `twilio:ListenerConfig` | Holds what the listener verifies deliveries with, your account's Auth Token and the public base URL Twilio calls. |
| Service types | 2 service types, such as `twilio:SmsStatusService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `twilio:SmsStatusChangeEventWrapper`, passed to its callback. |

To call the Twilio API from your integration, use the `ballerinax/twilio` connector. See the [Action Reference](actions.md).

## Error handling

The listener acknowledges a delivery to Twilio as soon as it is verified, and then calls your callback, so Twilio never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `twilio:Listener` exposes an HTTP endpoint for Twilio to deliver webhooks to. It serves call status callbacks at `/callStatus` and message status callbacks at `/smsStatus`, so the callback URLs you give Twilio are its public base URL followed by one of those paths. See the [Setup Guide](setup-guide.md#configuring-twilio-status-callbacks).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the Twilio webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | Your Twilio account's **Auth Token**. The listener verifies every callback with it, and rejects every delivery while it isn't set. |
| `webhookBaseUrl` | <code>string</code> | <code>""</code> | The scheme and host Twilio calls, such as `https://abc123.ngrok-free.app`, without a trailing slash. Twilio signs the full callback URL, so this must match it exactly. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

Twilio signs each callback with your Auth Token, in the `X-Twilio-Signature` header: the Base64 HMAC-SHA1 of the full callback URL followed by every POST parameter, sorted by name, each name followed directly by its value. The listener rebuilds the URL from `webhookBaseUrl` and the path and query string it received, computes the signature with `webhookSecret`, and compares the two in constant time. A callback without the header, with a different signature, or arriving while `webhookSecret` isn't set gets `401 Unauthorized`. A `401` for every callback usually means `webhookBaseUrl` doesn't match the URL Twilio calls.

The listener calls the callback for the `CallStatus` parameter of a call status callback, or the `MessageStatus` parameter of a message status callback.

### Initializing the listener

```ballerina
import ballerinax/twilio.trigger as twilio;

configurable string authToken = ?;
configurable string webhookBaseUrl = ?;
configurable int port = 8090;

listener twilio:Listener twilioListener = new ({webhookSecret: authToken, webhookBaseUrl}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<your Twilio Auth Token>"
webhookBaseUrl = "https://<your public host>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 22 callbacks in all.

A service can also be attached on a path of its own, such as `service twilio:SmsStatusService /twilio on twilioListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(twilio:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `twilio:CallStatusService` | `onInitiated`, `onQueued`, `onRinging`, `onInProgress`, `onCompleted`, `onBusy`, `onFailed`, `onNoAnswer`, `onCanceled` | <code>twilio:CallStatusEventWrapper</code> |
| `twilio:SmsStatusService` | `onAccepted`, `onQueued`, `onSending`, `onSent`, `onFailed`, `onDelivered`, `onUndelivered`, `onReceiving`, `onReceived`, `onScheduled`, `onRead`, `onCanceled`, `onPartiallyDelivered` | <code>twilio:SmsStatusChangeEventWrapper</code> |

### Full usage example

This is the [`sms-delivery-tracker`](https://github.com/ballerina-platform/module-ballerinax-twilio.trigger/tree/main/examples/sms-delivery-tracker) example from the package:

```ballerina
import ballerina/log;
import ballerinax/twilio.trigger as twilio;

configurable twilio:ListenerConfig config = {
    webhookSecret: "xxxxxx",
    webhookBaseUrl: "https://xxxx.ngrok-free.app"
};

listener twilio:Listener twilioListener = new (config, 8090);

// Follows each outbound message to its final state: delivered, undelivered or failed.
service twilio:SmsStatusService on twilioListener {

    remote function onAccepted(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        logProgress(payload);
    }

    remote function onQueued(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        logProgress(payload);
    }

    remote function onSending(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        logProgress(payload);
    }

    remote function onSent(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        logProgress(payload);
    }

    remote function onDelivered(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        log:printInfo("Message delivered", messageSid = payload.MessageSid, to = payload.To);
    }

    remote function onUndelivered(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        log:printWarn("Message undelivered", messageSid = payload.MessageSid, to = payload.To,
                errorCode = payload.ErrorCode);
    }

    remote function onFailed(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        log:printError("Message failed", messageSid = payload.MessageSid, to = payload.To,
                errorCode = payload.ErrorCode);
    }

    remote function onPartiallyDelivered(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        log:printWarn("Message partially delivered", messageSid = payload.MessageSid, to = payload.To);
    }

    remote function onRead(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        log:printInfo("Message read", messageSid = payload.MessageSid, to = payload.To);
    }

    remote function onScheduled(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        logProgress(payload);
    }

    remote function onCanceled(twilio:SmsStatusChangeEventWrapper payload) returns error? {
        log:printInfo("Scheduled message canceled", messageSid = payload.MessageSid);
    }

    remote function onReceiving(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onReceived(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }
}

function logProgress(twilio:SmsStatusChangeEventWrapper payload) {
    log:printDebug("Message progress", messageSid = payload.MessageSid, status = payload.MessageStatus);
}
```

## Event payload types

Twilio posts the callback parameters as a form, and each service type has a record for them, with the parameter names Twilio uses. The type used by the example above:

### `SmsStatusChangeEventWrapper`

| Field | Type | Description |
|-------|------|-------------|
| `MessageSid` | <code>string</code> | A 34 character unique identifier for the message. Optional. |
| `SmsSid` | <code>string</code> | Same value as MessageSid. Deprecated and included for backward compatibility. Optional. |
| `AccountSid` | <code>string</code> | The 34 character id of the Account this message is associated with. Optional. |
| `MessagingServiceSid` | <code>string</code> | The 34 character id of the Messaging Service associated with the message. Optional. |
| `From` | <code>string</code> | The phone number or Channel address that sent this message. Optional. |
| `To` | <code>string</code> | The phone number or Channel address of the recipient. Optional. |
| `Body` | <code>string</code> | The text body of the message. Up to 1600 characters long. Optional. |
| `NumMedia` | <code>string</code> | The number of media items associated with your message. Optional. |
| `ReferralNumMedia` | <code>string</code> | The number of media items associated with a "Click to WhatsApp" advertisement. Optional. |
| `FromCity` | <code>string</code> | The city of the sender. Optional. |
| `FromState` | <code>string</code> | The state or province of the sender. Optional. |
| `SmsStatus` | <code>string</code> | The status of the message. Optional. |
| `FromZip` | <code>string</code> | The postal code of the called sender. Optional. |
| `FromCountry` | <code>string</code> | The country of the called sender. Optional. |
| `ToCity` | <code>string</code> | The city of the recipient. Optional. |
| `ToState` | <code>string</code> | The state or province of the recipient. Optional. |
| `ToZip` | <code>string</code> | The postal code of the recipient. Optional. |
| `ToCountry` | <code>string</code> | The country of the recipient. Optional. |
| `MessageStatus` | <code>string</code> | The status of the message. Optional. |
| `SmsMessageSid` | <code>string</code> | A unique identifier for this message, generated by Twilio. Optional. |
| `NumSegments` | <code>string</code> | Number of SMS messages it took to deliver the body of the message. Optional. |
| `ApiVersion` | <code>string</code> | The version of the Twilio API used to handle this message. Optional. |
| `ErrorCode` | <code>string</code> | The error code when `MessageStatus` is `failed` or `undelivered`. Optional. |
| `RawDlrDoneDate` | <code>string</code> | The carrier's delivery receipt Done Date, `YYMMDDhhmm`, for delivered or undelivered SMS and MMS. Optional. |
| `ChannelInstallSid` | <code>string</code> | The channel installation SID, for WhatsApp, RCS and other channels. Optional. |
| `ChannelStatusMessage` | <code>string</code> | The error message returned by the messaging channel when delivery failed. Optional. |
| `ChannelPrefix` | <code>string</code> | The channel prefix, such as `whatsapp`, for non-SMS channels. Optional. |
| `EventType` | <code>string</code> | Information about post-delivery events, for channels that report them. Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-twilio-status-callbacks): point Twilio at your listener.
- [Example](example.md#twilio-trigger-example): build a Twilio trigger integration in WSO2 Integrator.
- [Action Reference](actions.md): call the Twilio API with the `ballerinax/twilio` connector.
