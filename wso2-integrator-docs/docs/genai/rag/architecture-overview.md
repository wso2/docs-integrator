---
sidebar_position: 1
title: RAG Architecture Overview
description: Understand the end-to-end architecture of retrieval-augmented generation pipelines in WSO2 Integrator.
---

# RAG Architecture Overview

Retrieval-Augmented Generation (RAG) combines the reasoning power of large language models with the accuracy of your own data. Instead of relying solely on the LLM's training data, a RAG pipeline retrieves relevant documents from a knowledge base and passes them as context to the model.

This page explains the full RAG architecture, its components, and how they fit together in WSO2 Integrator.

## Why RAG?

LLMs are powerful but have limitations:

- **Knowledge cutoff** — Training data has a fixed date; the model doesn't know about recent information
- **Hallucination** — Models can generate plausible-sounding but incorrect information
- **Domain specificity** — General-purpose models lack deep knowledge of your proprietary data

RAG addresses all three by grounding LLM responses in your actual documents, databases, and APIs.

## Architecture Overview

A RAG pipeline consists of two main phases: **ingestion** (offline) and **retrieval + generation** (online).

```
┌─────────────────── Ingestion (Offline) ───────────────────┐
│                                                            │
│  Documents   →   Chunking   →   Embedding   →   Vector DB │
│  (PDF, HTML,     (Split into    (Convert to     (Store     │
│   JSON, etc.)     passages)      vectors)        vectors)  │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌─────────── Retrieval + Generation (Online) ───────────────┐
│                                                            │
│  User Query  →  Embed Query  →  Vector Search  →  LLM     │
│                                  (Find top-k      (Generate│
│                                   similar          answer  │
│                                   chunks)          from    │
│                                                    context)│
└────────────────────────────────────────────────────────────┘
```

## Pipeline Components

### 1. Document Sources

RAG pipelines can ingest data from multiple sources:

| Source Type | Examples | WSO2 Integrator Support |
|-------------|----------|------------------------|
| Files | PDF, DOCX, TXT, Markdown | File connectors, FTP/SFTP |
| Web content | HTML pages, sitemaps | HTTP client |
| Databases | SQL, NoSQL records | Database connectors |
| APIs | REST, GraphQL responses | HTTP/GraphQL clients |
| Messaging | Kafka, RabbitMQ messages | Event handlers |

### 2. Chunking

Documents are split into smaller passages (chunks) that can be individually retrieved. The chunking strategy directly impacts retrieval quality.

```ballerina
import ballerinax/ai.rag;

// Split by paragraphs with overlap
rag:ChunkConfig paragraphChunking = {
    strategy: rag:PARAGRAPH,
    maxChunkSize: 500,    // Maximum tokens per chunk
    overlap: 50           // Token overlap between chunks
};

// Split by sentences with semantic boundaries
rag:ChunkConfig semanticChunking = {
    strategy: rag:SEMANTIC,
    maxChunkSize: 300,
    similarityThreshold: 0.7  // Group semantically related sentences
};
```

### 3. Embedding

Each chunk is converted into a vector (array of numbers) that captures its semantic meaning. Similar content produces similar vectors.

```ballerina
import ballerinax/openai.embeddings;

final embeddings:Client embeddingClient = check new ({
    auth: {token: openAiApiKey}
});

// Generate embedding for a text chunk
function embed(string text) returns float[]|error {
    embeddings:EmbeddingResponse response = check embeddingClient->createEmbedding({
        model: "text-embedding-3-small",
        input: [text]
    });
    return response.data[0].embedding;
}
```

### 4. Vector Database

Stores embeddings alongside the original text for fast similarity search. WSO2 Integrator supports multiple vector databases.

| Vector Database | Managed | Self-Hosted | Best For |
|----------------|---------|-------------|----------|
| Pinecone | Yes | No | Production SaaS |
| Weaviate | Yes | Yes | Flexible schemas |
| ChromaDB | No | Yes | Development, prototyping |
| pgvector | Yes | Yes | Existing PostgreSQL users |
| Qdrant | Yes | Yes | High-performance search |

