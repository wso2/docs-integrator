---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure Service Bus namespace, a queue or topic, and obtaining the connection string required to use the ASB connector.

## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).

## Step 1: Create an Azure service bus namespace

1. Log in to the [Azure Portal](https://portal.azure.com/).
2. In the search bar, type `Service Bus` and select **Service Bus** from the results.
3. Click **+ Create** to create a new namespace.
4. Fill in the required fields:
   - **Subscription**: Select your Azure subscription.
   - **Resource Group**: Select an existing resource group or create a new one.
   - **Namespace Name**: Enter a globally unique name (e.g., `my-asb-namespace`).
   - **Location**: Choose the Azure region closest to you.
   - **Pricing Tier**: Select **Standard** or **Premium** (Standard supports topics; Basic supports queues only).
5. Click **Review + Create**, then **Create**.
6. Wait for the deployment to complete, then click **Go to resource**.

The **Standard** tier or higher is required if you plan to use topics and subscriptions. The **Basic** tier only supports queues.

## Step 2: Create a queue or topic

**To create a Queue:**

1. In your Service Bus namespace, select **Queues** from the left menu.
2. Click **+ Queue**.
3. Enter a **Name** for the queue (e.g., `my-queue`).
4. Configure optional settings (max size, TTL, lock duration) or accept the defaults.
5. Click **Create**.

**To create a Topic (with Subscription):**

1. In your Service Bus namespace, select **Topics** from the left menu.
2. Click **+ Topic**.
3. Enter a **Name** for the topic (e.g., `my-topic`).
4. Click **Create**.
5. Open the newly created topic and select **+ Subscription**.
6. Enter a **Name** for the subscription (e.g., `my-subscription`) and click **Create**.

## Step 3: Get the connection string

1. In your Service Bus namespace, select **Shared access policies** from the left menu under **Settings**.
2. Click on the **RootManageSharedAccessKey** policy (or create a new policy with the required claims).
3. Copy the **Primary Connection String**.

The connection string looks like:

```
Endpoint=sb://<namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<key>
```

Store the connection string securely. Do not commit it to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action Reference](actions.md): start sending and receiving messages
- [Trigger Reference](triggers.md): set up event-driven message consumption
- [Example](example.md): complete worked examples for sender, receiver, and trigger
