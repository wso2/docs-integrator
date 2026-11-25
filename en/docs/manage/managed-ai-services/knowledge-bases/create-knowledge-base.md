---
sidebar_position: 1
sidebar_label: Create a Knowledge Base
title: Create a Knowledge Base
description: Create a managed Knowledge Base with a vector store, embedding model, chunking strategy, and optional data source on Choreo Integration.
keywords: [choreo integrator, choreo cloud, create knowledge base, rag, vector store, embedding model, chunking, google drive, amazon s3]
slug: /manage/managed-ai-services/knowledge-bases/create-knowledge-base
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Create a Knowledge Base

A Knowledge Base controls how your data is split into chunks, converted to embeddings, stored, and queried. You can attach a data source during creation or add one later.

## Prerequisites

- Connection details for a [supported vector store](./knowledge-bases.md#vector-stores): for example, a Pinecone API key and index name.
- A valid API key for an embedding provider: OpenAI, Azure OpenAI, or Mistral AI.
- A data source (optional): credentials and a specific Google Drive folder or Amazon S3 bucket, if you plan to ingest content immediately.

## Start the creation wizard

In the organization's left navigation, expand **AI Services** and click **Knowledge Bases**. If you have no knowledge bases yet, click **Create a knowledge base**; otherwise click **Create knowledge base** on the knowledge bases list. A seven-step wizard opens.

### Step 1: Name

Enter a **Display name**. The **Name** field derives an immutable identifier from it, and you can optionally add a **Description**.

<ThemedImage
    alt="Name the knowledge base step with Display name, Name, and Description fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/create-name.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/create-name.png'),
    }}
/>

### Step 2: Vector store

Select a provider and enter its connection details:

| Provider | Fields |
| --- | --- |
| **Pinecone** | API key, index name |
| **Chroma** | Host, port (default `8000`), collection name |
| **Weaviate** | Cluster REST URL, API key, collection name |
| **PostgreSQL** | Bring your own PostgreSQL database with the pgvector extension |

<ThemedImage
    alt="Initialize vector store step with Pinecone selected and its API key and index name fields"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/create-vector-store.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/create-vector-store.png'),
    }}
/>

### Step 3: Embedding model

Select a provider — **OpenAI**, **Azure OpenAI**, or **Mistral AI** — then its model and API key. For OpenAI, the model dropdown offers `text-embedding-3-small`, `text-embedding-3-large`, and `text-embedding-ada-002`.

<ThemedImage
    alt="Configure embedding model step with OpenAI selected, text-embedding-3-small chosen, and the API key field"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/create-embedding-model.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/create-embedding-model.png'),
    }}
/>

### Step 4: Chunking

Select a **Chunking strategy** — **Recursive (default)**, **Sentence**, or **Character** — and set **Max segment size** (default `1000`) and **Max overlap size** (default `200`).

<ThemedImage
    alt="Configure chunking step with Recursive strategy, max segment size 1000, and max overlap size 200"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/create-chunking.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/create-chunking.png'),
    }}
/>

:::note
Larger segments preserve more context but can reduce retrieval precision. Overlap helps preserve context across chunk boundaries but increases the number of stored tokens. Start with the defaults, test representative queries, and tune these values based on the results.
:::

### Step 5: Data source

Select **Google Drive** or **Amazon S3** and enter its credentials, or skip this step entirely — click **Create without data source** to finish now and [add one later](./add-data-sources.md).

<ThemedImage
    alt="Configure data source step with Google Drive and Amazon S3 options, and a Create without data source button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/create-data-source.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/create-data-source.png'),
    }}
/>

See [Add data sources](./add-data-sources.md#add-a-data-source) for the exact fields each provider asks for.

### Step 6: Ingestion schedule

Choose **Ingest once, now** or **Ingest on a schedule** (by interval or cron). This step only appears if you selected a data source in step 5 — clicking **Create without data source** skips straight to Review.

### Step 7: Review and create

Review the name, vector store, embedding model, chunking settings, and data source (or confirmation that none is attached), then click **Create knowledge base**.

<ThemedImage
    alt="Review and create step summarizing the knowledge base configuration, with a Create knowledge base button"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/create-review.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/create-review.png'),
    }}
/>

Creating a knowledge base also creates its KB service, which serves retrieval for it. The knowledge base shows status **Creating**, then **Deploying**, then **Active** once its KB service is up.

## Verify the knowledge base

1. Open the knowledge base from the list.
2. On **Overview**, confirm the vector store, collection/table, embedding provider, and chunking settings are correct, and that the **KB service URL** is populated.
3. If you attached a data source, wait until it finishes deploying, then [ingest and verify it](./add-data-sources.md).
4. Open **Retrieval** and send a test query. See [Manage a Knowledge Base](./manage-knowledge-base.md#test-retrieval).

For all management actions, see [Manage a Knowledge Base](./manage-knowledge-base.md).
