---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

This guide walks you through setting up WSO2 Identity Server to send webhook events to an integration that uses the `ballerinax/identityserver.trigger` package.

## Configuring Identity Server webhooks

To receive identity events with the `ballerinax/identityserver.trigger` package, add a webhook in the WSO2 Identity Server or Asgardeo Console that points at your listener, and give the listener the same secret.

### Prerequisites

- WSO2 Identity Server 7.2 or later, or an Asgardeo organization, where you can manage webhooks.
- A URL for your listener that the server can reach. An Identity Server on the same machine can call `http://localhost:8090` directly. For Asgardeo, or an Identity Server that runs elsewhere, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

<ThemedImage
    alt="ngrok forwarding a public URL to the listener on localhost:8090"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-ngrok-forwarding.png'),
        dark: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-ngrok-forwarding.png'),
    }}
/>

- A webhook secret: a random string you set both on the webhook and as the listener's `webhookSecret`.

### Open webhook settings

In the Console, go to **Webhooks** and click **Add Webhook**. The screenshots are from Asgardeo; the Identity Server Console has the same pages.

<ThemedImage
    alt="Webhooks page in the Asgardeo Console"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-settings-page.png'),
        dark: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-settings-page.png'),
    }}
/>

### Add the webhook

Fill in the following fields:

| Field | Value |
|---|---|
| **Name** | Any descriptive name |
| **Endpoint** | Your listener's URL, such as the ngrok forwarding URL |
| **Secret** | The same value you set as `webhookSecret` in your integration |
| **Active** | On, or turn it on later from the webhook list |

<ThemedImage
    alt="Add Webhook form with the name, the endpoint and the secret"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-form-filled.png'),
        dark: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-form-filled.png'),
    }}
/>

### Select events

Under **Select Events**, select the event groups for the service types your integration attaches, and click **Create**:

| If you use | Select |
|---|---|
| `LoginService` | **Logins** |
| `SessionService` | **Sessions** |
| `UserService` | **User account management** |
| `RegistrationService` | **Registrations** |
| `TokenService` | **Tokens** |
| `CredentialService` | **Credential updates** |
| `ConsentPurposeService` | **Consent purpose** |
| `ConsentService` | **Consents** |
| `RoleService` | **Role management** |
| `OrganizationService` | **Organization management** |

See the [Trigger Reference](triggers.md#callback-signatures) for every callback.

<ThemedImage
    alt="Select Events list with Logins and Registrations selected"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-event-selection.png'),
        dark: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-event-selection.png'),
    }}
/>

### Activate the webhook

The webhook is listed as **Active**. When it's activated, Asgardeo sends a `GET` verification request for each subscribed event type. The listener answers it, so your integration must be running at that point. If it wasn't, turn the webhook off and on again to resend the requests.

<ThemedImage
    alt="Webhook list showing the webhook as Active"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-activated.png'),
        dark: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-activated.png'),
    }}
/>

### Test the webhook

Trigger an event, for example by signing in to an application in the organization. Each delivery shows up in the ngrok console with `200 OK`, and your callback runs.

<ThemedImage
    alt="ngrok console showing a delivery answered with 200 OK"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-confirmed.png'),
        dark: useBaseUrl('/img/connectors/catalog/security-identity/identityserver.trigger/trigger-webhook-confirmed.png'),
    }}
/>

:::warning
Set the same secret on the webhook and as `webhookSecret`. The listener verifies the `x-wso2-event-signature` header (Identity Server) or the `x-hub-signature` header (Asgardeo) on every delivery, and while `webhookSecret` isn't set it rejects every delivery with `401 Unauthorized`.
:::

See [Set up webhooks](https://is.docs.wso2.com/en/latest/guides/webhooks/setup-webhooks/) and [Webhook events and payloads](https://is.docs.wso2.com/en/latest/guides/webhooks/webhook-events-and-payloads/) for the server side.

## What's next

- [Trigger Reference](triggers.md): listener configuration, every callback and the payload types
- [Example](example.md): build an event integration in WSO2 Integrator
