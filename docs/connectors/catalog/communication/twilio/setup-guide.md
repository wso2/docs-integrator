---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Twilio account and obtaining the credentials required to use the Twilio connector.

## Prerequisites

- A Twilio account. If you do not have one, [sign up for a free trial](https://www.twilio.com/try-twilio).

## Step 1: Get your account SID and auth token

1. Log in to the [Twilio Console](https://console.twilio.com/).
2. On the main dashboard, locate **Account Info**.
3. Copy the **Account SID**; this is your `accountSid`.
4. Click **Show** next to **Auth Token** and copy it: this is your `authToken`.

Store your Account SID and Auth Token securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 2: Get a Twilio phone number

1. In the Twilio Console, navigate to **Phone Numbers** > **Manage** > **Buy a Number** (trial accounts receive one free number).
2. Search for a number with the desired capabilities (SMS, MMS, Voice).
3. Click **Buy** to provision the number.
4. Copy the phone number in E.164 format (e.g., `+1234567890`): use this as the `From` number in API calls.

Trial accounts can only send messages and make calls to verified phone numbers. Verify additional numbers under **Phone Numbers** > **Verified Caller IDs**.

## Step 3: Create an API key (optional)

If you prefer API Key authentication instead of Auth Token authentication:

1. In the Twilio Console, go to **Account** > **API keys & tokens**.
2. Click **Create API Key**.
3. Enter a **Friendly Name** for the key.
4. Select the key type (**Standard**, **Main**, or **Restricted**).
5. Click **Create API Key**.
6. Copy the **SID**; this is your `apiKey`.
7. Copy the **Secret**; this is your `apiSecret`. This value is shown only once.

The API Key Secret is displayed only at creation time. Store it immediately in a secure location. If lost, you must create a new API key.
