---
title: Triggers
description: "Reference for the Aayu MFT Gateway AS2 webhook listener and service callbacks: receive AS2 message received, sent, failed and incomplete events in Ballerina integrations."
keywords: [aayu, mft gateway, as2, webhook listener, event handler, ballerina]
connector: true
connector_name: "aayu.mftg.as2.trigger"
---

# Triggers

The `ballerinax/aayu.mftg.as2.trigger` package receives the AS2 webhooks of Aayu MFT Gateway. When an AS2 message is received from a trading partner, sent to one, fails to send, or is sent without a delivery confirmation, MFT Gateway sends an HTTP request to your integration, and the listener calls the callback for that event with a typed payload.

This reference covers `ballerinax/aayu.mftg.as2.trigger` version 0.9.0. The following components work together:

| Component | Role |
|-----------|------|
| `aayu:Listener` | Receives webhook requests from Aayu MFT Gateway, verifies each one, and calls the attached service for its event. |
| `aayu:ListenerConfig` | Holds what the listener verifies deliveries with, the webhook public key from MFT Gateway. |
| Service types | 4 service types, such as `aayu:ReceivedMessageService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `aayu:MessageReceivedEvent`, passed to its callback. |

## Error handling

The listener acknowledges a delivery to Aayu MFT Gateway as soon as it is verified, and then calls your callback, so Aayu MFT Gateway never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `aayu:Listener` exposes an HTTP endpoint for Aayu MFT Gateway to deliver webhooks to. Set its public URL as the **Webhook URL** of an AS2 webhook in MFT Gateway. See the [Setup Guide](setup-guide.md#configuring-mft-gateway-webhooks).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the Aayu MFT Gateway webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The **Webhook Public Key** from MFT Gateway, the whole PEM text including the `BEGIN` and `END` lines. A certificate PEM works too. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

MFT Gateway signs each payload with a key pair dedicated to your account, in the `mftg-wh-signature` header: the Base64 RSA-SHA256 signature of the JSON body, with its keys sorted. The listener checks the signature with the public key in `webhookSecret`. A delivery without the header, with a signature that doesn't verify, or arriving while `webhookSecret` isn't set gets `401 Unauthorized`. Turn on **Generate Signature For Webhook Payload** on the webhook, or MFT Gateway sends no signature.

The listener calls the callback for each delivery's `eventType`, such as `MESSAGE.RECEIVED.SUCCESS`. The package covers the AS2 events; SFTP webhooks use different payloads.

### Initializing the listener

```ballerina
import ballerinax/aayu.mftg.as2.trigger as aayu;

configurable string webhookPublicKey = ?;
configurable int port = 8090;

listener aayu:Listener aayuListener = new ({webhookSecret: webhookPublicKey}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = """-----BEGIN PUBLIC KEY-----
<the key from webhook-pubkey.pem>
-----END PUBLIC KEY-----"""
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 4 callbacks in all.

A service can also be attached on a path of its own, such as `service aayu:ReceivedMessageService /aayu on aayuListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(aayu:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `aayu:ReceivedMessageService` | `onMessageReceivedSuccess` | <code>aayu:MessageReceivedEvent</code> |
| `aayu:SentMessageService` | `onMessageSendSuccess` | <code>aayu:MessageSentEvent</code> |
| `aayu:FailedMessageService` | `onMessageSendFailed` | <code>aayu:MessageFailedEvent</code> |
| `aayu:IncompleteMessageService` | `onMessageSendIncomplete` | <code>aayu:MessageIncompleteEvent</code> |

### Full usage example

This is the [`received-file-logger`](https://github.com/ballerina-platform/module-ballerinax-aayu.mftg.as2.trigger/tree/main/examples/received-file-logger) example from the package:

```ballerina
import ballerina/log;
import ballerinax/aayu.mftg.as2.trigger as aayu;

// webhookSecret is the public key downloaded from MFT Gateway, set in Config.toml.
configurable aayu:ListenerConfig config = ?;

listener aayu:Listener aayuListener = new (config, 8090);

// Logs each AS2 message received from a trading partner, with where its files were stored.
service aayu:ReceivedMessageService on aayuListener {

    remote function onMessageReceivedSuccess(aayu:MessageReceivedEvent payload) returns error? {
        string[] files = payload.attachments ?: [];
        log:printInfo("AS2 message received", partner = payload.partnerName, station = payload.stationName,
                subject = payload.messageSubject, messageId = payload.messageIdentifier,
                bucket = payload.bucketName, fileCount = files.length());
        foreach string file in files {
            log:printInfo("Attachment", messageId = payload.messageIdentifier, file = file);
        }
    }
}
```

## Event payload types

Each event has its own payload record. The type used by the example above:

### `MessageReceivedEvent`

| Field | Type | Description |
|-------|------|-------------|
| `service` | <code>string</code> | Service the event came from (as2 or sftp). |
| `to` | <code>string</code> | Email address of the receiving party. |
| `messageId` | <code>int</code> | Numeric identifier of the message. |
| `messageIdentifier` | <code>string</code> | AS2 message identifier of the message. |
| `messageSubject` | <code>string</code> | Subject of the message. |
| `timestamp` | <code>int</code> | Epoch milliseconds at which the event was created. |
| `partnerIdentifier` | <code>string</code> | Identifier of the Partner. |
| `partnerName` | <code>string</code> | Name of the Partner. |
| `stationIdentifier` | <code>string</code> | Identifier of the Station. |
| `stationName` | <code>string</code> | Name of the Station. |
| `attachments` | <code>string[]</code> | Paths of the message attachments. Optional. |
| `bucketName` | <code>string</code> | Name of the bucket the message files are stored in. |
| `tenantName` | <code>string</code> | Name of the tenant. |
| `tenantId` | <code>int</code> | ID of the tenant. |
| `tenantEmail` | <code>string</code> | Email associated with the tenant. |
| `eventType` | <code>string</code> | Event type. |
| `receivedAt` | <code>int</code> | Epoch milliseconds at which the message was received. |

## What's next

- [Setup Guide](setup-guide.md#configuring-mft-gateway-webhooks): point Aayu MFT Gateway at your listener.
- [Example](example.md#aayu-mft-gateway-trigger-example): build an Aayu MFT Gateway trigger integration in WSO2 Integrator.
