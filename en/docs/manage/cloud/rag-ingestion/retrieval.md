---
title: "RAG Retrieval"
description: "Query a vector store in WSO2 Integration Platform to retrieve relevant chunks for RAG applications."
keywords: [wso2 integrator, rag, retrieval, vector store, query]
---

# RAG Retrieval

Retrieval-augmented generation (RAG) retrieval searches a vector store for the most relevant information that answers a user query. Use it after ingestion to find supporting chunks for a response.

:::info Prerequisites
- You have already ingested files into a vector store. See [RAG Ingestion](./ingestion.md).
- API credentials for the vector store and the embedding provider.
:::

To retrieve chunks that have already been ingested, open your organization from the **Organization** dropdown in the console header. In the left navigation menu, click **RAG**, then select **Retrieval**.

## Set up retrieval

### Step 1: Initialize the vector store

1. Select `Pinecone` as the vector database.
2. Enter the key in **API Key**.

:::info
To create a key, see the [Pinecone API key documentation](https://docs.pinecone.io/guides/projects/manage-api-keys#create-an-api-key).
:::

3. Enter the **Collection name** to retrieve from.
4. Click **Next**.

### Step 2: Configure the embedding model

1. Select `text-embedding-ada-002` from the **OpenAI** provider list.
2. Enter the key in **Embedding model API key**.

:::info
To create a key, see the [OpenAI embeddings documentation](https://platform.openai.com/docs/guides/embeddings).
:::

3. Click **Next**.

### Step 3: Query and retrieve chunks

1. Enter a query that matches the content of ingested files.
2. Review **Maximum chunks to retrieve** and **Minimum similarity threshold**. Update if needed.

:::info
- **Maximum chunks to retrieve** sets how many matching chunks are returned.
- **Minimum similarity threshold** is a value between 0 and 1 that filters out low-similarity results (for example, `0.7`).
:::

3. Click **Retrieve**. Results display matching chunks and their similarity scores.

:::info
WSO2 Cloud - Integration Platform's retrieval process can apply reranking models to return the most contextually relevant chunks.
:::

![Retrieve relevant chunks from the vector store](/img/manage/cloud/rag-ingestion/rag-retrieval-light.gif)

### Step 4: Enable reranking (optional)

Reranking reorders retrieved chunks by contextual relevance, improving the quality of results passed to your LLM. WSO2 Cloud supports reranking with Cohere.

To enable reranking:

1. In the retrieval form, turn on the **Reranking** option.
2. Enter your Cohere API key.

For more information, see the [Cohere documentation](https://dashboard.cohere.com/api-keys).

## What's next

- [RAG ingestion](./ingestion.md) — Configure scheduled ingestion for your vector store.
- [RAG service](./service.md) — Use the service API to retrieve chunks programmatically.
- [Managed vector databases](./vector-databases.md) — Provision the vector database used for retrieval.

