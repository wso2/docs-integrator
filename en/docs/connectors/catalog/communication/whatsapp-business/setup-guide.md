---
title: Setup Guide
description: "How to create a Meta app, obtain WhatsApp Business Cloud API credentials, and configure webhooks for the WhatsApp Business connector."
keywords: [whatsapp, meta for developers, webhook, verify token, app secret]
connector: true
connector_name: "whatsapp.business"
---

# Setup Guide

This guide walks you through creating a Meta app and obtaining the credentials required to use the WhatsApp Business connector.

## Prerequisites

- A [Meta for Developers](https://developers.facebook.com/) account
- A WhatsApp Business Account (WABA)

## Create a Meta app

1. Go to [Meta for Developers](https://developers.facebook.com/) and create a new app of type **Business**.
2. Add the **WhatsApp** product to the app.

## Get the messaging credentials

From **WhatsApp → API Setup**:

- **Phone number ID**: the test or production business phone number ID.
- **Access token**: a temporary token is shown for testing. For production, create a **System User** in Meta Business Settings and generate a permanent token with the `whatsapp_business_messaging` and `whatsapp_business_management` permissions.

Use the access token as the `token` in `whatsapp:ConnectionConfig.auth`. The client attaches it to every request automatically.

## Configure webhooks

From **WhatsApp → Configuration → Webhooks**:

1. Set the **Callback URL** to your listener's public URL (for example, via a tunneling tool during development).
2. Set a **Verify token**. This must match the `verifyToken` you pass to `whatsapp:Listener`.
3. Subscribe to the fields you want notifications for. Each field maps 1:1 to one `WhatsAppService` handler:

   | Webhook field | Handler |
   |---|---|
   | `messages` | `onMessages` |
   | `account_review_update` | `onAccountReviewUpdate` |
   | `account_update` | `onAccountUpdate` |
   | `business_capability_update` | `onBusinessCapabilityUpdate` |
   | `message_template_quality_update` | `onMessageTemplateQualityUpdate` |
   | `message_template_status_update` | `onMessageTemplateStatusUpdate` |
   | `phone_number_name_update` | `onPhoneNumberNameUpdate` |
   | `phone_number_quality_update` | `onPhoneNumberQualityUpdate` |
   | `security` | `onSecurity` |
   | `template_category_update` | `onTemplateCategoryUpdate` |

4. Copy the app's **App secret** (**App Settings → Basic**) and use it as the listener's `appSecret` so inbound notifications are authenticated via `X-Hub-Signature-256`.

:::note
Meta calls your callback URL with a `GET` handshake (echoing `hub.challenge`) when you save the webhook configuration, then delivers notifications via `POST`. The listener handles the handshake automatically.
:::

Both `verifyToken` and `appSecret` are required. The listener can't start without them.

## Next steps

- [Action Reference](actions.md): send messages and manage media using the `Client`.
- [Trigger Reference](triggers.md): handle webhook events using the `Listener` and `WhatsAppService`.
