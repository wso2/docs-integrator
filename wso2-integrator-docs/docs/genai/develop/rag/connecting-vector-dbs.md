---
sidebar_position: 3
title: Connecting to Vector Databases
description: Connect to ChromaDB, Pinecone, Weaviate, pgvector, and Qdrant for storing and querying embeddings.
---

# Connecting to Vector Databases

Vector databases store and index high-dimensional embeddings for fast similarity search. They are the backbone of any RAG pipeline, enabling your application to find relevant document chunks in milliseconds.

## Supported Vector Databases

| Database | Type | Transport | Best For |
|----------|------|-----------|----------|
| **ChromaDB** | Open source | HTTP | Development, prototyping |
| **Pinecone** | Managed SaaS | HTTP | Production, zero-ops |
| **Weaviate** | Open source / SaaS | HTTP/gRPC | Flexible schemas, hybrid search |
| **pgvector** | PostgreSQL extension | SQL | Existing Postgres infrastructure |
| **Qdrant** | Open source / SaaS | HTTP/gRPC | High-performance workloads |

## ChromaDB

An open-source embedding database ideal for development and small-to-medium production workloads.

```bash
docker run -d --name chromadb -p 8000:8000 chromadb/chroma:latest
```

```ballerina
import ballerinax/chromadb;

final chromadb:Client chromaClient = check new ({
    url: "http://localhost:8000"
});

chromadb:Collection collection = check chromaClient.getOrCreateCollection(
    "product_docs",
    metadata = {"hnsw:space": "cosine"}
);

// Add documents with embeddings
check collection.add(
    ids = ["doc-1", "doc-2"],
    documents = ["First document text", "Second document text"],
    embeddings = [embedding1, embedding2],
    metadatas = [{"source": "guide"}, {"source": "faq"}]
);

// Query by embedding vector
chromadb:QueryResult results = check collection.query(
    queryEmbeddings = [queryEmbedding],
    nResults = 5,
    where = {"source": "guide"}
);
```

## Pinecone

A fully managed vector database service with built-in scaling.

```ballerina
import ballerinax/pinecone;

final pinecone:Client pineconeClient = check new ({
    apiKey: pineconeApiKey,
    environment: "us-east-1-aws"
});

final pinecone:Index productIndex = check pineconeClient.index("product-docs");

// Upsert vectors
check productIndex.upsert([
    {
        id: "doc-1",
        values: embedding1,
        metadata: {"source": "guide", "section": "returns"}
    }
]);

// Query with metadata filtering
pinecone:QueryResult results = check productIndex.query({
    vector: queryEmbedding,
    topK: 5,
    filter: {"source": {"$eq": "guide"}},
    includeMetadata: true
});
```

## Weaviate

An open-source vector database with built-in hybrid search (vector plus keyword).

```ballerina
import ballerinax/weaviate;

final weaviate:Client weaviateClient = check new ({
    url: "http://localhost:8080",
    apiKey: weaviateApiKey
});

// Hybrid search (vector + keyword)
weaviate:SearchResult results = check weaviateClient.hybridSearch(
    "Document",
    {
        query: "return policy",
        vector: queryEmbedding,
        alpha: 0.75,  // 0.75 vector weight, 0.25 keyword weight
        'limit: 5
    }
);
```

## pgvector (PostgreSQL)

Use your existing PostgreSQL database for vector storage and search.

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    source VARCHAR(255),
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
```

```ballerina
import ballerinax/postgresql;
import ballerina/sql;

final postgresql:Client pgClient = check new (
    host = dbHost, port = dbPort, database = dbName,
    user = dbUser, password = dbPassword
);

function searchSimilar(float[] queryEmbedding, int topK = 5) returns DocumentChunk[]|error {
    string vectorStr = string `[${string:'join(",", ...from float v in queryEmbedding select v.toString())}]`;
    stream<DocumentChunk, sql:Error?> resultStream = pgClient->query(
        `SELECT id, content, source,
                1 - (embedding <=> ${vectorStr}::vector) AS similarity
         FROM document_chunks
         ORDER BY embedding <=> ${vectorStr}::vector
         LIMIT ${topK}`
    );
    return from DocumentChunk chunk in resultStream select chunk;
}
```

## Choosing a Vector Database

| Factor | ChromaDB | Pinecone | Weaviate | pgvector | Qdrant |
|--------|----------|----------|----------|----------|--------|
| **Setup** | Easy (Docker) | Managed | Medium | SQL extension | Easy (Docker) |
| **Scaling** | Manual | Automatic | Manual/Managed | Manual | Manual/Managed |
| **Hybrid search** | No | No | Yes | With tsvector | Yes |
| **Metadata filtering** | Yes | Yes | Yes | SQL WHERE | Yes |
| **Cost** | Free | Pay-per-use | Free/Pay | Free | Free/Pay |
| **Best for** | Dev/small | Production | Flexible | Existing Postgres | Performance |

## What's Next

- [Chunking Documents](/docs/genai/develop/rag/chunking-documents) -- Chunking strategies for RAG
- [Generating Embeddings](/docs/genai/develop/rag/generating-embeddings) -- Embedding model selection
- [RAG Querying](/docs/genai/develop/rag/rag-querying) -- Build the complete query pipeline
