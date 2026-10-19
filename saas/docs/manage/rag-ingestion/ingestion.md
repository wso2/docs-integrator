---
title: RAG Ingestion Automation
---

# RAG Ingestion

Retrieval-augmented generation (RAG) improves LLM answers by using relevant external data. RAG has two core stages: ingestion and retrieval. This page explains how to configure scheduled ingestion in WSO2 Cloud - Integration Platform.

:::info Prerequisites
- Access to WSO2 Cloud paid subscription with permission to create automations.
- API credentials for a supported vector store, embedding provider, and data source.
- A Google Drive folder or Amazon S3 bucket that contains source files.

WSO2 Cloud supports file types such as PDF, including scanned PDFs, DOCX, PPTX, XLSX, CSV, HTML, Markdown, images, and audio files (`MP3`, `WAV`, `M4A`, `FLAC`, and `OGG`).

Navigate to your organization using the **Organization** dropdown in the console header. In the left navigation menu, click **RAG**, then select **Scheduled ingestion**.

## Set up scheduled ingestion

### Step 1: Initialize the vector store

LLMs receive context as numerical vectors (embeddings). A vector store keeps these embeddings for efficient retrieval.

1. Select `Pinecone` as the vector database.
2. Enter the key in **API Key**.

To create a key, see the [Pinecone API key documentation](https://docs.pinecone.io/guides/projects/manage-api-keys#create-an-api-key).

3. Enter **Collection Name**. The collection is created automatically if it does not exist.
4. Click **Next**.

### Step 2: Configure the embedding model

1. Select `text-embedding-ada-002` from the **OpenAI** provider list.
2. Enter the key in **Embedding model API key**.

To create a key, see the [OpenAI embeddings documentation](https://platform.openai.com/docs/guides/embeddings).

3. Click **Next**.

### Step 3: Configure chunking

Chunking splits large documents into smaller segments that the ingestion pipeline can process efficiently.

1. Review **Chunking strategy**, **Max segment size**, and **Max overlap size**.
2. Keep the defaults or update values based on your document size and retrieval quality needs.
3. Click **Next**.

- **Chunking strategy** controls how text is split into chunks.
- **Max segment size** sets the maximum token length for a chunk.
- **Max overlap size** sets how many tokens overlap between consecutive chunks.

### Step 4: Create the automation

Fill in the automation details:

| Field | Value |
|---|---|
| **Project** | Select the target project from the available project list. |
| **Display name** | `Sample Automation` |
| **Name** | `sample-automation` |
| **Description** (optional) | `My sample automation description` |

### Step 5: Configure the data source

The data source defines where files are read from. WSO2 Cloud supports Google Drive folders and Amazon S3 buckets.

1. Select `Google Drive` as the data source.
2. Enter the key in **API Key**.

Create a key in [Google Cloud Console](https://console.cloud.google.com/) and restrict it to the **Google Drive API** as explained in the [Google API key documentation](https://cloud.google.com/docs/authentication/api-keys#create).

The target folder must be public with **Anyone with the link** access. API keys cannot access private files.

Alternatively, if you have an enterprise account, you can use the OAuth flow to authenticate instead of an API key.

3. Enter the **Folder ID** for the folder to ingest.

You can find the folder ID in the Google Drive URL, after `/folders/`.

4. Click **Create automation**. The platform redirects you to the automation overview page.

- When you create a scheduled RAG ingestion automation, WSO2 Cloud increases container CPU and memory for stable execution.
- For very large files or high ingestion volume, scale resources in **Admin** > **Containers**.

<ThemedImage
    alt="RAG ingestion configuration form"
    sources={{
        light: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-configure-light.gif'),
        dark: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-configure-light.gif'),
    }}
/>

### Step 6: Schedule ingestion

After creation, the automation is deployed to the development environment with your saved configuration.

1. Click **Test** to run ingestion immediately.
2. Click **Schedule** to configure recurring ingestion.
3. Check automation logs to verify successful ingestion.

<ThemedImage
    alt="Run ingestion and view logs"
    sources={{
        light: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-ingest-light.gif'),
        dark: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-ingest-light.gif'),
    }}
/>

You can run ingestion at intervals such as minutely, hourly, daily, monthly, or yearly. In each run, the system detects new files in the data source and ingests them into the vector store.

<ThemedImage
    alt="Schedule recurring ingestion"
    sources={{
        light: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-schedule-light.gif'),
        dark: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-schedule-light.gif'),
    }}
/>

### Step 7: Verify

Once processing is complete, execute test queries to ensure proper data retrieval.

1. On the automation overview page, switch to the **Retrieval** tab.
2. Enter a query based on the content of the files ingested in the previous step in the **Query** field.
3. **Maximum chunks to retrieve** and **Minimum similarity threshold** are automatically populated with default values. You can modify them if needed by clicking **Query Configurations**.

- **Maximum chunks to retrieve** defines the number of matching chunks to retrieve for the query.
- **Minimum similarity threshold** determines whether a chunk is relevant enough to be considered a match for a given query. It is expressed as a value between 0 and 1 (for example, 0.7 or 70% similarity).

4. Click **Send** to execute the query.
5. Review the returned chunks to confirm that relevant content is retrieved.

If the **Send** button is unavailable, use the [RAG retrieval](./retrieval.md) to verify retrieval.

<ThemedImage
    alt="Configure retrieval values and verify results in the Retrieval tab"
    sources={{
        light: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-retrieval-verification.gif'),
        dark: useBaseUrl('/img/manage/cloud/rag-ingestion/rag-retrieval-verification.gif'),
    }}
/>

A component named **RAG Retrieval Service** is automatically created alongside the ingestion automation. This component is used internally by the ingestion automation and is not intended for external use.

## What's next

- [RAG retrieval](./retrieval.md) — Query the vector store after ingestion completes.
- [RAG service](./service.md) — Ingest, chunk, and retrieve documents through the service API.
- [Managed vector databases](./vector-databases.md) — Provision the vector store used by RAG.
