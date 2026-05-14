---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure Service Bus namespace and obtaining the connection string required to use the ASB connector.

## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).

## Step 1: Create an Azure Service Bus namespace

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. In the left navigation pane, select **All services** > **Integration** > **Service Bus**, then select **Create** on the Service Bus tile.

   ![Create Resource Service Bus menu](/img/connectors/catalog/messaging/asb/setup/create-resource-service-bus-menu.png)

3. On the **Create namespace** page, fill in the following fields:
   - **Subscription**: Select your Azure subscription.
   - **Resource group**: Select an existing resource group or create a new one.
   - **Namespace name**: Enter a globally unique name. The name must be 6–50 characters, contain only letters, numbers, and hyphens, start with a letter, and end with a letter or number.
   - **Location**: Choose the region closest to you.
   - **Pricing tier**: Select **Standard** or **Premium**. Standard supports topics and subscriptions; Basic supports queues only.

   :::note
   For topics and subscriptions, select **Standard** or **Premium**. The **Basic** tier supports queues only. The **Premium** tier provides resource isolation via messaging units (1, 2, 4, 8, or 16 per namespace).
   :::

4. Select **Review + create**, review the settings, then select **Create**.

   ![Create namespace](/img/connectors/catalog/messaging/asb/setup/create-namespace.png)

## Step 2: Create a queue or topic

**To create a queue:**

1. In your Service Bus namespace, select **Queues** from the left menu and select **+ Queue**.
2. Enter a **Name** (for example, `my-queue`), configure optional settings, and select **Create**.

**To create a topic with a subscription:**

1. Select **Topics** from the left menu and select **+ Topic**.
2. Enter a **Name** (for example, `my-topic`) and select **Create**.
3. Open the topic, select **+ Subscription**, enter a **Name** (for example, `my-subscription`), and select **Create**.

## Step 3: Get the connection string

1. In your Service Bus namespace, select **Shared access policies** under **Settings**.
2. Select the **RootManageSharedAccessKey** policy (or create a custom policy with only the required claims).
3. Copy the **Primary Connection String**.

   ![Connection string](/img/connectors/catalog/messaging/asb/setup/connection-string.png)

   The connection string has the following format:
   ```
   Endpoint=sb://<namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<key>
   ```

Store the connection string securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action Reference](actions.md): start sending and receiving messages
- [Trigger Reference](triggers.md): set up event-driven message consumption
- [Example](example.md): complete worked examples for sender, receiver, and trigger
