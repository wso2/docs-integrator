---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

This guide walks you through setting up Aayu MFT Gateway to send webhook events to an integration that uses the `ballerinax/aayu.mftg.as2.trigger` package.

## Configuring MFT Gateway webhooks

To receive AS2 events with the `ballerinax/aayu.mftg.as2.trigger` package, add an AS2 webhook in MFT Gateway that points at your listener, with signatures turned on, and give the listener the webhook public key.

### Prerequisites

- An [Aayu MFT Gateway](https://aayutechnologies.com/docs/product/mft-gateway/) account with at least one AS2 station and trading partner.
- A public URL for your listener. MFT Gateway must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  Use the **Forwarding** URL it prints as the webhook URL below.

<ThemedImage
    alt="ngrok forwarding a public URL to the listener on localhost:8090"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-ngrok-forwarding.png'),
        dark: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-ngrok-forwarding.png'),
    }}
/>

### Open webhook settings

In MFT Gateway, open **Integrations**, then **Webhooks**, from the left navigation menu, and select the **AS2** tab under **General Configurations**.

<ThemedImage
    alt="MFT Gateway Webhook Integration page on the AS2 tab"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-settings-page.png'),
        dark: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-settings-page.png'),
    }}
/>

### Add the webhook

Click **Add New Webhook** and fill it in:

| Field | Value |
|---|---|
| **Station** | The station you want events for, or **All Stations** |
| **Webhook URL** | Your listener's public URL, such as the ngrok forwarding URL |
| **Generate Signature For Webhook Payload** | On, under **Advanced Configurations**. The listener rejects unsigned deliveries, so this is required. |

<ThemedImage
    alt="MFT Gateway webhook form with the public URL and Generate Signature For Webhook Payload turned on"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-form-filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-form-filled.png'),
    }}
/>

Click **Integrate Webhooks** to save.

### Get the webhook public key

After you save, a **Webhook Public Key** button appears under the signature note. Click it to download `webhook-pubkey.pem`. MFT Gateway signs each payload with a key pair dedicated to your account, and the listener checks each signature with this public key.

<ThemedImage
    alt="MFT Gateway signature note with the mftg-wh-signature header and the Webhook Public Key button"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-public-key.png'),
        dark: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-public-key.png'),
    }}
/>

Set the whole key, including the `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----` lines, as the listener's `webhookSecret`. In `Config.toml`, use a multi-line string:

```toml
webhookPublicKey = """-----BEGIN PUBLIC KEY-----
<the key from webhook-pubkey.pem>
-----END PUBLIC KEY-----"""
```

### Test the webhook

Run your integration and send an AS2 message from **Messages**, then **Compose**, or have a partner send one to your station. Each delivery shows up in the ngrok console with `200 OK`, and your callback runs.

To try it without a real trading partner, add a partner whose AS2 identifier, URL and certificate are your own station's (shown under **View Partner Configuration** on the station), and send to it. You get both a sent and a received event.

<ThemedImage
    alt="ngrok console showing MFT Gateway deliveries answered with 200 OK"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/cloud-infrastructure/aayu.mftg.as2.trigger/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Turn on **Generate Signature For Webhook Payload** and set the public key as `webhookSecret`. The listener verifies the `mftg-wh-signature` header on every delivery, and while `webhookSecret` isn't set it rejects every delivery with `401 Unauthorized`.
:::

If you turn on **Enable Webhook Retry**, MFT Gateway sends a failed delivery again with the `mftg-wh-retry` header. Use `messageId` with `eventType` to skip events you have already handled.

## What's next

- [Trigger Reference](triggers.md): listener configuration, every callback and the payload types
- [Example](example.md): build an event integration in WSO2 Integrator
