---
title: Telegram
description: React to Telegram Bot API webhook updates, such as messages, callback queries, and inline queries, using pre-built event handlers for each update type.
keywords: [wso2 integrator, telegram, telegram bot, event integration, webhook listener, telegram bot api]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Telegram

Telegram event integrations receive webhook updates from the Telegram Bot API and trigger handler functions as messages, callback queries, and other update types arrive. Use them to build chatbots, handle inline keyboard interactions, and automate replies without polling `getUpdates`.

:::note
The Telegram webhook listener must be reachable over HTTPS from the internet. For local development, use a tunneling tool such as [ngrok](https://ngrok.com) to create a public HTTPS URL for your local port.

Create a bot and get a token by messaging [@BotFather](https://t.me/BotFather) on Telegram and sending `/newbot`. See the [setup guide](../../../connectors/catalog/communication/telegram/setup-guide.md) for details.
:::

## Creating a Telegram listener

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Telegram** under **Event Integration**.
3. In the creation form, fill in the following fields:

   <ThemedImage
       alt="Create Telegram form showing the Listener Name, Port, Bot Token, and Public URL fields"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/telegram/step-service-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/telegram/step-service-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Listener Name** | Identifier for the listener created with this service. | `telegramListener` |
   | **Webhook Listener Port** | The port on which the webhook listener accepts incoming HTTP requests. | `8090` |
   | **Bot Token** or **Secret Token** | Provide exactly one. **Bot Token** derives the secret token and, combined with **Public URL**, auto-registers the webhook. **Secret Token** authenticates inbound updates directly. | Required |
   | **Public URL** | This listener's public HTTPS URL, used to auto-register the webhook when set together with **Bot Token**. | `()` |

   Expand **Advanced Configurations** to override the Telegram Bot API base URL.

   | Field | Description | Default |
   |---|---|---|
   | **Service URL** | The Telegram Bot API base URL. | `https://api.telegram.org` |

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener pill and an empty **Event Handlers** section.

6. Click **+ Add Handler** to define how incoming updates are processed.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerinax/telegram;
import ballerina/log;

configurable string botToken = ?;
configurable string publicUrl = ?;
configurable int listenerPort = 8090;

listener telegram:Listener telegramListener = new (listenerPort, token = botToken, publicUrl = publicUrl);

service telegram:TelegramService on telegramListener {

    remote function onMessage(telegram:Message message) returns error? {
        log:printInfo("Telegram message received", chatId = message.chat.id, text = message.text);
    }

    remote function onCallbackQuery(telegram:CallbackQuery callbackQuery) returns error? {
        log:printInfo("Telegram callback query received", queryId = callbackQuery.id, data = callbackQuery.data);
    }
}
```

Save this as `main.bal` and run `bal run` from the project directory. Passing both `token` and `publicUrl` registers the webhook automatically when the listener starts. No separate `Client->setWebhook` call is needed.

</TabItem>
</Tabs>

## Service configuration

Service configuration controls the service name and the Telegram listener it is attached to.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click **Configure** to open the **Telegram Configuration** panel.

The left panel shows **Attached Listeners**. Pick a listener under **Attached Listeners** to configure its connection settings in the main configuration panel.

<ThemedImage
    alt="Telegram Configuration panel showing the Attached Listeners list and the Name, Listen To, Bot Token, Public URL, Service Url, and Secret Token fields"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/telegram/service-config.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/telegram/service-config.png'),
    }}
/>

### Main configurations

| Field | Description |
|---|---|
| **Name** | The name of the listener. Required. |
| **Listen To** | A port number to bind a new `http:Listener` to, or an existing `http:Listener`. Required. |
| **Bot Token** | The bot token to derive the secret token from; also required with **Public URL** for auto-registration. |
| **Public URL** | This listener's public HTTPS URL, used to auto-register the webhook when set with **Bot Token**. |
| **Service Url** | The Telegram Bot API base URL; override only for tests or a proxy. Defaults to `https://api.telegram.org`. |
| **Secret Token** | The secret token to authenticate inbound updates against, used directly instead of deriving one from **Bot Token**. |

Click **Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Service configuration maps to the `telegram:ListenerConfig` passed when constructing the listener, which requires either `secretToken` or `token`.

```ballerina
listener telegram:Listener telegramListener = new (
    listenerPort,
    token = botToken,
    publicUrl = publicUrl
);

service on telegramListener {
    // handlers
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `secretToken` | `string?` | `()` | The secret token to authenticate inbound updates against, used directly. |
| `token` | `string?` | `()` | The bot token to derive the secret token from; also required with `publicUrl` for auto-registration. |
| `publicUrl` | `string?` | `()` | This listener's public HTTPS URL, used to auto-register the webhook when set with `token`. |
| `serviceUrl` | `string` | `https://api.telegram.org` | The Telegram Bot API base URL; override only for tests or a proxy. |

</TabItem>
</Tabs>

## Event handlers

An event handler is a `remote function` that WSO2 Integrator calls for each Telegram Bot API update received.

### Adding an event handler

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click **+ Add Handler**. A **Select Handler to Add** panel opens on the right listing the available update types.

<ThemedImage
    alt="Select Handler to Add drawer listing the Telegram event handlers"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/telegram/step-service-designer.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/telegram/step-service-designer.png'),
    }}
