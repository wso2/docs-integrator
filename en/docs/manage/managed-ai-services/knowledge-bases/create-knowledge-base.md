---
sidebar_position: 1
sidebar_label: Create a Knowledge Base
title: Create a Knowledge Base
description: Create a managed Knowledge Base with a vector store, embedding model, chunking strategy, and optional data source in WSO2 Cloud.
keywords: [wso2 integrator, wso2 cloud, create knowledge base, rag, vector store, embedding model, chunking, google drive, amazon s3]
slug: /manage/managed-ai-services/knowledge-bases/create-knowledge-base
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Create a Knowledge Base

A Knowledge Base controls how your data is split into chunks, converted to embeddings, stored, and queried. You can attach a data source during creation or add one later.

## Prerequisites

Before you begin, ensure you have the following:

- **Platform access:** A WSO2 Cloud organization with permission to create AI services.
- **Vector storage:** Connection details for a [supported vector store](./knowledge-bases.md#vector-stores) or a compatible WSO2-managed PostgreSQL database.
- **Model provider:** A valid API key for OpenAI, Azure OpenAI, or Mistral AI.
- **Data source (optional):** Credentials and a specific Google Drive folder or Amazon S3 bucket if you plan to ingest content immediately.

## Start the creation wizard

1. Sign in to WSO2 Cloud and select the organization in which you want to create the Knowledge Base.
2. In the left navigation, expand **AI Services**, and then select **Knowledge Base**.
3. Click **Add Knowledge Base**.

<ThemedImage
    alt="Knowledge Bases page with the Add Knowledge Base button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/knowledge-base-list.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/knowledge-base-list.png'),
    }}
/>

## Step 1: Name the Knowledge Base

1. Enter a descriptive name for the **Knowledge Base**. The platform derives an immutable key from this name.
2. Optional: Enter a description that explains the content or intended consumers of the Knowledge Base.
3. Click **Next**.

<ThemedImage
    alt="Name Knowledge Base step showing the name, generated key, and description fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/configure-vector-store.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/configure-vector-store.png'),
    }}
/>

:::tip
Choose a name that identifies the content rather than its storage provider, for example `HR policies` or `Product documentation`. This makes the Knowledge Base easier to reuse if its backing service changes.
:::

## Step 2: Configure the vector store

Select a provider and enter connection details:

| Provider | Fields |
| --- | --- |
| **Pinecone** | API key and index name |
| **Chroma** | Host, port (default `8000`), and collection name |
| **Weaviate** | Cluster REST URL, API key, and collection name |
| **PostgreSQL** | Host, port (default `5432`), user, password, database, and table name |
| **WSO2 Integration Platform Managed** | Select an available managed PostgreSQL database. The option is displayed only when a compatible database exists in the organization. |

- Click **Next**. The button becomes available after all required fields pass validation.

:::tip
Use a separate collection, index, or table for content that has different ownership, access, retention, or embedding requirements.
:::

## Step 3: Configure embedding and chunking

1. Select an embedding provider and model:
   - **OpenAI:** Select `text-embedding-3-small`, `text-embedding-3-large`, or `text-embedding-ada-002`, and enter the API key.
   - **Azure OpenAI:** Enter the model ID, API key, base URL, and API version.
   - **Mistral AI:** Select `mistral-embed` and enter the API key.
2. Select a chunking strategy:
   - **Recursive (default):** Splits text using progressively smaller separators. This is a suitable starting point for most documents.
   - **Sentence:** Keeps sentence boundaries when splitting content.
   - **Character:** Splits content by character count.
3. Set **Max segment size** and **Max overlap size**. The defaults are `1000` and `200` respectively.
4. Click **Next**.

<ThemedImage
    alt="Configure embedding and chunking step with provider, strategy, segment size, and overlap settings"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/configure-embedding-and-chunking.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/configure-embedding-and-chunking.png'),
    }}
/>

:::note
Larger segments preserve more context but can reduce retrieval precision. Overlap helps preserve context across boundaries but increases the number of stored tokens. Start with the defaults, test representative queries, and tune these values based on the results.
:::

## Step 4: Add a data source (optional)

Select a source, enter its credentials, and choose when ingestion runs:

| Source | Connection options | Content location |
| --- | --- | --- |
| **Google Drive** | API key, or OAuth client ID, client secret, and refresh token | Folder ID |
| **Amazon S3** | Access key ID and secret access key | Bucket name |

Select **One-time** to ingest once after deployment, or **Scheduled** to run repeatedly. A schedule can use a simple interval or a cron expression. Click **Next** when the source is configured, or click **Skip** to add a data source later.

<ThemedImage
    alt="Optional data source step showing Google Drive and Amazon S3 with one-time and scheduled ingestion options"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/add-data-source.png'),
    }}
/>

:::info
Creating a Knowledge Base without a data source is useful when another workflow will ingest content or when credentials are not yet available. You can attach multiple data sources later.
:::

## Step 5: Review and create

1. Review the Knowledge Base name, vector store, collection or table, embedding provider and model, chunking settings, and optional data source.
2. Click **Back** to correct any value.
3. Click **Create**.

<ThemedImage
    alt="Review and Create step summarizing the Knowledge Base configuration"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/review-and-create.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/review-and-create.png'),
    }}
/>

The platform saves the shared configuration and creates the initial KB service. If you added a data source, the platform creates and deploys it as well. A one-time source runs after deployment; a scheduled source runs according to its schedule.

## Verify the Knowledge Base

1. Open the Knowledge Base from the list.
2. On **Overview**, confirm that the vector store, collection or table, embedding provider, and chunking strategy are correct.
3. If you attached a data source, wait until its status is **Deployed**, run **Ingest** if necessary, and review **Execution logs**.
4. Open **Retrieval**, enter a query based on the ingested content, and click **Send**.

For all management actions, see [Manage a Knowledge Base](./manage-knowledge-base.md).
