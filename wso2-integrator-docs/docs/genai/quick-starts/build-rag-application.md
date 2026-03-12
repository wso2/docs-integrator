---
sidebar_position: 2
title: "Quick Start: Build a RAG Application"
description: Build a retrieval-augmented generation application with vector search in under 15 minutes.
---

# Build a RAG Application

**Time:** Under 15 minutes. **What you'll build:** A RAG service that ingests documents, stores embeddings in a vector database, and answers questions grounded in your own data.

Retrieval-Augmented Generation (RAG) lets you combine the reasoning power of LLMs with the accuracy of your own documents. Instead of relying solely on the model's training data, the system retrieves relevant content before generating a response.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An API key for an LLM provider (OpenAI, Anthropic, or Google)
- A vector database instance (this guide uses ChromaDB; [Docker setup](#chromadb-docker-setup) included)

## What You'll Build

A knowledge base service that:
- Ingests text documents and generates vector embeddings
- Stores embeddings in ChromaDB for fast similarity search
- Answers user questions by retrieving relevant document chunks and passing them to an LLM

## ChromaDB Docker Setup

Start a local ChromaDB instance for development:

```bash
docker run -d --name chromadb -p 8000:8000 chromadb/chroma:latest
```

## Step 1: Set Up Dependencies

```ballerina
// Ballerina.toml
[package]
org = "myorg"
name = "rag_knowledge_base"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.agent"
version = "0.8.0"

[[dependency]]
org = "ballerinax"
name = "openai.chat"
version = "1.0.0"

[[dependency]]
org = "ballerinax"
name = "openai.embeddings"
version = "1.0.0"

[[dependency]]
org = "ballerinax"
name = "chromadb"
version = "0.5.0"
```

## Step 2: Configure the Embedding Model and Vector Store

Set up the embedding model to convert text into vectors and the vector store for persistence.

```ballerina
import ballerinax/openai.embeddings;
import ballerinax/chromadb;

configurable string openAiApiKey = ?;
configurable string chromaDbUrl = "http://localhost:8000";

final embeddings:Client embeddingClient = check new ({
    auth: {token: openAiApiKey}
});

final chromadb:Client vectorStore = check new ({
    url: chromaDbUrl
});

// Create or get the collection for our knowledge base
final chromadb:Collection knowledgeBase = check vectorStore.getOrCreateCollection("product_docs");
```

## Step 3: Build the Document Ingestion Pipeline

Create a function that chunks documents, generates embeddings, and stores them.

```ballerina
import ballerina/lang.array;

type DocumentChunk record {|
    string id;
    string text;
    string source;
|};

function ingestDocument(string content, string sourceId) returns error? {
    // Split content into chunks (simple strategy: split by paragraphs)
    string[] paragraphs = re `\n\n`.split(content);

    DocumentChunk[] chunks = [];
    foreach int i in 0 ..< paragraphs.length() {
        if paragraphs[i].trim().length() > 0 {
            chunks.push({
                id: string `${sourceId}-chunk-${i}`,
                text: paragraphs[i].trim(),
                source: sourceId
            });
        }
    }

    // Generate embeddings for all chunks
    string[] texts = from DocumentChunk chunk in chunks select chunk.text;
    embeddings:EmbeddingResponse embeddingResponse = check embeddingClient->createEmbedding({
        model: "text-embedding-3-small",
        input: texts
    });

    // Store chunks with their embeddings in the vector database
    string[] ids = from DocumentChunk chunk in chunks select chunk.id;
    float[][] vectors = from var item in embeddingResponse.data
        order by item.index ascending
        select item.embedding;

    check knowledgeBase.add(
        ids = ids,
        documents = texts,
        embeddings = vectors,
        metadatas = from DocumentChunk chunk in chunks
            select {"source": chunk.source}
    );
}
```

## Step 4: Build the Retrieval and Generation Service

Create an HTTP service that retrieves relevant chunks and generates answers.

```ballerina
import ballerina/http;
import ballerinax/openai.chat;

final chat:Client chatClient = check new ({auth: {token: openAiApiKey}});

service /rag on new http:Listener(8090) {

    // Ingest a new document
    resource function post ingest(@http:Payload IngestRequest request) returns json|error {
        check ingestDocument(request.content, request.sourceId);
        return {"status": "Document ingested successfully", "sourceId": request.sourceId};
    }

    // Query the knowledge base
    resource function post query(@http:Payload QueryRequest request) returns QueryResponse|error {
        // Generate embedding for the user's question
        embeddings:EmbeddingResponse queryEmbedding = check embeddingClient->createEmbedding({
            model: "text-embedding-3-small",
            input: [request.question]
        });

        // Search for the most relevant document chunks
        chromadb:QueryResult results = check knowledgeBase.query(
            queryEmbeddings = [queryEmbedding.data[0].embedding],
            nResults = 3
        );

        // Build context from retrieved chunks
        string context = "";
        if results.documents is string[][] {
            string[][] docs = <string[][]>results.documents;
            foreach string doc in docs[0] {
                context += doc + "\n\n";
            }
        }

        // Generate answer using the LLM with retrieved context
        chat:ChatCompletionResponse completion = check chatClient->createChatCompletion({
            model: "gpt-4o",
            messages: [
                {role: "system", content: string `Answer the user's question based on the following context.
                    If the context doesn't contain enough information, say so.

                    Context:
                    ${context}`},
                {role: "user", content: request.question}
            ]
        });

        string answer = completion.choices[0].message.content ?: "Unable to generate an answer.";
        return {answer, sourcesUsed: results.ids ?: []};
    }
}

type IngestRequest record {|
    string content;
    string sourceId;
|};

type QueryRequest record {|
    string question;
|};

type QueryResponse record {|
    string answer;
    string[][] sourcesUsed;
|};
```

## Step 5: Run and Test

1. Configure your API key in `Config.toml`:

```toml
openAiApiKey = "sk-your-api-key-here"
chromaDbUrl = "http://localhost:8000"
```

2. Run the service:

```bash
bal run
```

3. Ingest a document:

```bash
curl -X POST http://localhost:8090/rag/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "sourceId": "product-guide",
    "content": "Our wireless headphones feature 30-hour battery life and active noise cancellation. They support Bluetooth 5.3 and multipoint connection to two devices simultaneously.\n\nThe headphones come with a carrying case, USB-C charging cable, and 3.5mm audio cable for wired listening. Weight is 250 grams.\n\nWarranty covers manufacturing defects for 2 years. Battery degradation beyond 20% capacity within the first year qualifies for free replacement."
  }'
```

4. Query the knowledge base:

```bash
curl -X POST http://localhost:8090/rag/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the battery life and warranty on the headphones?"}'
```

The service retrieves the relevant document chunks and generates an answer grounded in your actual product documentation.

## How It Works

The RAG pipeline follows three stages:

1. **Ingest** — Documents are split into chunks, converted to vector embeddings, and stored in the vector database
2. **Retrieve** — When a question arrives, it is embedded and used to find the most similar document chunks via vector similarity search
3. **Generate** — The retrieved chunks are passed as context to the LLM, which generates a grounded answer

## What's Next

- [RAG Architecture Overview](/docs/genai/rag/architecture-overview) — Understand the full RAG pipeline design
- [Chunking & Embedding Strategies](/docs/genai/rag/chunking-embedding) — Optimize how you split and vectorize content
- [Vector Databases](/docs/genai/rag/vector-databases) — Connect to Pinecone, Weaviate, pgvector, and more
- [Expose Integrations as an MCP Server](expose-mcp-server.md) — Make your RAG service available to AI assistants
