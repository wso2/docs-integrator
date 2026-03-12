---
sidebar_position: 2
title: "Tutorial: RAG Knowledge Base"
description: Build a RAG-powered knowledge base that answers questions from enterprise documents.
---

# Tutorial: RAG Knowledge Base

**Time:** 30 minutes | **Level:** Intermediate | **What you'll build:** A retrieval-augmented generation (RAG) application that indexes enterprise documents and answers questions using relevant context.

In this tutorial, you build a complete RAG pipeline: ingest documents, chunk and embed them, store vectors in a database, and serve a question-answering API that retrieves relevant context before generating answers. The result is a knowledge base that grounds LLM responses in your actual documents rather than relying on the model's training data.

## Prerequisites

- [WSO2 Integrator VS Code extension installed](/docs/get-started/install)
- An OpenAI API key (for embeddings and chat completion)
- A vector database (Pinecone, Weaviate, or ChromaDB)

## Architecture

```
Ingestion Pipeline:
Documents → Chunking → Embedding → Vector Database

Query Pipeline:
Question → Embed → Vector Search → Top-K Chunks → LLM + Context → Answer
```

## Step 1: Create the Project

```toml
# Ballerina.toml
[package]
org = "myorg"
name = "rag_knowledge_base"
version = "0.1.0"

[[dependency]]
org = "ballerinax"
name = "ai.provider.openai"

[[dependency]]
org = "ballerinax"
name = "pinecone"
```

```toml
# Config.toml
openaiKey = "<your-openai-api-key>"
pineconeApiKey = "<your-pinecone-api-key>"
pineconeHost = "https://your-index.svc.pinecone.io"
```

## Step 2: Define Data Types

```ballerina
// types.bal
type DocumentChunk record {|
    string id;
    string content;
    string source;
    int chunkIndex;
    int totalChunks;
|};

type SearchResult record {|
    string content;
    string source;
    float score;
|};

type KnowledgeBaseResponse record {|
    string answer;
    string[] sources;
    int chunksUsed;
|};
```

## Step 3: Build the Embedding Client

```ballerina
// embeddings.bal
import ballerinax/ai.provider.openai;

configurable string openaiKey = ?;

final openai:Client embeddingClient = check new ({
    auth: {token: openaiKey},
    model: "text-embedding-3-small"
});

function generateEmbedding(string text) returns float[]|error {
    openai:EmbeddingResponse response = check embeddingClient.createEmbedding(text);
    return response.embedding;
}

function generateEmbeddings(string[] texts) returns float[][]|error {
    return from string text in texts
        select check generateEmbedding(text);
}
```

## Step 4: Build the Chunking Pipeline

```ballerina
// chunking.bal
import ballerina/io;

function chunkDocument(string content, int maxChunkSize = 500, int overlap = 100) returns string[] {
    // Split on paragraph boundaries
    string[] paragraphs = re `\n\n+`.split(content);

    string[] chunks = [];
    string currentChunk = "";

    foreach string paragraph in paragraphs {
        if (currentChunk.length() + paragraph.length()) > maxChunkSize && currentChunk.length() > 0 {
            chunks.push(currentChunk.trim());
            // Keep overlap from the end of the previous chunk
            int overlapStart = currentChunk.length() > overlap
                ? currentChunk.length() - overlap : 0;
            currentChunk = currentChunk.substring(overlapStart) + "\n\n" + paragraph;
        } else {
            currentChunk = currentChunk.length() > 0
                ? currentChunk + "\n\n" + paragraph
                : paragraph;
        }
    }

    if currentChunk.trim().length() > 0 {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

function ingestFile(string filePath) returns DocumentChunk[]|error {
    string content = check io:fileReadString(filePath);
    string[] chunks = chunkDocument(content);

    DocumentChunk[] docChunks = [];
    foreach int i in 0 ..< chunks.length() {
        docChunks.push({
            id: string `${filePath}-chunk-${i}`,
            content: chunks[i],
            source: filePath,
            chunkIndex: i,
            totalChunks: chunks.length()
        });
    }
    return docChunks;
}
```

## Step 5: Build the Vector Store Client

```ballerina
// vectorstore.bal
import ballerinax/pinecone;

configurable string pineconeApiKey = ?;
configurable string pineconeHost = ?;

final pinecone:Client vectorDb = check new ({
    apiKey: pineconeApiKey,
    host: pineconeHost
});

function storeChunks(DocumentChunk[] chunks) returns error? {
    foreach DocumentChunk chunk in chunks {
        float[] embedding = check generateEmbedding(chunk.content);
        check vectorDb->upsert({
            id: chunk.id,
            values: embedding,
            metadata: {
                "content": chunk.content,
                "source": chunk.source,
                "chunkIndex": chunk.chunkIndex
            }
        });
    }
}

function searchSimilar(string query, int topK = 5) returns SearchResult[]|error {
    float[] queryEmbedding = check generateEmbedding(query);

    pinecone:QueryResponse response = check vectorDb->query({
        vector: queryEmbedding,
        topK: topK,
        includeMetadata: true
    });

    return from pinecone:Match match in response.matches
        select {
            content: <string>match.metadata["content"],
            source: <string>match.metadata["source"],
            score: match.score
        };
}
```

