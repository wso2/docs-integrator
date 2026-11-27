---
title: Triggers
description: "Reference for the HubSpot webhook listener and service callbacks: receive contact, company, deal, ticket, product, line item and conversation events in Ballerina integrations."
keywords: [hubspot, webhook listener, hubspot webhooks, event handler, ballerina]
connector: true
connector_name: "hubspot.trigger"
---

# Triggers

The `ballerinax/hubspot.trigger` package receives HubSpot webhooks. When a CRM object such as a contact, company or deal is created, changed or deleted, or a conversation gets a new message, HubSpot sends an HTTP request to your integration, and the listener calls the callback for that event with a typed payload. It replaces the earlier `ballerinax/trigger.hubspot` package.

This reference covers `ballerinax/hubspot.trigger` version 1.0.0. The following components work together:

| Component | Role |
|-----------|------|
| `hubspot:Listener` | Receives webhook requests from HubSpot, verifies each one, and calls the attached service for its event. |
| `hubspot:ListenerConfig` | Holds what the listener verifies deliveries with, the app's client secret and the target URL HubSpot calls. |
| Service types | 7 service types, such as `hubspot:ContactService`. Each callback handles one event. |
| Payload types | A typed record for each event, such as `hubspot:WebhookEvent`, passed to its callback. |

## Error handling

The listener acknowledges a delivery to HubSpot as soon as it is verified, and then calls your callback, so HubSpot never waits on your code. What happens after that is logged:

| Log entry | When |
|-----------|------|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | The delivery failed verification. It is answered with `401 Unauthorized` and never reaches a service. The entry gives the reason. |
| `DISPATCH_FAILED` (error) | Your callback returned an error, or the payload didn't fit the callback's type. |
| `NO_HANDLER_FOR_EVENT` (warning) | The event isn't one the package knows. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's type is attached to the listener. |

## Listener

The `hubspot:Listener` exposes an HTTP endpoint for HubSpot to deliver webhooks to. Set its public URL as the target URL of your HubSpot app's webhooks. See the [Setup Guide](setup-guide.md#configuring-hubspot-webhooks).

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ListenerConfig` | Configuration for the HubSpot webhook listener. |

**`ListenerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `webhookSecret` | <code>string</code> | Optional | The **Client secret** of your HubSpot app. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |
| `callbackUrl` | <code>string</code> | <code>""</code> | The target URL set on the app's webhooks, exactly as entered there. HubSpot signs it with every delivery, so a different value, even a missing or extra trailing slash, rejects every delivery. |

The listener's second argument is the port to listen on, or an `http:Listener` to share. The default port is `8090`. A listener created on a port accepts request bodies up to 25 MB.

### Verifying deliveries

HubSpot signs each delivery with the app's client secret, using its v3 signature. `X-HubSpot-Signature-v3` holds the Base64 HMAC-SHA256 of the request method, the target URL, the request body and the `X-HubSpot-Request-Timestamp` value, in that order. The listener computes the same value from `callbackUrl` and `webhookSecret` and compares the two in constant time. It also rejects a delivery whose timestamp is more than five minutes from the listener's clock. A rejected delivery gets `401 Unauthorized`.

HubSpot batches events into one delivery. The listener calls the callback for each event's `subscriptionType`, such as `contact.creation`.

### Initializing the listener

```ballerina
import ballerinax/hubspot.trigger as hubspot;

configurable string clientSecret = ?;
configurable string callbackUrl = ?;
configurable int port = 8090;

listener hubspot:Listener hubspotListener = new ({webhookSecret: clientSecret, callbackUrl}, port);
```

Set the secret in `Config.toml`:

```toml
webhookSecret = "<your HubSpot app's client secret>"
callbackUrl = "<the target URL set on the app's webhooks>"
```

## Service

Attach a service of one of the types below to the listener for each kind of event you need. Implement every callback of the type you attach; give a callback an empty body for an event you don't act on. Services of several types can share one listener. There are 41 callbacks in all.

A service can also be attached on a path of its own, such as `service hubspot:ContactService /hubspot on hubspotListener`, so several triggers and HTTP services can share one `http:Listener`.

### Callback signatures

Every callback has the shape `remote function <callback>(hubspot:<PayloadType> payload) returns error?`.

| Service type | Callbacks | Payload type |
|--------------|-----------|--------------|
| `hubspot:CompanyService` | `onCompanyCreation`, `onCompanyDeletion`, `onCompanyPropertyChange`, `onCompanyAssociationChange`, `onCompanyMerge`, `onCompanyRestore` | <code>hubspot:WebhookEvent</code> |
| `hubspot:ContactService` | `onContactCreation`, `onContactDeletion`, `onContactPropertyChange`, `onContactAssociationChange`, `onContactMerge`, `onContactRestore`, `onContactPrivacyDeletion` | <code>hubspot:WebhookEvent</code> |
| `hubspot:ConversationService` | `onConversationCreation`, `onConversationDeletion`, `onConversationPropertyChange`, `onConversationPrivacyDeletion`, `onConversationNewMessage` | <code>hubspot:WebhookEvent</code> |
| `hubspot:DealService` | `onDealCreation`, `onDealDeletion`, `onDealPropertyChange`, `onDealAssociationChange`, `onDealMerge`, `onDealRestore` | <code>hubspot:WebhookEvent</code> |
| `hubspot:TicketService` | `onTicketCreation`, `onTicketDeletion`, `onTicketPropertyChange`, `onTicketAssociationChange`, `onTicketMerge`, `onTicketRestore` | <code>hubspot:WebhookEvent</code> |
| `hubspot:ProductService` | `onProductCreation`, `onProductDeletion`, `onProductPropertyChange`, `onProductMerge`, `onProductRestore` | <code>hubspot:WebhookEvent</code> |
| `hubspot:LineItemService` | `onLineItemCreation`, `onLineItemDeletion`, `onLineItemPropertyChange`, `onLineItemAssociationChange`, `onLineItemMerge`, `onLineItemRestore` | <code>hubspot:WebhookEvent</code> |

