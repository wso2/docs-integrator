---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure Storage account and obtaining the credentials required to use the Azure Storage Service connector.

## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free account](https://azure.microsoft.com/en-us/free/).

## Step 1: Create an Azure Storage account

1. Log in to the [Azure Portal](https://portal.azure.com/).
2. In the left-hand menu, select **Storage accounts**, then select **+ Create**.
3. Under **Basics**, fill in the required fields:
   - **Subscription**: Select your Azure subscription.
   - **Resource group**: Select an existing group or create a new one.
   - **Storage account name**: Enter a globally unique name (3–24 lowercase letters and numbers).
   - **Region**: Choose the region closest to your workload.
   - **Performance**: Select **Standard** (or **Premium** for latency-sensitive workloads).
   - **Redundancy**: Select **Locally-redundant storage (LRS)** for development.
4. Select **Review + create**, then **Create**.
5. Once deployment completes, select **Go to resource**.

## Step 2: Retrieve the storage account access key

1. In your storage account, navigate to **Security + networking > Access keys** in the left menu.
2. Select **Show keys** to reveal the key values.
3. Copy either **key1** or **key2** — this is your `accessKeyOrSAS` value when using `accessKey` authorization.

Store the access key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Generate a shared access signature (optional)

If you prefer scoped, time-limited access instead of a full account key:

1. In your storage account, navigate to **Security + networking > Shared access signature**.
2. Under **Allowed services**, select **Blob** and/or **File**.
3. Under **Allowed resource types**, select **Service**, **Container**, and **Object** as required.
4. Set the **Start** and **Expiry** date/time for the token.
5. Under **Allowed permissions**, select the permissions your integration needs (for example, Read, Write, Delete, List).
6. Select **Generate SAS and connection string**.
7. Copy the **SAS token** value (begins with `?sv=…`) — this is your `accessKeyOrSAS` value when using `SAS` authorization.

When using a SAS token, set `authorizationMethod` to `"SAS"` in your `ConnectionConfig`. Confirm the exact format required by the connector version you are using.

## Step 4: Create a file share (for the Files sub-module)

Azure File Shares are available by default in general-purpose v2 storage accounts:

1. In your storage account, navigate to **Data storage > File shares**.
2. Select **+ File share**.
3. Enter a **Name** (for example, `myfileshare`) and set the **Provisioned capacity** in GiB.
4. Select **Create**.

Note the file share name — it is used as the `fileShareName` parameter in Files connector operations.

## What's next

- [Action reference](actions.md): Available operations
