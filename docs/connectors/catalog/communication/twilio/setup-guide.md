---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Twilio account and obtaining the credentials required to use the Twilio connector.

## Step 1: Create a Twilio account

Visit [Twilio](https://www.twilio.com) and select **Try Twilio for Free** to create an account.

## Step 2: Obtain a Twilio phone number

Trial projects can provision a complimentary phone number for testing.

Trial project phone number selection may be limited. Upgrade your Twilio project to provision more than one phone number or a number not available to trial projects.

1. Access the **Buy a Number** page in the Console.

   ![Get phone number](/img/connectors/catalog/communication/twilio/setup/get-phone-number.png)

2. Enter the criteria for the phone number you need and select **Search**.

   ![Configure phone number](/img/connectors/catalog/communication/twilio/setup/phone-number-config.png)

   - **Country**: Select the desired country.
   - **Number or Location**: Search by digits/phrases, or a specific city or region.
   - **Capabilities**: Select your service needs.

3. Select **Buy** to purchase a phone number for your project or sub-account.

   ![Search results](/img/connectors/catalog/communication/twilio/setup/search-phone-number.png)

Many countries require identity documentation for phone number compliance. See Twilio's [Phone Number Regulations](https://www.twilio.com/guidelines/regulatory) for details.

## Step 3: Obtain the account SID, API key, and API secret

1. Go to [API keys & tokens](https://console.twilio.com/us1/account/keys-credentials/api-keys) in the Twilio Console and select **Create API key**.

   ![Twilio API key](/img/connectors/catalog/communication/twilio/setup/api-key-config.png)

2. Enter the criteria for the API key and select **Create**.

   ![Create API key](/img/connectors/catalog/communication/twilio/setup/create-api-key.png)

   - **Friendly name**: A human-readable name to identify the key.
   - **Region**: The geographical region where the key will be used.
   - **Key type**: Choose **Standard**, **Main**, or **Restricted** based on the access level required.

3. Save the **API key SID** and **Secret** in a secure location.

   ![API key info](/img/connectors/catalog/communication/twilio/setup/api-key-info.png)

   :::warning
   The secret is shown only once. Store it immediately in a safe location.
   :::

4. To find your **Account SID**, visit the [Twilio Console](https://www.twilio.com/console).

   ![Twilio credentials](/img/connectors/catalog/communication/twilio/setup/get-credentails.png)