### Full usage example

This is the [`deal-pipeline-notifier`](https://github.com/ballerina-platform/module-ballerinax-hubspot.trigger/tree/main/examples/deal-pipeline-notifier) example from the package:

```ballerina
import ballerina/log;
import ballerinax/hubspot.trigger as hubspot;

configurable hubspot:ListenerConfig config = {
    webhookSecret: "xxxxxx",
    callbackUrl: "https://xxxxxx.ngrok-free.app"
};

listener hubspot:Listener webhookListener = new (config, 8090);

// Auto-notify on deal creation and stage/property change. DealService declares more remote
// functions than these two - every one of them must still be implemented, even as a no-op,
// since Ballerina requires a complete implementation of the service type.
service hubspot:DealService on webhookListener {

    remote function onDealCreation(hubspot:WebhookEvent payload) returns error? {
        log:printInfo("New deal created, notify the sales channel", id = payload.objectId ?: 0);
    }

    remote function onDealPropertyChange(hubspot:WebhookEvent payload) returns error? {
        if payload.propertyName == "dealstage" {
            log:printInfo("Deal moved to a new stage", id = payload.objectId ?: 0,
                    stage = payload.propertyValue ?: "");
        }
    }

    remote function onDealDeletion(hubspot:WebhookEvent payload) returns error? {
        return;
    }

    remote function onDealMerge(hubspot:WebhookEvent payload) returns error? {
        return;
    }

    remote function onDealRestore(hubspot:WebhookEvent payload) returns error? {
        return;
    }

    remote function onDealAssociationChange(hubspot:WebhookEvent payload) returns error? {
        return;
    }
}
```

## Event payload types

HubSpot sends events in batches, and the listener calls a callback for each event in the batch. Every callback receives a `WebhookEvent`:

### `WebhookEvent`

| Field | Type | Description |
|-------|------|-------------|
| `eventId` | <code>int</code> | The ID of the event that triggered this notification. This value is not guaranteed to be unique. |
| `subscriptionId` | <code>int</code> | The ID of the subscription that triggered a notification about the event. Optional. |
| `portalId` | <code>int</code> | The customer's (HubSpot account ID)[https://knowledge.hubspot.com/account/manage-multiple-hubspot-accounts?_ga=2.56562472.2054080341.1656611011-2068059512.1656469161#check-your-current-account] where the event occurred. Optional. |
| `appId` | <code>int</code> | The ID of the HubSpot application. Optional. |
| `occurredAt` | <code>int</code> | When this event occurred as a millisecond timestamp. Optional. |
| `subscriptionType` | <code>string</code> | Type of the event. Optional. |
| `attemptNumber` | <code>int</code> | Starting at 0, which number attempt this is to notify your service of this event. If your service times-out or throws an error as describe in the Retries section below, HubSpot will attempt to send the notification again. Optional. |
| `objectId` | <code>int</code> | The ID of the object that was created, changed, or deleted. For contacts this is the contact ID; for companies, the company ID; for deals, the deal ID; and for conversations the thread ID. Optional. |
| `changeSource` | <code>string</code> | The source of the change. This can be any of the change sources that appear in contact property histories. Optional. |
| `sourceId` | <code>string</code> | The ID of the source of the change. The format depends on the change source (for example, "userId:12345" for changes made by a user in the CRM UI). Optional. |
| `changeFlag` | <code>string</code> | Flag of the change. Optional. |
| `propertyName` | <code>string</code> | The name of the property changed. Present for propertyChange events. Optional. |
| `propertyValue` | <code>string</code> | The new value set for the property that triggered the notification. Present for propertyChange events. Optional. |
| `associationType` | <code>string</code> | The type of the association (e.g. CONTACT_TO_COMPANY, DEAL_TO_LINE_ITEM). Present for associationChange events. Optional. |
| `fromObjectId` | <code>int</code> | The ID of the record that the association change was made from. Present for associationChange events. Optional. |
| `toObjectId` | <code>int</code> | The ID of the secondary record in the association event. Present for associationChange events. Optional. |
| `associationRemoved` | <code>boolean</code> | Whether the association was removed (true) or added (false). Present for associationChange events. Optional. |
| `isPrimaryAssociation` | <code>boolean</code> | Whether the secondary record is the primary association. Present for associationChange events. Optional. |
| `primaryObjectId` | <code>int</code> | The ID of the merge winner, which is the record that remains after the merge. Present for merge events. Optional. |
| `mergedObjectIds` | <code>int[]</code> | An array of IDs that represent the records merged into the winner. Present for merge events. Optional. |
| `newObjectId` | <code>int</code> | The ID of the record created as a result of the merge. Present for merge events. Optional. |
| `numberOfPropertiesMoved` | <code>int</code> | How many properties were transferred during the merge. Present for merge events. Optional. |
| `messageId` | <code>int</code> | The ID of the new message. Present for conversation.newMessage events. Optional. |
| `messageType` | <code>string</code> | The type of the new message, either MESSAGE or COMMENT. Present for conversation.newMessage events. Optional. |

## What's next

- [Setup Guide](setup-guide.md#configuring-hubspot-webhooks): point HubSpot at your listener.
- [Example](example.md#hubspot-trigger-example): build a HubSpot trigger integration in WSO2 Integrator.
