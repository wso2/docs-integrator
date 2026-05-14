---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Google Cloud project, enabling the Pub/Sub API, and generating a service account key to authenticate the connector.

## Prerequisites

- A Google Cloud account. If you do not have one, [sign up for a free account](https://cloud.google.com/free).

## Step 1: Create a Google Cloud project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select the project drop-down and select **New Project**.
3. Enter a project name and select **Create**.
4. Note your **project ID** — you will need it for configuration.

## Step 2: Enable the Pub/Sub API

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**.
2. Search for **Cloud Pub/Sub API** and select it.
3. Select **Enable**.

## Step 3: Create a service account and download the key

1. Navigate to **IAM & Admin** > **Service Accounts** and select **Create Service Account**.
2. Enter a name (for example, `pubsub-connector`) and select **Create and Continue**.
3. Assign the **Pub/Sub Editor** role (or assign **Pub/Sub Publisher** and **Pub/Sub Subscriber** separately for least-privilege access).
4. Select **Done**.
5. Select the newly created service account, then go to the **Keys** tab.
6. Select **Add Key** > **Create new key** > **JSON** > **Create**.
7. Save the downloaded JSON key file securely — you will need the path to this file for authentication.

The JSON key file grants access to your Google Cloud resources. Treat it like a password and do not commit it to source control.

## Step 4: Create a topic

1. Navigate to **Pub/Sub** > **Topics** and select **Create Topic**.
2. Enter a **Topic ID** (for example, `my-topic`).
3. Select **Create**.

## Step 5: Create a subscription

1. Navigate to **Pub/Sub** > **Subscriptions** and select **Create Subscription**.
2. Enter a **Subscription ID** (for example, `my-subscription`).
3. Select the topic you created in the previous step from the drop-down.
4. Set the delivery type to **Pull**.
5. Select **Create**.

The subscription ID you set here is the value used in the `@pubsub:ServiceConfig` annotation's `subscription` field.
