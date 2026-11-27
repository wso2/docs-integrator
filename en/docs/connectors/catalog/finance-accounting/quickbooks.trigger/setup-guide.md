---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

This guide walks you through setting up QuickBooks to send webhook events to an integration that uses the `ballerinax/quickbooks.trigger` package.

## Configuring QuickBooks webhooks

To receive QuickBooks Online events with the `ballerinax/quickbooks.trigger` package, point your Intuit app's webhooks at your listener, subscribe to the entities you need, and give the listener the app's webhook verifier token.

### Prerequisites

- An [Intuit Developer account](https://developer.intuit.com/) and an app that uses the QuickBooks Online Accounting API.
- A sandbox company to create test events in. Intuit creates one automatically; find it under **Sandboxes** in the **My Hub** menu.

<ThemedImage
    alt="Intuit Developer Sandboxes page with an automatically created sandbox company"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-intuit-sandbox-company.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-intuit-sandbox-company.png'),
    }}
/>

- A public URL for your listener. QuickBooks must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  Use the **Forwarding** URL it prints as the endpoint URL below.

<ThemedImage
    alt="ngrok forwarding a public URL to the listener on localhost:8090"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-ngrok-forwarding.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-ngrok-forwarding.png'),
    }}
/>

### Configure the webhook endpoint

1. On your app's page in the developer dashboard, open the **Webhooks** tab.
2. Set the **Endpoint URL** to your public URL.
3. Set the payload format to **CloudEvents**. The package doesn't accept the legacy format, which QuickBooks is retiring.
4. Select the entities your integration handles, such as **Invoice** or **Customer**, and the operations for each, such as created, updated or deleted.
5. Save the configuration.

<ThemedImage
    alt="QuickBooks app Webhooks tab with the endpoint URL, the CloudEvents format and the subscribed entities"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-webhook-endpoint-config.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-webhook-endpoint-config.png'),
    }}
/>

Each service type handles one entity: `InvoiceService` the Invoice events, `CustomerService` the Customer events, and so on. See the [Trigger Reference](triggers.md#callback-signatures) for all 31 service types.

### Get the verifier token

QuickBooks signs every delivery with the app's **webhook verifier token**. It's a separate credential from the app's OAuth client secret, and the two aren't interchangeable. On the same **Webhooks** tab, turn on **Show verifier token** and copy it. Set it as the listener's `webhookSecret`.

<ThemedImage
    alt="QuickBooks app Webhooks tab with the verifier token shown"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-webhook-verifier-token.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-webhook-verifier-token.png'),
    }}
/>

### Test the webhook

Run your integration and change an entity you subscribed to in the sandbox company, for example by creating a customer. The delivery shows up in the ngrok console with `200 OK`, and your callback runs for each event in it.

<ThemedImage
    alt="ngrok console showing a QuickBooks delivery answered with 200 OK"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/finance-accounting/quickbooks.trigger/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Set the verifier token as `webhookSecret`. The listener verifies the `intuit-signature` header on every delivery, and while `webhookSecret` isn't set it rejects every delivery with `401 Unauthorized`.
:::

An event carries the changed entity's ID, not its data. To read the entity, call the QuickBooks Online Accounting API with the ID.

## What's next

- [Trigger Reference](triggers.md): listener configuration, every callback and the payload types
- [Example](example.md): build an event integration in WSO2 Integrator