### 5. Retrieval

When a user query arrives, it is embedded and compared against stored vectors to find the most relevant chunks.

```ballerina
function retrieveContext(string query, int topK = 3) returns string[]|error {
    // Embed the query
    float[] queryVector = check embed(query);

    // Search for similar chunks
    chromadb:QueryResult results = check collection.query(
        queryEmbeddings = [queryVector],
        nResults = topK
    );

    // Extract the document texts
    if results.documents is string[][] {
        return (<string[][]>results.documents)[0];
    }
    return [];
}
```

### 6. Generation

The retrieved chunks are assembled into a prompt context and passed to the LLM alongside the user's question.

```ballerina
function generateAnswer(string question, string[] context) returns string|error {
    string contextBlock = string:'join("\n\n---\n\n", ...context);

    chat:ChatCompletionResponse response = check chatClient->createChatCompletion({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: string `Answer the question based on the provided context.
                    If the context doesn't contain enough information, say so clearly.

                    Context:
                    ${contextBlock}`
            },
            {role: "user", content: question}
        ]
    });

    return response.choices[0].message.content ?: "Unable to generate a response.";
}
```

## RAG in WSO2 Integrator

WSO2 Integrator provides a high-level RAG API that encapsulates the entire pipeline:

```ballerina
import ballerinax/ai.rag;

// Configure the complete RAG pipeline
final rag:Pipeline ragPipeline = check new ({
    embeddingModel: {
        provider: "openai",
        model: "text-embedding-3-small",
        apiKey: openAiApiKey
    },
    vectorStore: {
        provider: "chromadb",
        url: "http://localhost:8000",
        collection: "knowledge_base"
    },
    generationModel: {
        provider: "openai",
        model: "gpt-4o",
        apiKey: openAiApiKey
    },
    chunking: {
        strategy: rag:PARAGRAPH,
        maxChunkSize: 500,
        overlap: 50
    },
    retrieval: {
        topK: 5,
        similarityThreshold: 0.7
    }
});

// Ingest a document
check ragPipeline.ingest("Product documentation content...", {source: "product-guide"});

// Query the knowledge base
rag:Response answer = check ragPipeline.query("What is the return policy?");
// answer.text, answer.sources, answer.confidence
```

## Design Considerations

### Chunk Size vs. Retrieval Quality

| Chunk Size | Pros | Cons |
|------------|------|------|
| Small (100-200 tokens) | Precise retrieval | May lose context |
| Medium (300-500 tokens) | Good balance | Standard choice |
| Large (500-1000 tokens) | Rich context per chunk | Less precise matching |

### Embedding Model Selection

| Model | Dimensions | Quality | Cost |
|-------|------------|---------|------|
| `text-embedding-3-small` | 1536 | Good | Low |
| `text-embedding-3-large` | 3072 | Best | Medium |
| `embed-english-v3.0` (Cohere) | 1024 | Good | Low |
| Vertex AI `text-embedding-004` | 768 | Good | Low |

### When to Use RAG vs. Fine-Tuning

| Approach | Best For | Data Requirements |
|----------|----------|-------------------|
| **RAG** | Dynamic knowledge, frequently updated data | Any amount of text |
| **Fine-tuning** | Changing model behavior or style | Curated training examples |
| **RAG + Fine-tuning** | Domain-specific behavior with dynamic knowledge | Both |

## What's Next

- [Vector Databases](vector-databases.md) — Connect to and configure vector stores
- [Document Ingestion](document-ingestion.md) — Build ingestion pipelines for various formats
- [Chunking & Embedding](chunking-embedding.md) — Optimize your chunking and embedding strategy
- [Building a RAG Service](building-rag-service.md) — End-to-end RAG service implementation
