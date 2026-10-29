---
title: Setup Guide
---

# Setup Guide

This guide walks you through preparing an Azure storage account, obtaining the credentials the `ballerinax/azure.storage.blob` connector needs, and wiring the storage queue and Event Grid subscription that its listener consumes.

## Prerequisites

- An Azure subscription. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).

## Create a storage account

1. Sign in to the [Azure portal](https://portal.azure.com/), search for **Storage accounts**, and open it.
2. Select **+ Create**.
3. On the **Basics** tab, select a subscription and resource group, provide a globally unique storage account name, and pick a region. The **Standard** performance tier is sufficient for general-purpose blob storage; choose **Premium** with the **Block blobs** account type only for low-latency workloads.
4. Select **Review + create**, then **Create**, and wait for the deployment to complete. For the full set of options, see the [Azure documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

## Create a container

1. Open the deployed storage account and navigate to **Data storage** > **Containers**.
2. Select **+ Container**, provide a name, and select **Create**. The container name is what you pass to the connector's `Client` at initialization. For details, see the [Azure Blob Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal).

## Obtain credentials

The connector accepts any one of the following credential types. An access key is the most capable credential: it covers every operation, including the listener's queue access and key-based SAS token generation. (User delegation SAS is the exception; it requires a Microsoft Entra ID identity instead, as described below.)

### Access keys

1. In the storage account, navigate to **Security + networking** > **Access keys**.
2. Select **Show** next to **key1**, then copy the storage account name and the key value. These two values are the account name and account key the connector's shared key authentication uses.

### SAS token or SAS URL

1. In the storage account, navigate to **Security + networking** > **Shared access signature**.
2. Select the allowed services, resource types, permissions, and an expiry window, then select **Generate SAS and connection string**.
3. Copy the **SAS token**, or the **Blob service SAS URL** if you prefer a single value that carries both the endpoint and the token.

A SAS credential is limited to the services, resource types, permissions, and expiry it was minted with. The portal's **Shared access signature** page mints an account SAS; minted with the Blob service and the container resource type, it can also perform container-level administrative operations. A container- or blob-scoped SAS cannot. No SAS credential can mint further SAS tokens.

The listener needs an account SAS that spans both the **Queue** and **Blob** services, with the **Container** and **Object** resource types and the **Read**, **Add**, **Create**, **Update**, and **Process** permissions. A SAS limited to the Blob service cannot poll a queue, and the listener rejects it at initialization.

### Connection string

The portal shows a connection string alongside each access key under **Security + networking** > **Access keys**. Select **Show** next to the **Connection string** field and copy the value. It carries the account name, the credential, and the service endpoints in one string.

### Microsoft Entra ID

The connector can authenticate as a Microsoft Entra ID identity: a service principal (via a client secret or certificate), a managed identity, a federated workload identity, or the default credential chain of the environment it runs in.

To use a service principal:

1. In the Azure portal, open **Microsoft Entra ID** > **App registrations** and select **+ New registration**. After registering, note the **Directory (tenant) ID** and **Application (client) ID** from the app's overview page.
2. Under the app's **Certificates & secrets**, create a client secret (or upload a certificate) and copy its value.

The role requirements apply regardless of which Entra ID credential kind you use:

- For blob data operations, the identity must hold the **Storage Blob Data Contributor** role on the storage account, or **Storage Blob Data Reader** for read-only use.
- Creating and deleting containers and setting container metadata need only **Storage Blob Data Contributor**, assigned at storage account scope or wider to create a container. Access policies, index tags, and tag queries need **Storage Blob Data Owner**. Only reading and setting the blob service properties need a management role: the storage account's `blobServices/read` and `blobServices/write` actions, whose least privileged built-in role is **Storage Account Contributor**.
- Obtaining a user delegation key, for user delegation SAS tokens, needs the `generateUserDelegationKey` action at storage account scope or wider: **Storage Blob Delegator**, or any of the blob data roles assigned at that scope.
- The listener additionally requires the **Storage Queue Data Contributor** role, because it receives, updates, and deletes queue messages and sends to the poison queue.

Assign the roles in the storage account under **Access control (IAM)** > **Add** > **Add role assignment**.

## Enable soft delete (optional)

Restoring deleted blobs and containers requires soft delete. Under **Data management** > **Data protection**, enable **soft delete for blobs** (also settable through the connector's service configuration) and **soft delete for containers** (an account setting), each with a retention period.

## Wire the event queue (listener only)

The connector's `Listener` does not watch containers itself. Azure Event Grid delivers blob events to a storage queue, and each listener service consumes the queue it names. Create one queue and one Event Grid subscription per service.

### Create a storage queue

1. In the storage account, navigate to **Data storage** > **Queues**.
2. Select **+ Queue**, provide a name (for example, `invoice-events`), and select **OK**. The queue name is what the service names in its `@blob:ServiceConfig` annotation.

### Create an Event Grid subscription

1. In the storage account, navigate to **Events** and select **+ Event Subscription**.
2. Provide a name, and choose the **Event Grid Schema** or **Cloud Event Schema v1.0**. The listener accepts both.
3. Under **Event Types**, select **Blob Created** and **Blob Deleted**. Deselect the other types; the listener acknowledges events it does not handle, so they only add traffic.
4. Under **Endpoint Details**, choose **Storage Queues** as the endpoint type and select the queue created above.
5. On the **Filters** tab, enable subject filtering and set **Subject Begins With** to `/blobServices/default/containers/<container name>/` to limit the subscription to one container. Add any further filter the service needs, such as **Subject Ends With** for one extension, or an advanced filter that excludes a prefix the service writes to itself.
6. Select **Create**.

The subscription does the filtering; the service consumes whatever its queue carries. Creating the first subscription on a storage account also creates the account's system topic, which carries every later subscription.

The poison queue a service's failed messages move to, `<queue name>-poison` unless the service names another, does not need to be created. The listener creates it when a message first moves there.

The same wiring with the Azure CLI:

```bash
az storage queue create --name invoice-events --account-name <storage account name> --account-key <storage account key>
az eventgrid event-subscription create --name invoice-events-to-queue \
    --source-resource-id "/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Storage/storageAccounts/<storage account name>" \
    --endpoint-type storagequeue \
    --endpoint "/subscriptions/<subscription id>/resourceGroups/<resource group>/providers/Microsoft.Storage/storageAccounts/<storage account name>/queueServices/default/queues/invoice-events" \
    --included-event-types Microsoft.Storage.BlobCreated Microsoft.Storage.BlobDeleted \
    --subject-begins-with /blobServices/default/containers/invoices/
```

## Next steps

- [Actions](action-reference.md): the operations available on the connector's clients.
- [Triggers](trigger-reference.md): event-driven integration with the listener and its queues.
- [Example](example.md): step-by-step walkthroughs using the credentials and the queue from this guide.
