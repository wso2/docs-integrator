---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Azure Storage account and obtaining the credentials required to use the Azure Storage Service connector.

## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free account](https://azure.microsoft.com/en-us/free/).

## Create an Azure storage account

1. Log in to the [Azure Portal](https://portal.azure.com/).
2. In the left-hand menu, click **Storage accounts**, then click **+ Create**.
3. Under **Basics**, fill in:
   - **Subscription**: Select your Azure subscription.
   - **Resource group**: Select an existing group or create a new one.
   - **Storage account name**: Enter a globally unique name (e.g., `myballerinastorage`). Must be 3–24 lowercase letters and numbers.
   - **Region**: Choose the region closest to your workload.
   - **Performance**: Select **Standard** (or **Premium** for latency-sensitive workloads).
   - **Redundancy**: Select **Locally-redundant storage (LRS)** for development.
4. Click **Review + create**, then click **Create**.
5. Once deployment completes, click **Go to resource**.

## Retrieve the storage account access key

1. In your Storage account overview, navigate to **Security + networking** → **Access keys** in the left-hand menu.
2. Click **Show keys** to reveal the key values.
3. Copy either **key1** or **key2**; this is your `accessKeyOrSAS` value when using `accessKey` authorization.

Store the access key securely. Do not commit it to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Generate a shared access signature (SAS) (optional)

If you prefer scoped, time-limited access instead of a full account key:

1. In your Storage account, navigate to **Security + networking** → **Shared access signature**.
2. Under **Allowed services**, select **Blob** and/or **File**.
3. Under **Allowed resource types**, select **Service**, **Container**, and **Object** as required.
4. Set the **Start** and **Expiry** date/time for the token.
5. Under **Allowed permissions**, select the permissions your integration needs (e.g., Read, Write, Delete, List).
6. Click **Generate SAS and connection string**.
7. Copy the **SAS token** value (begins with `?sv=…`); this is your `accessKeyOrSAS` value when using `SAS` authorization.

When using a SAS token, set `authorizationMethod` to `"SAS"` in your `ConnectionConfig`. The SAS token should be provided without any leading `?` in the `accessKeyOrSAS` field; confirm the format required by the connector version you are using.

## Enable Azure file service (for files sub-module)

Azure File Shares are available by default in general-purpose v2 storage accounts. To create a file share:

1. In your Storage account, navigate to **Data storage** → **File shares**.
2. Click **+ File share**.
3. Enter a **Name** (e.g., `myfileshare`) and set the **Provisioned capacity** (quota in GiB).
4. Click **Create**.

Note the file share name; it is used as the `fileShareName` parameter in the Files connector operations.

## Next steps

- [Actions Reference](actions.md): Available operations
