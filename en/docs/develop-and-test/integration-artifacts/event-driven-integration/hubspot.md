---
title: HubSpot
description: React to HubSpot CRM webhook events using pre-built event handlers for object creation, deletion, property changes, associations, merges and restores.
keywords: [wso2 integrator, hubspot, webhook, event integration, ballerina]
slug: /develop-and-test/integration-artifacts/event-driven-integration/hubspot
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HubSpot

:::warning
HubSpot event integration is currently in **Beta**. APIs and behavior may change in future releases.
:::

HubSpot event integrations receive webhook deliveries from a HubSpot app and run a handler for each CRM event. Use them to sync contacts and deals to other systems, notify a team when a deal moves stage, or react to new conversation messages. They use the `ballerinax/hubspot.trigger` package, which verifies every delivery with the app's client secret before a handler runs.

## Creating a HubSpot events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **HubSpot** under **Event Integration**.
3. In the **HubSpot Event Integration** form, fill in the following fields:

   <!-- TODO: Add visual designer screenshot img/develop/integration-artifacts/event/hubspot/step-creation-form.png: HubSpot Event Integration creation form -->

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The HubSpot events to handle, as a service type such as **hubspot:ContactService**. See [Event channels](#event-channels) for all options. | `hubspot:ContactService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a HubSpot listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `hubspotListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Webhook Secret** | The **Client secret** of your HubSpot app. The listener verifies every delivery with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |
   | **Callback URL** | The target URL set on the app's webhooks, exactly as entered there. HubSpot signs it with every delivery, so a different value, even a missing or extra trailing slash, rejects every delivery. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <!-- TODO: Add visual designer screenshot img/develop/integration-artifacts/event/hubspot/step-service-designer.png: HubSpot Service Designer view -->

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a HubSpot event integration with a `hubspot:ContactService`.

```ballerina
import ballerina/log;
import ballerinax/hubspot.trigger as hubspot;

configurable string clientSecret = ?;
configurable string callbackUrl = ?;
configurable int port = 8090;

listener hubspot:Listener hubspotListener = new ({webhookSecret: clientSecret, callbackUrl}, port);

service hubspot:ContactService on hubspotListener {

    remote function onContactCreation(hubspot:WebhookEvent payload) returns error? {
        log:printInfo("Contact created", id = payload.objectId ?: 0, portal = payload.portalId ?: 0);
    }

    remote function onContactPropertyChange(hubspot:WebhookEvent payload) returns error? {
        log:printInfo("Contact property changed", id = payload.objectId ?: 0,
                property = payload.propertyName ?: "", value = payload.propertyValue ?: "");
    }

    remote function onContactDeletion(hubspot:WebhookEvent payload) returns error? {
    }

    remote function onContactAssociationChange(hubspot:WebhookEvent payload) returns error? {
    }

    remote function onContactMerge(hubspot:WebhookEvent payload) returns error? {
    }

    remote function onContactRestore(hubspot:WebhookEvent payload) returns error? {
    }

    remote function onContactPrivacyDeletion(hubspot:WebhookEvent payload) returns error? {
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point HubSpot at the listener's public URL. See the [HubSpot setup guide](product://connectors/catalog/crm-sales/hubspot.trigger/setup-guide#configuring-hubspot-webhooks).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **HubSpot Event Integration Configuration** panel.

   <!-- TODO: Add visual designer screenshot img/develop/integration-artifacts/event/hubspot/step-configuration.png: HubSpot listener configuration view -->

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `hubspotListener` |
| **Listener Config** | A `hubspot:ListenerConfig` record with the `webhookSecret` and `callbackUrl` fields. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `hubspot:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener hubspot:Listener hubspotListener = new ({webhookSecret: clientSecret, callbackUrl}, port);
```

`hubspot:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The **Client secret** of your HubSpot app. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |
| `callbackUrl` | `string` | `""` | The target URL set on the app's webhooks, exactly as entered there. HubSpot signs it with every delivery, so a different value, even a missing or extra trailing slash, rejects every delivery. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one HubSpot object. Each handler handles one subscription type, the `subscriptionType` of an event, such as `contact.creation`. Subscribe the app's webhooks to the subscription types your handlers need.

| Channel | HubSpot subscription types | Handlers |
|---|---|---|
| `hubspot:CompanyService` | `company.creation`, `company.deletion`, `company.propertyChange`, `company.associationChange`, `company.merge`, `company.restore` | `onCompanyCreation`, `onCompanyDeletion`, `onCompanyPropertyChange`, `onCompanyAssociationChange`, `onCompanyMerge`, `onCompanyRestore` |
| `hubspot:ContactService` | `contact.creation`, `contact.deletion`, `contact.propertyChange`, `contact.associationChange`, `contact.merge`, `contact.restore`, `contact.privacyDeletion` | `onContactCreation`, `onContactDeletion`, `onContactPropertyChange`, `onContactAssociationChange`, `onContactMerge`, `onContactRestore`, `onContactPrivacyDeletion` |
| `hubspot:ConversationService` | `conversation.creation`, `conversation.deletion`, `conversation.propertyChange`, `conversation.privacyDeletion`, `conversation.newMessage` | `onConversationCreation`, `onConversationDeletion`, `onConversationPropertyChange`, `onConversationPrivacyDeletion`, `onConversationNewMessage` |
| `hubspot:DealService` | `deal.creation`, `deal.deletion`, `deal.propertyChange`, `deal.associationChange`, `deal.merge`, `deal.restore` | `onDealCreation`, `onDealDeletion`, `onDealPropertyChange`, `onDealAssociationChange`, `onDealMerge`, `onDealRestore` |
| `hubspot:LineItemService` | `line_item.creation`, `line_item.deletion`, `line_item.propertyChange`, `line_item.associationChange`, `line_item.merge`, `line_item.restore` | `onLineItemCreation`, `onLineItemDeletion`, `onLineItemPropertyChange`, `onLineItemAssociationChange`, `onLineItemMerge`, `onLineItemRestore` |
| `hubspot:ProductService` | `product.creation`, `product.deletion`, `product.propertyChange`, `product.merge`, `product.restore` | `onProductCreation`, `onProductDeletion`, `onProductPropertyChange`, `onProductMerge`, `onProductRestore` |
| `hubspot:TicketService` | `ticket.creation`, `ticket.deletion`, `ticket.propertyChange`, `ticket.associationChange`, `ticket.merge`, `ticket.restore` | `onTicketCreation`, `onTicketDeletion`, `onTicketPropertyChange`, `onTicketAssociationChange`, `onTicketMerge`, `onTicketRestore` |

See the [HubSpot trigger reference](product://connectors/catalog/crm-sales/hubspot.trigger/triggers) for each channel's payload type and fields.

## Event handlers

When a HubSpot events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives one event of the batch HubSpot delivers, as a `hubspot:WebhookEvent`, with fields such as `objectId`, `propertyName` and `propertyValue`.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers HubSpot as soon as a delivery passes verification, then runs the handler, so HubSpot never waits on your logic. Errors are logged, not sent back to HubSpot:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | HubSpot sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onContactCreation(hubspot:WebhookEvent payload) returns error? {
    do {
        log:printInfo("Contact created", id = payload.objectId ?: 0, portal = payload.portalId ?: 0);
    } on fail error err {
        log:printError("Failed to handle the event", err);
    }
}
```

</TabItem>
</Tabs>

## What's next

- [Kafka](kafka.md): consume messages from Apache Kafka topics
- [Salesforce Events](salesforce-events.md): listen to Salesforce Change Data Capture events
- [HubSpot trigger reference](product://connectors/catalog/crm-sales/hubspot.trigger/triggers): listener configuration, every callback and the payload types
- [HubSpot setup guide](product://connectors/catalog/crm-sales/hubspot.trigger/setup-guide#configuring-hubspot-webhooks): point HubSpot at your listener
