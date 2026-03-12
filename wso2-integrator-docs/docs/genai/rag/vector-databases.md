---
sidebar_position: 2
title: Vector Database Connectivity
description: Connect to vector databases like Pinecone, Weaviate, ChromaDB, and pgvector for RAG applications.
---

# Vector Database Connectivity

Vector databases store and index high-dimensional embeddings for fast similarity search. They are the backbone of any RAG pipeline, enabling your application to find relevant document chunks in milliseconds.

WSO2 Integrator supports multiple vector databases through dedicated connectors. This page covers how to connect, configure, and use each one.

## Supported Vector Databases

| Database | Type | Transport | Best For |
|----------|------|-----------|----------|
| **ChromaDB** | Open source | HTTP | Development, prototyping |
| **Pinecone** | Managed SaaS | HTTP | Production, zero-ops |
| **Weaviate** | Open source / SaaS | HTTP/gRPC | Flexible schemas, hybrid search |
| **pgvector** | PostgreSQL extension | SQL | Existing Postgres infrastructure |
| **Qdrant** | Open source / SaaS | HTTP/gRPC | High-performance workloads |

## ChromaDB

An open-source embedding database that runs locally or in Docker. Ideal for development and small-to-medium production workloads.

### Setup

```bash
# Start ChromaDB locally
docker run -d --name chromadb -p 8000:8000 chromadb/chroma:latest
```

### Connection

```ballerina
import ballerinax/chromadb;

configurable string chromaDbUrl = "http://localhost:8000";

final chromadb:Client chromaClient = check new ({
    url: chromaDbUrl
});

// Create or get a collection
chromadb:Collection collection = check chromaClient.getOrCreateCollection(
    "product_docs",
    metadata = {"hnsw:space": "cosine"}  // Cosine similarity
);
```

### Operations

```ballerina
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
    where = {"source": "guide"}  // Optional metadata filter
);

// Update a document
check collection.update(
    ids = ["doc-1"],
    documents = ["Updated document text"],
    embeddings = [newEmbedding1]
);

// Delete documents
check collection.delete(ids = ["doc-1"]);
```

## Pinecone

A fully managed vector database service. No infrastructure to manage, with built-in scaling and high availability.

### Connection

```ballerina
import ballerinax/pinecone;

configurable string pineconeApiKey = ?;
configurable string pineconeEnvironment = "us-east-1-aws";

final pinecone:Client pineconeClient = check new ({
    apiKey: pineconeApiKey,
    environment: pineconeEnvironment
});

// Connect to an existing index
final pinecone:Index productIndex = check pineconeClient.index("product-docs");
```

### Operations

```ballerina
// Upsert vectors
check productIndex.upsert([
    {
        id: "doc-1",
        values: embedding1,
        metadata: {"source": "guide", "section": "returns"}
    },
    {
        id: "doc-2",
        values: embedding2,
        metadata: {"source": "faq", "section": "shipping"}
    }
]);

// Query with metadata filtering
pinecone:QueryResult results = check productIndex.query({
    vector: queryEmbedding,
    topK: 5,
    filter: {"source": {"$eq": "guide"}},
    includeMetadata: true
});

// Access results
foreach pinecone:Match match in results.matches {
    string id = match.id;
    float score = match.score;
    json metadata = match.metadata;
}
```

## Weaviate

An open-source vector database with built-in vectorization, hybrid search (vector + keyword), and a flexible schema system.

### Connection

```ballerina
import ballerinax/weaviate;

configurable string weaviateUrl = "http://localhost:8080";
configurable string? weaviateApiKey = ();

final weaviate:Client weaviateClient = check new ({
    url: weaviateUrl,
    apiKey: weaviateApiKey
});
```

### Schema and Operations

```ballerina
// Define a schema class
check weaviateClient.createClass({
    class: "Document",
    properties: [
        {name: "content", dataType: ["text"]},
        {name: "source", dataType: ["string"]},
        {name: "category", dataType: ["string"]}
    ],
    vectorizer: "none"  // We provide our own embeddings
});

// Add objects with embeddings
check weaviateClient.batchCreate("Document", [
    {
        properties: {"content": "Document text here", "source": "guide"},
        vector: embedding1
    }
]);

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

Use your existing PostgreSQL database for vector storage and search. Ideal when you want to keep your data in a familiar SQL environment.

### Setup

```sql
-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table with a vector column
CREATE TABLE document_chunks (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    source VARCHAR(255),
    embedding vector(1536),  -- Dimension matches your embedding model
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create an index for fast similarity search
CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
```

### Connection and Operations

```ballerina
import ballerinax/postgresql;
import ballerina/sql;

configurable string dbHost = "localhost";
configurable int dbPort = 5432;
configurable string dbName = "knowledge_base";
configurable string dbUser = ?;
configurable string dbPassword = ?;

final postgresql:Client pgClient = check new (
    host = dbHost, port = dbPort, database = dbName,
    user = dbUser, password = dbPassword
);

// Insert a document chunk with embedding
function insertChunk(string content, string source, float[] embedding) returns error? {
    string vectorStr = string `[${string:'join(",", ...from float v in embedding select v.toString())}]`;
    _ = check pgClient->execute(
        `INSERT INTO document_chunks (content, source, embedding)
         VALUES (${content}, ${source}, ${vectorStr}::vector)`
    );
}

// Query for similar chunks
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

type DocumentChunk record {|
    int id;
    string content;
    string source;
    float similarity;
|};
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

- [Document Ingestion](document-ingestion.md) — Build pipelines to populate your vector database
- [Chunking & Embedding](chunking-embedding.md) — Optimize how content is vectorized
- [Building a RAG Service](building-rag-service.md) — End-to-end RAG implementation
- [RAG Architecture Overview](architecture-overview.md) — Full pipeline design
