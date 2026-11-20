---
title: Shopify
description: React to Shopify store webhook events such as order, customer, product and fulfillment changes using pre-built event handlers.
keywords: [wso2 integrator, shopify, webhook, event integration, ballerina]
slug: /develop-and-test/integration-artifacts/event-driven-integration/shopify
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Shopify

:::warning
Shopify event integration is currently in **Beta**. APIs and behavior may change in future releases.
:::

Shopify event integrations receive webhook deliveries from a Shopify app and run a handler for each order, customer, product or fulfillment topic. Use them to sync orders to an ERP, start fulfillment workflows, or keep customer records up to date in real time. They use the `ballerinax/shopify.trigger` package, which verifies every delivery with the app's client secret before a handler runs.

## Creating a Shopify events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, search for `shopify.trigger` and select the **shopify.trigger** card under **More on Ballerina Central**. Don't use the built-in **Shopify** card under **Event Integration**; it creates the older `trigger.shopify` package.
3. In the **Shopify Event Integration** form, fill in the following fields:

   <ThemedImage
       alt="Shopify Event Integration creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/shopify/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/shopify/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Event Type** | The Shopify events to handle, as a service type such as **shopify:OrdersService**. See [Event channels](#event-channels) for all options. | `shopify:OrdersService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a Shopify listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `shopifyListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Webhook Secret** | The client secret of the Shopify app the webhooks belong to. The listener verifies every delivery with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <ThemedImage
       alt="Shopify Service Designer view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/shopify/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/shopify/step-service-designer.png'),
       }}
   />

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a Shopify event integration with a `shopify:OrdersService`.

```ballerina
import ballerina/log;
import ballerinax/shopify.trigger as shopify;

configurable string webhookSecret = ?;
configurable int port = 8090;

listener shopify:Listener shopifyListener = new ({webhookSecret}, port);

service shopify:OrdersService on shopifyListener {

    remote function onOrdersCreate(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order created", id = payload.id, name = payload.name);
    }

    remote function onOrdersPaid(shopify:OrderEvent payload) returns error? {
        log:printInfo("Order paid", id = payload.id, name = payload.name);
    }

    remote function onOrdersCancelled(shopify:OrderEvent payload) returns error? {
    }

    remote function onOrdersFulfilled(shopify:OrderEvent payload) returns error? {
    }

    remote function onOrdersPartiallyFulfilled(shopify:OrderEvent payload) returns error? {
    }

    remote function onOrdersUpdated(shopify:OrderEvent payload) returns error? {
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point Shopify at the listener's public URL. See the [Shopify setup guide](product://connectors/catalog/ecommerce/shopify.admin/setup-guide#configuring-shopify-webhooks).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **Shopify Event Integration Configuration** panel.

   <ThemedImage
       alt="Shopify listener configuration view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/shopify/step-configuration.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/shopify/step-configuration.png'),
       }}
   />

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `shopifyListener` |
| **Listener Config** | A `shopify:ListenerConfig` record with the `webhookSecret` field. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `shopify:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener shopify:Listener shopifyListener = new ({webhookSecret}, port);
```

`shopify:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The client secret of the Shopify app the webhooks belong to. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one group of Shopify webhook topics. Shopify names the topic of each delivery in the `X-Shopify-Topic` header. Subscribe the app to the topics your handlers need.

| Channel | Shopify topics | Handlers |
|---|---|---|
| `shopify:CustomersService` | `customers/create`, `customers/disable`, `customers/enable`, `customers/update`, `customers_marketing_consent/update` | `onCustomersCreate`, `onCustomersDisable`, `onCustomersEnable`, `onCustomersUpdate`, `onCustomersMarketingConsentUpdate` |
| `shopify:FulfillmentsService` | `fulfillments/create`, `fulfillments/update` | `onFulfillmentsCreate`, `onFulfillmentsUpdate` |
| `shopify:OrdersService` | `orders/create`, `orders/cancelled`, `orders/fulfilled`, `orders/paid`, `orders/partially_fulfilled`, `orders/updated` | `onOrdersCreate`, `onOrdersCancelled`, `onOrdersFulfilled`, `onOrdersPaid`, `onOrdersPartiallyFulfilled`, `onOrdersUpdated` |
| `shopify:ProductsService` | `products/create`, `products/update` | `onProductsCreate`, `onProductsUpdate` |

See the [Shopify trigger reference](product://connectors/catalog/ecommerce/shopify.admin/triggers) for each channel's payload type and fields.

## Event handlers

When a Shopify events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives the topic's payload as a typed record, such as `shopify:OrderEvent` for the order handlers, with camelCase field names.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers Shopify as soon as a delivery passes verification, then runs the handler, so Shopify never waits on your logic. Errors are logged, not sent back to Shopify:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | Shopify sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onOrdersCreate(shopify:OrderEvent payload) returns error? {
    do {
        log:printInfo("Order created", id = payload.id, name = payload.name);
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
- [Shopify trigger reference](product://connectors/catalog/ecommerce/shopify.admin/triggers): listener configuration, every callback and the payload types
- [Shopify setup guide](product://connectors/catalog/ecommerce/shopify.admin/setup-guide#configuring-shopify-webhooks): point Shopify at your listener
