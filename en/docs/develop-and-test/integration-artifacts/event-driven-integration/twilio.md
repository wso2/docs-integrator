---
title: Twilio
description: React to Twilio call status and SMS status callbacks using pre-built event handlers for each call or message state.
keywords: [wso2 integrator, twilio, status callback, sms status, call status, event integration]
slug: /develop-and-test/integration-artifacts/event-driven-integration/twilio
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Twilio

Twilio event integrations receive Twilio status callbacks and run a handler for each call or message state. Use them to track message delivery, alert on failed calls, or update records as a call progresses. They use the `ballerinax/twilio.trigger` package, which verifies every delivery with your account's Auth Token before a handler runs.

## Creating a Twilio events service

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, search for `twilio.trigger` and select the **twilio.trigger** card under **More on Ballerina Central**. Don't use the built-in **Twilio** card under **Event Integration**; it creates the older `trigger.twilio` package.
3. In the **Twilio Event Integration** form, fill in the following fields:

   <ThemedImage
       alt="Twilio Event Integration creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/twilio/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/twilio/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Event Channel** | The Twilio events to handle, as a service type such as **twilio:SmsStatusService**. See [Event channels](#event-channels) for all options. | `twilio:SmsStatusService` |
   | **Listener** | **Create New Listener**, or **Use Existing Listener** to attach to a Twilio listener already in the project. | Create New Listener |
   | **Listener Name** | Identifier for a new listener. | `twilioListener` |
   | **Webhook Listener Port** | The port the listener accepts webhook requests on. | `8090` |
   | **Auth Token** | Your Twilio account's **Auth Token**. The listener verifies every callback with it, and rejects every delivery while it isn't set. Bind it to a configurable variable. | None |
   | **Webhook Base URL** | The scheme and host Twilio calls, such as `https://abc123.ngrok-free.app`, without a trailing slash. Twilio signs the full callback URL, so this must match it exactly. Bind it to a configurable variable. | None |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener, the event channel, and the **Event Handlers** section with every handler of the selected channel added.

   <ThemedImage
       alt="Twilio Service Designer view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/twilio/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/twilio/step-service-designer.png'),
       }}
   />

   A service must implement every handler of its channel, so all of them are added for you. Click a handler to open it in the flow diagram view and implement the logic; leave a handler empty for an event you don't act on.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The following complete, runnable Ballerina program creates a Twilio event integration with a `twilio:SmsStatusService`.

```ballerina
import ballerina/log;
import ballerinax/twilio.trigger as twilio;

configurable string authToken = ?;
configurable string webhookBaseUrl = ?;
configurable int port = 8090;

listener twilio:Listener twilioListener = new ({webhookSecret: authToken, webhookBaseUrl}, port);

service twilio:SmsStatusService on twilioListener {

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

    remote function onAccepted(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onQueued(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onSending(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onSent(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onReceiving(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onReceived(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onScheduled(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onRead(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onCanceled(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }

    remote function onPartiallyDelivered(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    }
}
```

Save this as `main.bal`, set the configurable values in `Config.toml`, and run `bal run` from the project directory. Then point Twilio at the listener's public URL. See the [Twilio setup guide](product://connectors/catalog/communication/twilio/setup-guide#configuring-twilio-status-callbacks).

</TabItem>
</Tabs>

## Listener configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **Twilio Event Integration Configuration** panel.

   <ThemedImage
       alt="Twilio listener configuration view"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/twilio/step-configuration.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/twilio/step-configuration.png'),
       }}
   />

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `twilioListener` |
| **Listener Config** | A `twilio:ListenerConfig` record with the `webhookSecret` and `webhookBaseUrl` fields. | `{}` |
| **Webhook Listener Port** | Port on which the listener accepts webhook requests. | `8090` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

The listener is declared at the module level and takes a `twilio:ListenerConfig` value and the port, or an `http:Listener` to share. Use `configurable` so secrets are supplied through `Config.toml` or an environment variable, not written in the code.

```ballerina
listener twilio:Listener twilioListener = new ({webhookSecret: authToken, webhookBaseUrl}, port);
```

`twilio:ListenerConfig` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `webhookSecret` | `string` | Optional | Your Twilio account's **Auth Token**. The listener verifies every callback with it, and rejects every delivery while it isn't set. |
| `webhookBaseUrl` | `string` | `""` | The scheme and host Twilio calls, such as `https://abc123.ngrok-free.app`, without a trailing slash. Twilio signs the full callback URL, so this must match it exactly. |

A listener created on a port accepts request bodies up to 25 MB.

</TabItem>
</Tabs>

## Event channels

There are two event channels. `CallStatusService` handles call status callbacks, at the listener's `/callStatus` path, by the `CallStatus` parameter. `SmsStatusService` handles message status callbacks, at `/smsStatus`, by the `MessageStatus` parameter.

| Channel | Twilio status | Handlers |
|---|---|---|
| `twilio:CallStatusService` | `initiated`, `queued`, `ringing`, `in-progress`, `completed`, `busy`, `failed`, `no-answer`, `canceled` | `onInitiated`, `onQueued`, `onRinging`, `onInProgress`, `onCompleted`, `onBusy`, `onFailed`, `onNoAnswer`, `onCanceled` |
| `twilio:SmsStatusService` | `accepted`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, `scheduled`, `read`, `canceled`, `partially_delivered` | `onAccepted`, `onQueued`, `onSending`, `onSent`, `onFailed`, `onDelivered`, `onUndelivered`, `onReceiving`, `onReceived`, `onScheduled`, `onRead`, `onCanceled`, `onPartiallyDelivered` |

See the [Twilio trigger reference](product://connectors/catalog/communication/twilio/triggers) for each channel's payload type and fields.

## Event handlers

When a Twilio events service is created, WSO2 Integrator adds every handler for the selected channel. Click a handler in the **Service Designer** to open the flow diagram view and implement the processing logic. Each handler receives the callback parameters as a typed record, such as `twilio:SmsStatusChangeEventWrapper` for the message handlers, with the parameter names Twilio uses, such as `MessageSid` and `To`.

To handle more events, add a service for each channel. Services of different channels can share one listener.

## Error handling

The listener answers Twilio as soon as a delivery passes verification, then runs the handler, so Twilio never waits on your logic. Errors are logged, not sent back to Twilio:

| Log entry | When |
|---|---|
| `WEBHOOK_SIGNATURE_REJECTED` (warning) | A delivery failed verification and was answered with `401 Unauthorized`. The entry gives the reason, such as a missing or different signature. |
| `DISPATCH_FAILED` (error) | A handler returned an error, or the payload didn't fit its type. |
| `NO_HANDLER_FOR_EVENT` (warning) | Twilio sent an event the package doesn't know. |
| `SERVICE_NOT_ATTACHED` (debug) | No service of the event's channel is attached to the listener. |

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add an **Error Handler** block inside the handler flow to define recovery logic. Errors that escape the handler are logged by the listener as `DISPATCH_FAILED`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Use `do/on fail` inside a handler to recover from expected failures before they reach the listener.

```ballerina
remote function onDelivered(twilio:SmsStatusChangeEventWrapper payload) returns error? {
    do {
        log:printInfo("Message delivered", messageSid = payload.MessageSid, to = payload.To);
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
- [Twilio trigger reference](product://connectors/catalog/communication/twilio/triggers): listener configuration, every callback and the payload types
- [Twilio setup guide](product://connectors/catalog/communication/twilio/setup-guide#configuring-twilio-status-callbacks): point Twilio at your listener
