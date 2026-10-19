---
title: HubSpot
---

# HubSpot

HubSpot event integrations receive webhook callbacks from the HubSpot CRM platform and trigger handler functions as changes occur to companies, contacts, conversations, deals, tickets, products, and line items. Use them to sync CRM data in real time, trigger downstream workflows on record changes, and react to associations, merges, and restores without polling the HubSpot API.

## Creating a HubSpot service

```ballerina
import ballerinax/trigger.hubspot;
import ballerina/log;

configurable string clientSecret = ?;
configurable string callbackUrl = ?;
configurable int port = 8090;

listener hubspot:Listener hubspotWebhook = new (
    {clientSecret: clientSecret, callbackURL: callbackUrl},
    listenOn = port
);

service hubspot:CompanyService on hubspotWebhook {

    remote function onCompanyCreation(hubspot:WebhookEvent event) returns error? {
        log:printInfo("Company created", objectId = event.objectId ?: "");
    }

    remote function onCompanyDeletion(hubspot:WebhookEvent event) returns error? {
        log:printInfo("Company deleted", objectId = event.objectId ?: "");
    }

    remote function onCompanyPropertychange(hubspot:WebhookEvent event) returns error? {
        log:printInfo("Company property changed",
                      objectId = event.objectId ?: "",
                      propertyName = event.propertyName ?: "",
                      propertyValue = event.propertyValue ?: "");
    }

    remote function onCompanyAssociationchange(hubspot:WebhookEvent event) returns error? {
        log:printInfo("Company association changed", objectId = event.objectId ?: "");
    }

    remote function onCompanyMerge(hubspot:WebhookEvent event) returns error? {
        log:printInfo("Companies merged", newObjectId = event.newObjectId ?: "");
    }

    remote function onCompanyRestore(hubspot:WebhookEvent event) returns error? {
        log:printInfo("Company restored", objectId = event.objectId ?: "");
    }
}
```

## Service and listener configuration

`hubspot:Listener` is initialized with a `ListenerConfig` record and a `listenOn` port. The listener starts an HTTP server on that port to receive HubSpot webhook callbacks, and uses the client secret to validate the HubSpot request signature.

| Field | Description | Default |
|---|---|---|
| `clientSecret` | The client secret of the HubSpot app, used to verify incoming webhook request signatures. | Required |
| `callbackURL` | The callback URL registered with the HubSpot app for webhook subscriptions. | Required |
| `listenOn` | The port on which the listener accepts incoming webhook requests from HubSpot. | `8090` |

## Event handlers

WSO2 Integrator adds handlers for the selected HubSpot object service. Each remote function receives a `hubspot:WebhookEvent` record carrying fields such as `objectId`, `propertyName`, `propertyValue`, `subscriptionType`, `occurredAt`, and `portalId`, with the populated fields depending on the event.

| Service | Handlers | Triggered when |
|---|---|---|
| `CompanyService` | `onCompanyCreation`, `onCompanyDeletion`, `onCompanyPropertychange`, `onCompanyAssociationchange`, `onCompanyMerge`, `onCompanyRestore` | A company record is created, deleted, has a property changed, has an association changed, is merged into another, or is restored |
| `ContactService` | `onContactCreation`, `onContactDeletion`, `onContactPropertychange`, `onContactAssociationchange`, `onContactMerge`, `onContactRestore`, `onContactPrivacydeletion` | A contact record is created, deleted, has a property changed, has an association changed, is merged, is restored, or is deleted for privacy compliance |
| `ConversationService` | `onConversationCreation`, `onConversationDeletion`, `onConversationPropertychange`, `onConversationPrivacydeletion`, `onConversationNewmessage` | A conversation thread is created, deleted, has a property changed, is deleted for privacy compliance, or receives a new message |
| `DealService` | `onDealCreation`, `onDealDeletion`, `onDealPropertychange`, `onDealAssociationchange`, `onDealMerge`, `onDealRestore` | A deal record is created, deleted, has a property changed, has an association changed, is merged, or is restored |
| `TicketService` | `onTicketCreation`, `onTicketDeletion`, `onTicketPropertychange`, `onTicketAssociationchange`, `onTicketMerge`, `onTicketRestore` | A support ticket is created, deleted, has a property changed, has an association changed, is merged, or is restored |
| `ProductService` | `onProductCreation`, `onProductDeletion`, `onProductPropertychange`, `onProductMerge`, `onProductRestore` | A product record is created, deleted, has a property changed, is merged, or is restored |
| `LineItemService` | `onLineItemCreation`, `onLineItemDeletion`, `onLineItemPropertychange`, `onLineItemAssociationchange`, `onLineItemMerge`, `onLineItemRestore` | A line item is created, deleted, has a property changed, has an association changed, is merged, or is restored |

Attach a service for only the object type you need to subscribe to; each service is independent and can be attached to the same `hubspot:Listener`.

## What's next

- [Shopify](shopify.md) — react to Shopify store webhook events
- [GitHub webhooks](github-webhooks.md) — react to GitHub webhook events
- [Connections](../supportive-artifacts/connections.md) — reuse credentials across services
