---
title: Aayu MFT Gateway
description: React to Aayu MFT Gateway AS2 events such as received, sent, failed and incomplete messages using pre-built event handlers.
keywords: [wso2 integrator, aayu, mft gateway, as2, event integration, ballerina]
slug: /develop-and-test/integration-artifacts/event-driven-integration/aayu-mft-gateway
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Aayu MFT Gateway

Aayu MFT Gateway event integrations receive AS2 webhook deliveries from MFT Gateway and run a handler for each AS2 message event. Use them to process files that trading partners send, keep an audit trail of exchanges, or alert when a send fails. They use the `ballerinax/aayu.mftg.as2.trigger` package, which verifies every delivery with the webhook public key before a handler runs.

## Creating an Aayu MFT Gateway events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, search for `aayu.mftg.as2.trigger` and select the **aayu.mftg.as2.trigger** card under **More on Ballerina Central**.
3. In the **Aayu MFTG AS2 Event Integration** form, fill in the following fields:

   <ThemedImage
       alt="Aayu MFTG AS2 Event Integration creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/aayu-mft-gateway/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/aayu-mft-gateway/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The Aayu MFT Gateway events to handle, as a service type such as **aayu:ReceivedMessageService**. See [Event channels](#event-channels) for all options. | `aayu:ReceivedMessageService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to an Aayu MFT Gateway listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `aayuListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Webhook Public Key** | The **Webhook Public Key** from MFT Gateway, the whole PEM text including the `BEGIN` and `END` lines. A certificate PEM works too. The listener verifies every delivery with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <ThemedImage
       alt="Aayu MFT Gateway Service Designer view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/aayu-mft-gateway/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/aayu-mft-gateway/step-service-designer.png'),
       }}
   />

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates an Aayu MFT Gateway event integration with an `aayu:ReceivedMessageService`.

```ballerina
import ballerina/log;
import ballerinax/aayu.mftg.as2.trigger as aayu;

configurable string webhookPublicKey = ?;
configurable int port = 8090;

listener aayu:Listener aayuListener = new ({webhookSecret: webhookPublicKey}, port);

service aayu:ReceivedMessageService on aayuListener {

    remote function onMessageReceivedSuccess(aayu:MessageReceivedEvent payload) returns error? {
        string[] files = payload.attachments ?: [];
        log:printInfo("AS2 message received", partner = payload.partnerName, subject = payload.messageSubject,
                messageId = payload.messageIdentifier, fileCount = files.length());
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point Aayu MFT Gateway at the listener's public URL. See the [Aayu MFT Gateway setup guide](product://connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/setup-guide#configuring-mft-gateway-webhooks).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **Aayu MFTG AS2 Event Integration Configuration** panel.

   <ThemedImage
       alt="Aayu MFT Gateway listener configuration view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/aayu-mft-gateway/step-configuration.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/aayu-mft-gateway/step-configuration.png'),
       }}
   />

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `aayuListener` |
| **Listener Config** | A `aayu:ListenerConfig` record with the `webhookSecret` field. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `aayu:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener aayu:Listener aayuListener = new ({webhookSecret: webhookPublicKey}, port);
```

`aayu:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | The **Webhook Public Key** from MFT Gateway, the whole PEM text including the `BEGIN` and `END` lines. A certificate PEM works too. The listener verifies every delivery with it, and rejects every delivery while it isn't set. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

Each event channel is a service type for one MFT Gateway AS2 event, the `eventType` of the delivery. MFT Gateway sends every AS2 event to a webhook, so attach a service for each event you need.

| Channel | MFT Gateway event types | Handlers |
|---|---|---|
| `aayu:FailedMessageService` | `MESSAGE.SEND.FAILED` | `onMessageSendFailed` |
| `aayu:IncompleteMessageService` | `MESSAGE.SEND.INCOMPLETE` | `onMessageSendIncomplete` |
| `aayu:ReceivedMessageService` | `MESSAGE.RECEIVED.SUCCESS` | `onMessageReceivedSuccess` |
| `aayu:SentMessageService` | `MESSAGE.SEND.SUCCESS` | `onMessageSendSuccess` |

See the [Aayu MFT Gateway trigger reference](product://connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/triggers) for each channel's payload type and fields.

## Event handlers

When an Aayu MFT Gateway events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives the event's payload as a typed record, such as `aayu:MessageReceivedEvent` for `onMessageReceivedSuccess`.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers Aayu MFT Gateway as soon as a delivery passes verification, then runs the handler, so Aayu MFT Gateway never waits on your logic. Errors are logged, not sent back to Aayu MFT Gateway:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | Aayu MFT Gateway sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onMessageReceivedSuccess(aayu:MessageReceivedEvent payload) returns error? {
    do {
        string[] files = payload.attachments ?: [];
        log:printInfo("AS2 message received", partner = payload.partnerName, subject = payload.messageSubject,
                messageId = payload.messageIdentifier, fileCount = files.length());
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
- [Aayu MFT Gateway trigger reference](product://connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/triggers): listener configuration, every callback and the payload types
- [Aayu MFT Gateway setup guide](product://connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/setup-guide#configuring-mft-gateway-webhooks): point Aayu MFT Gateway at your listener
