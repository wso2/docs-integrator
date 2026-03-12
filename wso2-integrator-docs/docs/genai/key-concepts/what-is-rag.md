---
sidebar_position: 7
title: What is RAG?
description: Understand retrieval-augmented generation -- how to ground LLM responses in your own data.
---

# What is RAG?

Retrieval-Augmented Generation (RAG) combines the reasoning power of large language models with the accuracy of your own data. Instead of relying solely on the LLM's training data, a RAG pipeline retrieves relevant documents from a knowledge base and passes them as context to the model before generating a response.

## Why RAG?

LLMs have three key limitations that RAG addresses:

| Limitation | How RAG Solves It |
|------------|-------------------|
| **Knowledge cutoff** -- Training data has a fixed date | RAG retrieves up-to-date documents from your knowledge base |
| **Hallucination** -- Models can generate plausible but incorrect information | RAG grounds responses in actual documents |
| **Domain specificity** -- General models lack deep knowledge of your data | RAG provides your proprietary data as context |

## How RAG Works

A RAG pipeline has two phases: **ingestion** (offline) and **querying** (online).

### Ingestion: Preparing Your Data

Documents are split into chunks, converted to vector embeddings, and stored in a vector database.

```
Documents  -->  Chunking  -->  Embedding  -->  Vector Database
(PDF, HTML,    (Split into    (Convert to    (Store for
 JSON, etc.)    passages)      vectors)       similarity search)
```

### Querying: Answering Questions

When a user asks a question, it is embedded and compared against stored vectors to find relevant chunks, which are then passed to the LLM.

```
User Query  -->  Embed Query  -->  Vector Search  -->  LLM + Context  -->  Answer
                                  (Find similar      (Generate answer
                                   chunks)            from context)
```

## Key Concepts

### Chunking

Documents are split into smaller passages (chunks) that can be individually retrieved. Common strategies include:

- **Fixed-size** -- Split by token or character count
- **Paragraph-based** -- Split at natural paragraph boundaries
- **Semantic** -- Group semantically related sentences together

### Embedding

Each chunk is converted into a vector (an array of numbers) that captures its semantic meaning. Similar content produces similar vectors, enabling semantic search.

### Vector Databases

Specialized databases that store embeddings and perform fast similarity search. WSO2 Integrator supports ChromaDB, Pinecone, Weaviate, pgvector, and Qdrant.

### Retrieval

When a query arrives, it is embedded and compared against stored vectors to find the most relevant chunks (typically the top 3-5 matches).

### Generation

The retrieved chunks are assembled into a prompt context and passed to the LLM alongside the user's question. The LLM generates an answer grounded in the provided context.

## RAG in WSO2 Integrator

```ballerina
import ballerinax/ai.rag;

final rag:Pipeline ragPipeline = check new ({
    embeddingModel: {provider: "openai", model: "text-embedding-3-small", apiKey: openAiApiKey},
    vectorStore: {provider: "chromadb", url: "http://localhost:8000", collection: "knowledge_base"},
    generationModel: {provider: "openai", model: "gpt-4o", apiKey: openAiApiKey},
    chunking: {strategy: rag:PARAGRAPH, maxChunkSize: 500, overlap: 50}
});

// Ingest a document
check ragPipeline.ingest("Product documentation content...", {source: "product-guide"});

// Query the knowledge base
rag:Response answer = check ragPipeline.query("What is the return policy?");
```

## RAG vs. Fine-Tuning

| Approach | Best For | Data Requirements |
|----------|----------|-------------------|
| **RAG** | Dynamic knowledge, frequently updated data | Any amount of text |
| **Fine-tuning** | Changing model behavior or style | Curated training examples |
| **RAG + Fine-tuning** | Domain-specific behavior with dynamic knowledge | Both |

## What's Next

- [Chunking Documents](/docs/genai/develop/rag/chunking-documents) -- Chunking strategies for RAG
- [Generating Embeddings](/docs/genai/develop/rag/generating-embeddings) -- Embedding model selection
- [Connecting to Vector Databases](/docs/genai/develop/rag/connecting-vector-dbs) -- Vector store setup
- [RAG Querying](/docs/genai/develop/rag/rag-querying) -- Building the query pipeline
