---
title: Triggers
description: "Reference for the WhatsApp Business webhook listener and service callbacks: configure inbound message, status, and lifecycle event handlers in Ballerina integrations."
keywords: [whatsapp, webhook listener, meta cloud api, event handler, ballerina]
connector: true
connector_name: "whatsapp.business"
---

# Triggers

The `ballerinax/whatsapp.business` package supports event-driven integration through WhatsApp Business Cloud webhooks. When a message arrives or an account, template, or phone number state changes, the listener receives the webhook request and dispatches it to the matching service callback automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `whatsapp:Listener` | Wraps an `http:Listener`, handles the Meta subscription handshake and `X-Hub-Signature-256` verification, and dispatches events to an attached `WhatsAppService`. |
| `whatsapp:WhatsAppService` | Defines the webhook-field callbacks, such as `onMessages`, `onAccountUpdate`, and `onSecurity`. |
| `whatsapp:MessagesNotification` | The payload passed to `onMessages`: either a batch of inbound messages (`Messages`) or a batch of status updates (`MessageStatuses`). |

For action-based operations, see the [Action Reference](actions.md).

## Error handling

Each service callback returns `error?`. If a callback returns an error, the listener logs it and continues processing subsequent events. Declare the eleventh, optional `onError` handler to react to a handler failure beyond logging. It receives the originating error and the webhook field being dispatched at the time.

## Listener

The `whatsapp:Listener` receives webhook requests from Meta, handles the `GET` subscription handshake automatically, and routes `POST` notifications to the attached service.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `int\|http:Listener` | A port number to bind a new `http:Listener` to, or an existing `http:Listener`. |
| `ListenerConfig` | The verify token and app secret; both required. |

`whatsapp:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `verifyToken` | `string` | Required | The verification token configured in the Meta App dashboard. |
| `appSecret` | `string` | Required | The Meta app secret, used to verify the `X-Hub-Signature-256` header on inbound webhook notifications. |

### Initializing the listener

```ballerina
import ballerinax/whatsapp.business as whatsapp;

configurable string verifyToken = ?;
configurable string appSecret = ?;

listener whatsapp:Listener whatsappListener = new (8090, verifyToken = verifyToken, appSecret = appSecret);
```

## Service

A WhatsApp Business trigger service is a Ballerina service attached to a `whatsapp:Listener`, implementing `whatsapp:WhatsAppService`. None of its handlers are required. Declare only the ones you care about. A field whose handler you didn't declare (or a field outside this closed set) is logged and dropped rather than delivered anywhere.

### Callback signatures

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onMessages` | `remote function onMessages(whatsapp:MessagesNotification notification) returns error?` | Invoked for inbound messages and outbound message status updates. |
| `onAccountReviewUpdate` | `remote function onAccountReviewUpdate(whatsapp:AccountReviewUpdate update) returns error?` | Invoked when a WABA review decision changes. |
| `onAccountUpdate` | `remote function onAccountUpdate(whatsapp:AccountUpdate update) returns error?` | Invoked on an account-lifecycle or compliance change. |
| `onBusinessCapabilityUpdate` | `remote function onBusinessCapabilityUpdate(whatsapp:BusinessCapabilityUpdate update) returns error?` | Invoked when a WABA's messaging or phone-number capability limits change. |
| `onMessageTemplateQualityUpdate` | `remote function onMessageTemplateQualityUpdate(whatsapp:MessageTemplateQualityUpdate update) returns error?` | Invoked when a message template's quality score changes. |
| `onMessageTemplateStatusUpdate` | `remote function onMessageTemplateStatusUpdate(whatsapp:MessageTemplateStatusUpdate update) returns error?` | Invoked when a message template's status changes. |
| `onPhoneNumberNameUpdate` | `remote function onPhoneNumberNameUpdate(whatsapp:PhoneNumberNameUpdate update) returns error?` | Invoked when a phone number's display-name review outcome is available. |
| `onPhoneNumberQualityUpdate` | `remote function onPhoneNumberQualityUpdate(whatsapp:PhoneNumberQualityUpdate update) returns error?` | Invoked when a phone number's messaging throughput or quality tier changes. |
| `onSecurity` | `remote function onSecurity(whatsapp:Security security) returns error?` | Invoked on a two-step-verification PIN change or reset request. |
| `onTemplateCategoryUpdate` | `remote function onTemplateCategoryUpdate(whatsapp:TemplateCategoryUpdate update) returns error?` | Invoked when a message template's category changes. |
| `onError` | `remote function onError(whatsapp:HandlerError handlerError) returns error?` | Invoked when any handler above returned an error while being dispatched. |

