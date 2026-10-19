---
title: Setup Guide
---

# Setup Guide

This guide walks you through preparing an Azure storage account and obtaining the credentials the `ballerinax/azure.storage.files` connector needs to authenticate with Azure Files.

## Prerequisites

- An Azure subscription. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).

## Create a storage account

1. Sign in to the [Azure portal](https://portal.azure.com/), search for **Storage accounts**, and open it.
2. Select **+ Create**.
3. On the **Basics** tab, select a subscription and resource group, provide a globally unique storage account name, and pick a region. The **Standard** performance tier is sufficient for SMB file shares; choose **Premium** with the **File shares** account type only if you need provisioned performance or NFS.
4. Select **Review + create**, then **Create**, and wait for the deployment to complete. For the full set of options, see the [Azure documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

## Create a file share

1. Open the deployed storage account and navigate to **Data storage** > **File shares**.
2. Select **+ File share**, provide a name, and select **Create**. The share name is what you pass to the connector at initialization. For details, see the [Azure Files documentation](https://learn.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share).

## Obtain credentials

The connector accepts any one of the following credential types. An access key is the most capable credential: share-level administrative operations and key-based SAS token generation require it. (User delegation SAS is the exception; it requires a Microsoft Entra ID identity instead, as described below.)

### Access keys

1. In the storage account, navigate to **Security + networking** > **Access keys**.
2. Select **Show** next to **key1**, then copy the storage account name and the key value. These two values are the account name and account key the connector's shared key authentication uses.

### SAS token or SAS URL

1. In the storage account, navigate to **Security + networking** > **Shared access signature**.
2. Select the allowed services, resource types, permissions, and an expiry window, then select **Generate SAS and connection string**.
3. Copy the **SAS token**, or the **File service SAS URL** if you prefer a single value that carries both the endpoint and the token.

A SAS credential is limited to the services, resource types, permissions, and expiry it was minted with. The portal's **Shared access signature** page mints an account SAS; minted with the File service and the container resource type, it can also perform share-level administrative operations. A share- or file-scoped SAS cannot. No SAS credential can mint further SAS tokens.

### Connection string

The portal shows a connection string alongside each access key under **Security + networking** > **Access keys**. Select **Show** next to the **Connection string** field and copy the value. It carries the account name, the credential, and the service endpoints in one string.

### Microsoft Entra ID

The connector can authenticate as a Microsoft Entra ID identity: a service principal (via a client secret or certificate), a managed identity, a federated workload identity, or the default credential chain of the environment it runs in.

To use a service principal:

1. In the Azure portal, open **Microsoft Entra ID** > **App registrations** and select **+ New registration**. After registering, note the **Directory (tenant) ID** and **Application (client) ID** from the app's overview page.
2. Under the app's **Certificates & secrets**, create a client secret (or upload a certificate) and copy its value.

The role requirements apply regardless of which Entra ID credential kind you use, and they split by operation family:

- For file and directory data operations, the identity must hold the **Storage File Data Privileged Reader** or **Storage File Data Privileged Contributor** role on the storage account. The connector sends the backup intent on every request; this requires the privileged roles and bypasses file and directory ACLs.
- Share-level and account-level management operations (the admin operations, and the operations on the share itself) authorize against the storage account's management permissions instead: the identity needs a role carrying the `Microsoft.Storage/storageAccounts/fileServices/shares/` read, write, and delete actions, such as **Contributor** on the storage account. The privileged data roles alone do not cover these operations.
- Generating user delegation SAS tokens additionally requires the **Storage File Delegator** role.

An identity covering the full connector surface holds a privileged data role and a management role together. Assign the roles in the storage account under **Access control (IAM)** > **Add** > **Add role assignment**.

## Next steps

- [Actions](action-reference.md): the operations available on the connector's clients.
- [Triggers](trigger-reference.md): event-driven integration with the polling listener.
- [Example](example.md): step-by-step walkthroughs using the credentials from this guide.