/>

Pick **On Message**, then click **Save**. This opens the **Flow Designer** for `onMessage`.

<ThemedImage
    alt="Flow canvas for the Telegram onMessage handler"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/telegram/step-onmessage-flow.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/telegram/step-onmessage-flow.png'),
    }}
/>

Use the flow canvas to add integration steps such as database writes, HTTP calls, and transformations. Repeat these steps to add the other handlers you need.

</TabItem>
<TabItem value="code" label="Ballerina Code">

**onMessage handler** — called for each new incoming message:

```ballerina
service telegram:TelegramService on telegramListener {

    remote function onMessage(telegram:Message message) returns error? {
        log:printInfo("Telegram message received", chatId = message.chat.id, text = message.text);
    }
}
```

**onCallbackQuery handler** — called when a user presses an inline keyboard button:

```ballerina
service telegram:TelegramService on telegramListener {

    remote function onCallbackQuery(telegram:CallbackQuery callbackQuery) returns error? {
        log:printInfo("Telegram callback query received", queryId = callbackQuery.id, data = callbackQuery.data);
    }
}
```

</TabItem>
</Tabs>

### Handler types

Telegram delivers nine update types, one per `TelegramService` handler. All are optional. Implement only the ones your bot needs. Telegram's `allowed_updates` already keeps unsupported update types from reaching your webhook; among the nine supported types, an update whose handler you didn't declare is logged and dropped after reaching the listener.

| Handler | Triggered when |
|---|---|
| `onMessage` | A new incoming message arrives. |
| `onEditedMessage` | An existing message is edited. |
| `onChannelPost` | A new channel post is published. |
| `onEditedChannelPost` | An existing channel post is edited. |
| `onCallbackQuery` | A user presses an inline keyboard button. |
| `onInlineQuery` | A user sends a new inline query. |
| `onPoll` | A poll's state changes. |
| `onPreCheckoutQuery` | A user confirms a payment, just before it's charged. |
| `onShippingQuery` | A user provides a shipping address for an invoice with flexible pricing. |

## What's next

- [WhatsApp Business](whatsapp-business.md) — react to WhatsApp Business Cloud webhook events
- [Google Chat](google-chat.md) — react to Google Chat interaction events
- [Connections](../supporting/connections.md) — reuse Telegram credentials across services
- [Telegram connector reference](../../../connectors/catalog/communication/telegram/overview.md) — full connector API reference
- [Telegram setup guide](../../../connectors/catalog/communication/telegram/setup-guide.md) — create a bot and configure the webhook
