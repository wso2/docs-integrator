---
title: Setup Guide
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

This guide walks you through creating a Twilio account and obtaining the credentials required to use the Twilio connector.

## Step 1: Create a Twilio account

Visit [Twilio](https://www.twilio.com) and select **Try Twilio for Free** to create an account.

## Step 2: Obtain a Twilio phone number

Trial projects can provision a complimentary phone number for testing.

:::note
Trial project phone number selection may be limited. Upgrade your Twilio project to provision more than one phone number or a number not available to trial projects.
:::

1. Access the **Buy a Number** page in the Console.

   <ThemedImage
       alt="Get phone number"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/get-phone-number.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/get-phone-number.png'),
       }}
   />

2. Enter the criteria for the phone number you need and select **Search**.

   <ThemedImage
       alt="Configure phone number"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/phone-number-config.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/phone-number-config.png'),
       }}
   />

   - **Country**: Select the desired country.
   - **Number or Location**: Search by digits/phrases, or a specific city or region.
   - **Capabilities**: Select your service needs.

3. Select **Buy** to purchase a phone number for your project or sub-account.

   <ThemedImage
       alt="Search results"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/search-phone-number.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/search-phone-number.png'),
       }}
   />

:::note
Many countries require identity documentation for phone number compliance. See Twilio's [Phone Number Regulations](https://www.twilio.com/guidelines/regulatory) for details.
:::

## Step 3: Obtain the account SID, API key, and API secret

1. Go to [API keys & tokens](https://console.twilio.com/us1/account/keys-credentials/api-keys) in the Twilio Console and select **Create API key**.

   <ThemedImage
       alt="Twilio API key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/api-key-config.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/api-key-config.png'),
       }}
   />

2. Enter the criteria for the API key and select **Create**.

   <ThemedImage
       alt="Create API key"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/create-api-key.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/create-api-key.png'),
       }}
   />

   - **Friendly name**: A human-readable name to identify the key.
   - **Region**: The geographical region where the key will be used.
   - **Key type**: Choose **Standard**, **Main**, or **Restricted** based on the access level required.

3. Save the **API key SID** and **Secret** in a secure location.

   <ThemedImage
       alt="API key info"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/api-key-info.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/api-key-info.png'),
       }}
   />

   :::warning
   The secret is shown only once. Store it immediately in a safe location.
   :::

4. To find your **Account SID**, visit the [Twilio Console](https://www.twilio.com/console).

   <ThemedImage
       alt="Twilio credentials"
       sources={{
           light: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/get-credentails.png'),
           dark: useBaseUrl('/img/connectors/catalog/communication/twilio/setup/get-credentails.png'),
       }}
   />

## Configuring Twilio status callbacks

To receive call and message status changes with the `ballerinax/twilio.trigger` package, ask Twilio to send status callbacks to your listener, and give the listener your Auth Token and its public base URL.

The listener serves call status callbacks at `/callStatus` and message status callbacks at `/smsStatus`, so the URLs you give Twilio are the public base URL followed by one of those paths.

### Prerequisites

- A Twilio account with a phone number. See the steps above.
- A public URL for your listener. Twilio must reach it over the internet. For local testing, a tunnel such as [ngrok](https://ngrok.com/) gives your machine a public URL:

  ```bash
  ngrok http 8090
  ```

  The **Forwarding** URL it prints, such as `https://abc123.ngrok-free.app`, is your public base URL.

### Configure the listener

1. In the [Twilio Console](https://console.twilio.com/), find **Account Info** on the home page and copy the **Auth Token**. Twilio signs every callback with it ([how Twilio signs requests](https://www.twilio.com/docs/usage/webhooks/webhooks-security)).
2. Set the Auth Token as the listener's `webhookSecret`, and the public base URL as `webhookBaseUrl`. Use exactly the scheme and host Twilio calls, without a trailing slash, because Twilio signs the full URL. The listener adds the path and the query string it receives.

### Receive message status callbacks

Send a message with `StatusCallback` set to `<public base URL>/smsStatus`. On a trial account, `To` must be a number you have verified:

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
  --data-urlencode "From=<your Twilio number>" \
  --data-urlencode "To=<your phone number>" \
  --data-urlencode "Body=Hello from WSO2 Integrator" \
  --data-urlencode "StatusCallback=<public base URL>/smsStatus" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

For every message sent through a Messaging Service, set the service's **Delivery Status Callback** under **Integration** instead. See [Track the message status of outbound messages](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status).

### Receive call status callbacks

Create a call with `StatusCallback` set to `<public base URL>/callStatus`. Without `StatusCallbackEvent`, Twilio sends only the final status:

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
  --data-urlencode "From=<your Twilio number>" \
  --data-urlencode "To=<your phone number>" \
  --data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
  --data-urlencode "StatusCallback=<public base URL>/callStatus" \
  --data-urlencode "StatusCallbackEvent=initiated ringing answered completed" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

For calls to your Twilio number, set **Call status changes** under **Voice Configuration** on the number's **Configure** tab to `<public base URL>/callStatus` instead. Twilio reports `answered` as `in-progress`. See [Voice webhooks](https://www.twilio.com/docs/usage/webhooks/voice-webhooks).

### Check the callbacks

Each callback shows up in the ngrok console as `POST /smsStatus` or `POST /callStatus` with `200 OK`, and your callback runs. ngrok's request inspector at `http://127.0.0.1:4040` shows each callback's parameters.

:::warning
A `401` for every callback means the signature check failed. Check that `webhookSecret` is your current Auth Token and that `webhookBaseUrl` matches the URL Twilio calls. If you rotate the Auth Token in the Twilio Console, update `webhookSecret` too.
:::
