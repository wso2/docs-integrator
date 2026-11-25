---
sidebar_position: 0
sidebar_label: Overview
title: Knowledge Bases
description: Understand managed Knowledge Bases, their resources, and how they support retrieval-augmented generation on Choreo Integration.
keywords: [choreo integrator, choreo cloud, knowledge base, rag, vector store, embedding model, chunking, data source, kb service]
slug: /manage/managed-ai-services/knowledge-bases
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Knowledge Bases

A **Knowledge Base** is a managed resource for indexing and retrieving your organization's content. It gives integrations and AI agents a consistent way to find relevant information without coupling them to a particular vector database or ingestion source.

Each Knowledge Base brings the following resources together:

| Resource | Purpose |
| --- | --- |
| **Vector store** | Stores embeddings and performs similarity searches. |
| **Embedding model** | Converts source content and queries into vectors that can be compared. |
| **Chunking** | Splits large files into segments before they're embedded. |
| **Data source** | Imports files from Google Drive or Amazon S3, either once or on a schedule. |
| **KB service** | Provides the service URL used to retrieve content from the Knowledge Base. |

Choreo Cloud manages these resources as a unit. You configure the retrieval behavior once, optionally attach a data source, and connect integrations or applications through the generated KB service.

## Supported resources

### Vector stores

| Provider | Configuration required |
| --- | --- |
| **Pinecone** | API key and index name |
| **Chroma** | Host, port (default `8000`), and collection name |
| **Weaviate** | Cluster REST URL, API key, and collection name |
| **PostgreSQL** | Bring your own PostgreSQL database with the pgvector extension |

### Embedding and chunking

- **Embedding providers:** OpenAI (`text-embedding-3-small`, `text-embedding-3-large`, `text-embedding-ada-002`), Azure OpenAI, and Mistral AI.
- **Chunking strategies:** Recursive (default), Sentence, and Character.
- **Chunking controls:** Max segment size (default `1000`) and max overlap size (default `200`).

### Data sources

- **Google Drive:** Connect with an API key, or with OAuth (client ID, client secret, refresh token), and select a folder.
- **Amazon S3:** Connect with an access key ID and secret access key, and select a bucket.

A Knowledge Base can also be created with no data source at all, and have one added later.

## Knowledge Base lifecycle

Use **AI Services** > **Knowledge Bases** to view all Knowledge Bases in the organization. The list shows each one's vector store, embedding model, number of data sources, and status.

<ThemedImage
    alt="Knowledge bases list showing a Product FAQ knowledge base with its vector store, embedding model, data source count, and Active status"
    sources={{
        light: useBaseUrl('/img/manage/cloud/knowledge-bases/knowledge-base-list.png'),
        dark: useBaseUrl('/img/manage/cloud/knowledge-bases/knowledge-base-list.png'),
    }}
/>

## What's next

- [Create a Knowledge Base](./create-knowledge-base.md) and optionally attach its first data source.
- [Add data sources](./add-data-sources.md) to ingest content from Google Drive or Amazon S3.
- [Manage a Knowledge Base](./manage-knowledge-base.md): its configuration, connection details, and retrieval testing.

{/* TODO(v3): this doc covers only the AI Services > Knowledge Bases console feature.
    The editor-side RAG building blocks (chunkers, data loaders, embedding
    providers, and vector store nodes in Choreo Integrator / Agent Builder
    canvases, and how to connect a canvas to one of these knowledge bases)
    were removed in the v3 cut and are out of scope here - re-verify and
    restore separately if needed. */}
