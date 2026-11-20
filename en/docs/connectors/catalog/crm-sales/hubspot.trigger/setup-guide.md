---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

This guide walks you through setting up HubSpot to send webhook events to an integration that uses the `ballerinax/hubspot.trigger` package.

## Configuring HubSpot webhooks

To receive HubSpot events with the `ballerinax/hubspot.trigger` package, create a HubSpot app with webhook subscriptions that point at your listener, install it in an account, and give the listener the app's client secret and target URL.

### Prerequisites

- A [HubSpot developer account](https://app.hubspot.com/signup-hubspot/).
- The HubSpot CLI, version 7.6.0 or later, signed in to your developer account:

  ```bash
  npm install -g @hubspot/cli@latest
  hs account auth
  ```

- A public URL for your listener. HubSpot must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  Use the **Forwarding** URL it prints as the target URL below.

### Create a developer test account

A developer test account is a separate HubSpot CRM account for testing. In your developer account, go to **Testing**, then **Developer test accounts**, and click **Create developer test account**.

<ThemedImage
    alt="Create developer test account"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-create-dev-account.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-create-dev-account.png'),
    }}
/>

### Create the app

1. Create a project with the HubSpot CLI:

   ```bash
   hs project create
   ```

   When prompted, choose `App` as the base contents, `private` distribution, `oauth` auth and the `Webhooks` feature, and enter a project name.

2. In `src/app/app-hsmeta.json`, list the scopes for the objects you subscribe to under `requiredScopes`, with `oauth`:

   | Object | Required scope |
   |---|---|
   | Contact | `crm.objects.contacts.read` |
   | Company | `crm.objects.companies.read` |
   | Deal | `crm.objects.deals.read` |
   | Ticket | `tickets` |
   | Product, line item | `e-commerce` |
   | Conversation | `conversations.read` |

### Configure webhook subscriptions

In `src/app/webhooks/webhook-hsmeta.json`, set `targetUrl` to your public URL and add a subscription for each event your integration handles:

```json
{
  "uid": "hubspot_webhook_subscriptions",
  "type": "webhooks",
  "config": {
    "settings": {
      "targetUrl": "<your public URL>",
      "maxConcurrentRequests": 10
    },
    "subscriptions": {
      "legacyCrmObjects": [
        { "subscriptionType": "contact.creation", "active": true },
        { "subscriptionType": "contact.propertyChange", "propertyName": "email", "active": true },
        { "subscriptionType": "deal.propertyChange", "propertyName": "dealstage", "active": true }
      ],
      "hubEvents": [
        { "subscriptionType": "conversation.newMessage", "active": true }
      ]
    }
  }
}
```

A `propertyChange` subscription needs a `propertyName`; add one entry for each property to watch. `contact.privacyDeletion` and the `conversation.*` events go under `hubEvents`. See the [Event channels](product://integrator/develop-and-test/integration-artifacts/event-driven-integration/hubspot#event-channels) table for every subscription type and the callback it calls.

Upload the project and wait for the build and the deploy to succeed:

```bash
hs project upload
```

### Get the client secret

Run `hs project open`, click your app's UID under **Project Components**, and open the **Auth** tab. Under **Client credentials**, copy the **Client secret**. Set it as the listener's `webhookSecret`, and set the `targetUrl` above as `callbackUrl`.

<ThemedImage
    alt="HubSpot app Auth tab with the client ID and the client secret"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-app-auth-tab.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-app-auth-tab.png'),
    }}
/>

### Install the app in the test account

An app only receives the events of accounts it's installed in.

1. On your app's page in the developer account, open the **Distribution** tab and click **Test URL** under **Sample install URL**.

<ThemedImage
    alt="Test install URL on the app's Distribution tab"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-test-install-url.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-test-install-url.png'),
    }}
/>

2. Select your developer test account and authorize the app. The app's redirect URL must reach something that completes the OAuth exchange, such as HubSpot's [OAuth quickstart app](https://github.com/HubSpot/oauth-quickstart-nodejs) running on `localhost:3000`.

<ThemedImage
    alt="HubSpot authorization screen with the developer test account selected"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-choose-dev-account.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-choose-dev-account.png'),
    }}
/>

### Test the webhook

Run your integration and create a contact in the test account. HubSpot delivers the event to the listener, which answers `200 OK` and runs your callback.

<ThemedImage
    alt="A HubSpot delivery answered with 200 OK"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/crm-sales/hubspot.trigger/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Set `callbackUrl` to exactly the `targetUrl` of the app's webhooks, with the same trailing slash or none. HubSpot signs the URL with every delivery, so a different value makes the listener reject every delivery with `401 Unauthorized`. One HubSpot app delivers every event to its one target URL; a second app has its own client secret and needs its own listener.
:::

## What's next

- [Trigger Reference](triggers.md): listener configuration, every callback and the payload types
- [Example](example.md): build an event integration in WSO2 Integrator