## Step 6: Build the Question-Answering Service

```ballerina
// service.bal
import ballerina/http;
import ballerinax/ai.provider.openai;

final openai:Client llmClient = check new ({
    auth: {token: openaiKey},
    model: "gpt-4o"
});

service /kb on new http:Listener(8090) {

    // Ingest a document
    resource function post ingest(@http:Payload record {|string filePath;|} request)
            returns record {|string message; int chunks;|}|error {
        DocumentChunk[] chunks = check ingestFile(request.filePath);
        check storeChunks(chunks);
        return {
            message: string `Successfully ingested '${request.filePath}'`,
            chunks: chunks.length()
        };
    }

    // Query the knowledge base
    resource function post query(@http:Payload record {|string question;|} request)
            returns KnowledgeBaseResponse|error {
        // 1. Search for relevant chunks
        SearchResult[] results = check searchSimilar(request.question, topK = 5);

        if results.length() == 0 {
            return {
                answer: "I don't have any relevant information in the knowledge base to answer that question.",
                sources: [],
                chunksUsed: 0
            };
        }

        // 2. Build context from retrieved chunks
        string context = "";
        foreach int i in 0 ..< results.length() {
            context += string `[Source: ${results[i].source}]\n${results[i].content}\n\n---\n\n`;
        }

        // 3. Generate answer grounded in context
        string answer = check llmClient.chatComplete([
            {
                role: "system",
                content: string `You are a knowledge base assistant. Answer questions using ONLY the provided context.

Rules:
- If the answer is not in the context, say "I don't have that information in the knowledge base."
- Cite the source document when referencing specific information.
- Be concise and accurate.
- Do not make up information beyond what is in the context.

Context:
${context}`
            },
            {role: "user", content: request.question}
        ]);

        // 4. Collect unique sources
        string[] sources = (from SearchResult r in results select r.source).distinct();

        return {answer, sources, chunksUsed: results.length()};
    }
}
```

## Step 7: Run and Test

1. Start the service:
   ```bash
   bal run
   ```

2. Ingest documents:
   ```bash
   curl -X POST http://localhost:8090/kb/ingest \
     -H "Content-Type: application/json" \
     -d '{"filePath": "/docs/product-manual.txt"}'

   curl -X POST http://localhost:8090/kb/ingest \
     -H "Content-Type: application/json" \
     -d '{"filePath": "/docs/return-policy.txt"}'
   ```

3. Query the knowledge base:
   ```bash
   curl -X POST http://localhost:8090/kb/query \
     -H "Content-Type: application/json" \
     -d '{"question": "What is the return policy for electronics?"}'

   curl -X POST http://localhost:8090/kb/query \
     -H "Content-Type: application/json" \
     -d '{"question": "How do I set up the wireless headphones?"}'
   ```

## Step 8: Integrate with an Agent

Connect the knowledge base to a chat agent as a tool.

```ballerina
import ballerinax/ai.agent;

@agent:Tool {
    name: "searchKnowledgeBase",
    description: "Search the product knowledge base for information about products, policies, and procedures. Use this when the customer asks a question that may be answered in the documentation."
}
isolated function searchKnowledgeBase(
    @agent:Param {description: "The question to search for in the knowledge base"} string question
) returns json|error {
    SearchResult[] results = check searchSimilar(question, topK = 3);
    return results.toJson();
}

// Add to your support agent alongside other tools
final agent:ChatAgent ragSupportAgent = check new (
    model: llmClient,
    systemPrompt: "You are a support assistant. Use the knowledge base to answer product and policy questions.",
    tools: [searchKnowledgeBase, getOrderStatus, createSupportTicket]
);
```

## What You Built

You now have a RAG-powered knowledge base that:
- Ingests documents by chunking and embedding them
- Stores vectors in a vector database for semantic search
- Answers questions grounded in your actual documents
- Cites sources so users can verify information
- Can be integrated with agents as a tool

## What's Next

- [Chunking & Embedding](/docs/genai/rag/chunking-embedding) -- Optimize chunking strategies
- [Vector Databases](/docs/genai/rag/vector-databases) -- Compare vector store options
- [AI Customer Support Agent](ai-customer-support.md) -- Combine RAG with a support agent
- [Multi-Agent Workflow](multi-agent-workflow.md) -- Add RAG to a multi-agent system