:::note
A compiler plugin validates every handler you declare: its name must be one of the eleven above, its parameter must match the documented event type, and it must return `error?`.
:::

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/whatsapp.business as whatsapp;

configurable string verifyToken = ?;
configurable string appSecret = ?;

listener whatsapp:Listener whatsappListener = new (8090, verifyToken = verifyToken, appSecret = appSecret);

service whatsapp:WhatsAppService on whatsappListener {

    remote function onMessages(whatsapp:MessagesNotification notification) returns error? {
        if notification is whatsapp:Messages {
            // handle inbound messages: notification.messages
        } else {
            // handle status updates: notification.statuses
        }
    }

    remote function onSecurity(whatsapp:Security security) returns error? {
        // handle a PIN change/reset event
    }
}
```

## Event payload types

### `InboundMessage`

One inbound message, part of a `Messages` batch.

| Field | Type | Description |
|-------|------|-------------|
| `from` | `string` | The WhatsApp ID (phone number) of the sender. |
| `messageId` | `string` | The unique WhatsApp message ID (`wamid...`). |
| `messageType` | `string` | The message type (for example, `text`, `image`, `interactive`). |
| `text` | `string?` | The message body for text messages; `()` for non-text messages. |
| `timestamp` | `string?` | The provider-reported timestamp of the message, if present. |
| `contactName` | `string?` | The sender's WhatsApp profile name, if present. |
| `raw` | `json` | The raw message object as received, for accessing type-specific fields. |

### `MessageStatusUpdate`

One outbound message status update, part of a `MessageStatuses` batch.

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | `string` | The message ID whose status changed. |
| `status` | `string` | The new status (`sent`, `delivered`, `read`, or `failed`). |
| `recipientId` | `string` | The WhatsApp ID of the recipient. |
| `timestamp` | `string?` | The provider-reported timestamp of the status change, if present. |
| `errors` | `MessageErrorDetail[]?` | Delivery failure details; present only when `status` is `failed`. |
| `raw` | `json` | The raw status object as received. |

### `AccountUpdate`

A WABA account-lifecycle or compliance change. Only the sub-record matching `event` is populated.

| Field | Type | Description |
|-------|------|-------------|
| `wabaId` | `string` | The WhatsApp Business Account ID the change relates to. |
| `event` | `string` | The event type (for example, `ACCOUNT_DELETED`, `ACCOUNT_VIOLATION`, `DISABLED_UPDATE`). |
| `country` | `string?` | The ISO country code; present only for location-related events. |
| `timestamp` | `int?` | The entry-level webhook trigger timestamp (Unix epoch seconds), if present. |
| `raw` | `json` | The raw `value` object as received, for accessing undocumented sub-fields. |

### `Security`

A two-step-verification PIN change, reset request, or reset success for a business phone number.

| Field | Type | Description |
|-------|------|-------------|
| `wabaId` | `string` | The WhatsApp Business Account ID the phone number belongs to. |
| `displayPhoneNumber` | `string` | The business phone number the security event relates to. |
| `event` | `string` | The security action (`PIN_CHANGED`, `PIN_RESET_REQUEST`, or `PIN_REQUEST_SUCCESS`). |
| `requester` | `string?` | The Meta Business Suite user ID that initiated the action; present only for reset requests. |
| `timestamp` | `int?` | The entry-level webhook trigger timestamp (Unix epoch seconds), if present. |
| `raw` | `json` | The raw `value` object as received. |

### `HandlerError`

Reports an error returned by another `WhatsAppService` handler while it was being invoked. Delivered to `onError`, if declared.

| Field | Type | Description |
|-------|------|-------------|
| `error` | `error` | The error the handler returned. |
| `field` | `string` | The webhook field being dispatched when the handler failed (for example, `messages`, `account_update`). |
| `payload` | `json` | The raw `value` object that was being dispatched, for diagnostics. |

## What's next

- [Action Reference](actions.md): send messages and templates, and manage media.
- [Example](example.md): complete example integrations for the WhatsApp Business connector and trigger.
- [Setup Guide](setup-guide.md): create a Meta app and configure the webhook.
