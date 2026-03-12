---
sidebar_position: 4
title: RAG Querying
description: Build the complete RAG query pipeline -- embed queries, retrieve context, and generate grounded answers.
---

# RAG Querying

The query pipeline is the runtime half of your RAG system. When a user asks a question, the pipeline embeds the query, searches for relevant chunks, assembles context, and generates a grounded answer. This page covers how to build a production-ready query pipeline end-to-end.

## Query Pipeline Overview

```
User Question --> Embed Query --> Vector Search --> Top-K Chunks --> LLM + Context --> Answer
```

## Complete RAG Service

### Configuration

```ballerina
configurable string openAiApiKey = ?;
configurable string chromaDbUrl = "http://localhost:8000";
configurable string collectionName = "knowledge_base";
configurable string embeddingModel = "text-embedding-3-small";
configurable string generationModel = "gpt-4o";
configurable int retrievalTopK = 5;
configurable float similarityThreshold = 0.7;
```

### Retrieval

```ballerina
import ballerinax/chromadb;

final chromadb:Client chromaClient = check new ({url: chromaDbUrl});
final chromadb:Collection collection = check chromaClient.getOrCreateCollection(
    collectionName,
    metadata = {"hnsw:space": "cosine"}
);

function searchSimilar(string query, int topK) returns RetrievedChunk[]|error {
    float[] queryVector = check generateEmbedding(query);

    chromadb:QueryResult results = check collection.query(
        queryEmbeddings = [queryVector],
        nResults = topK
    );

    RetrievedChunk[] chunks = [];
    if results.documents is string[][] && results.distances is float[][] {
        string[][] docs = <string[][]>results.documents;
        float[][] distances = <float[][]>results.distances;

        foreach int i in 0 ..< docs[0].length() {
            float similarity = 1.0 - distances[0][i];
            if similarity >= similarityThreshold {
                chunks.push({
                    text: docs[0][i],
                    similarity: similarity,
                    metadata: {}
                });
            }
        }
    }
    return chunks;
}

type RetrievedChunk record {|
    string text;
    float similarity;
    json metadata;
|};
```

### Generation

```ballerina
import ballerinax/openai.chat;

final chat:Client chatClient = check new ({auth: {token: openAiApiKey}});

function generateAnswer(string question, RetrievedChunk[] context) returns GeneratedAnswer|error {
    string contextBlock = "";
    string[] sources = [];
    foreach int i in 0 ..< context.length() {
        contextBlock += string `[Source ${i + 1}]: ${context[i].text}` + "\n\n";
    }

    chat:ChatCompletionResponse completion = check chatClient->createChatCompletion({
        model: generationModel,
        messages: [
            {
                role: "system",
                content: string `You are a knowledgeable assistant that answers questions based on provided context.

Rules:
- Base your answer ONLY on the provided context.
- If the context doesn't contain enough information, say so clearly.
- Reference specific sources when possible.
- Be concise and accurate.

Context:
${contextBlock}`
            },
            {role: "user", content: question}
        ],
        temperature: 0.2
    });

    string answer = completion.choices[0].message.content ?: "Unable to generate a response.";
    return {answer, sources, chunksUsed: context.length(), tokensUsed: completion.usage?.total_tokens ?: 0};
}

type GeneratedAnswer record {|
    string answer;
    string[] sources;
    int chunksUsed;
    int tokensUsed;
|};
```

### HTTP Service

```ballerina
import ballerina/http;

service /rag on new http:Listener(8090) {

    resource function post ingest(@http:Payload IngestRequest request)
            returns IngestResponse|error {
        DocumentChunk[] chunks = check chunkDocument(request.content, request.sourceId);
        check storeChunks(chunks);
        return {sourceId: request.sourceId, chunksCreated: chunks.length(), status: "ingested"};
    }

    resource function post query(@http:Payload QueryRequest request)
            returns QueryResponse|error {
        RetrievedChunk[] context = check searchSimilar(request.question, retrievalTopK);

        if context.length() == 0 {
            return {
                answer: "I couldn't find any relevant information to answer your question.",
                sources: [],
                chunksUsed: 0,
                tokensUsed: 0,
                confidence: 0.0
            };
        }

        GeneratedAnswer generated = check generateAnswer(request.question, context);

        float avgSimilarity = 0.0;
        foreach RetrievedChunk chunk in context {
            avgSimilarity += chunk.similarity;
        }
        avgSimilarity = avgSimilarity / <float>context.length();

        return {
            answer: generated.answer,
            sources: generated.sources,
            chunksUsed: generated.chunksUsed,
            tokensUsed: generated.tokensUsed,
            confidence: avgSimilarity
        };
    }
}
```

## Testing the Pipeline

```bash
# Ingest a document
curl -X POST http://localhost:8090/rag/ingest \
  -H "Content-Type: application/json" \
  -d '{"sourceId": "return-policy", "content": "Items may be returned within 30 days..."}'

# Query the knowledge base
curl -X POST http://localhost:8090/rag/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the return policy?"}'
```

## What's Next

- [Chunking Documents](/docs/genai/develop/rag/chunking-documents) -- Chunking strategies for RAG
- [Generating Embeddings](/docs/genai/develop/rag/generating-embeddings) -- Embedding model selection
- [Connecting to Vector Databases](/docs/genai/develop/rag/connecting-vector-dbs) -- Vector store setup
- [What is RAG?](/docs/genai/key-concepts/what-is-rag) -- Conceptual overview
