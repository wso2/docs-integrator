---
sidebar_position: 5
title: Build a RAG Service End-to-End
description: Assemble a complete retrieval-augmented generation service with ingestion, retrieval, and generation.
---

# Build a RAG Service End-to-End

This page walks you through building a complete, production-ready RAG service that ingests documents, retrieves relevant context, and generates grounded answers. It combines everything from the previous RAG pages into a single working service.

By the end, you will have a service that exposes endpoints for document ingestion and natural language queries against your knowledge base.

## Project Setup

```ballerina
// Ballerina.toml
[package]
org = "myorg"
name = "rag_service"
version = "1.0.0"

[build-options]
observabilityIncluded = true

[[dependency]]
org = "ballerinax"
name = "ai.rag"
version = "1.0.0"

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

## Configuration

```ballerina
// config.bal
configurable string openAiApiKey = ?;
configurable string chromaDbUrl = "http://localhost:8000";
configurable string collectionName = "knowledge_base";
configurable string embeddingModel = "text-embedding-3-small";
configurable string generationModel = "gpt-4o";
configurable int retrievalTopK = 5;
configurable float similarityThreshold = 0.7;
```

## Core Components

### Embedding Client

```ballerina
// embedding.bal
import ballerinax/openai.embeddings;

final embeddings:Client embeddingClient = check new ({
    auth: {token: openAiApiKey}
});

function generateEmbeddings(string[] texts) returns float[][]|error {
    embeddings:EmbeddingResponse response = check embeddingClient->createEmbedding({
        model: embeddingModel,
        input: texts
    });
    return from var item in response.data
        order by item.index ascending
        select item.embedding;
}

function generateEmbedding(string text) returns float[]|error {
    float[][] result = check generateEmbeddings([text]);
    return result[0];
}
```

### Vector Store

```ballerina
// vector_store.bal
import ballerinax/chromadb;

final chromadb:Client chromaClient = check new ({url: chromaDbUrl});
final chromadb:Collection collection = check chromaClient.getOrCreateCollection(
    collectionName,
    metadata = {"hnsw:space": "cosine"}
);

function storeChunks(DocumentChunk[] chunks) returns error? {
    string[] ids = from DocumentChunk c in chunks select c.id;
    string[] texts = from DocumentChunk c in chunks select c.text;
    json[] metadatas = from DocumentChunk c in chunks select c.metadata.toJson();

    float[][] vectors = check generateEmbeddings(texts);

    check collection.add(
        ids = ids,
        documents = texts,
        embeddings = vectors,
        metadatas = metadatas
    );
}

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
        json[][]? metadatas = results.metadatas;

        foreach int i in 0 ..< docs[0].length() {
            float similarity = 1.0 - distances[0][i];
            if similarity >= similarityThreshold {
                chunks.push({
                    text: docs[0][i],
                    similarity: similarity,
                    metadata: metadatas is json[][] ? metadatas[0][i] : {}
                });
            }
        }
    }
    return chunks;
}

type DocumentChunk record {|
    string id;
    string text;
    map<string> metadata;
|};

type RetrievedChunk record {|
    string text;
    float similarity;
    json metadata;
|};
```

### Chunking Engine

```ballerina
// chunking.bal
import ballerinax/ai.rag;

final rag:ChunkConfig chunkConfig = {
    strategy: rag:PARAGRAPH,
    maxChunkSize: 500,
    overlap: 50,
    preserveHeadings: true
};

function chunkDocument(string content, string sourceId) returns DocumentChunk[]|error {
    string[] rawChunks = check rag:chunk(content, chunkConfig);

    return from int i in 0 ..< rawChunks.length()
        where rawChunks[i].trim().length() > 0
        select {
            id: string `${sourceId}::chunk-${i}`,
            text: rawChunks[i].trim(),
            metadata: {
                "source": sourceId,
                "chunkIndex": i.toString(),
                "totalChunks": rawChunks.length().toString()
            }
        };
}
```

### Generation Engine

```ballerina
// generation.bal
import ballerinax/openai.chat;

final chat:Client chatClient = check new ({auth: {token: openAiApiKey}});

function generateAnswer(string question, RetrievedChunk[] context) returns GeneratedAnswer|error {
    // Build context block from retrieved chunks
    string contextBlock = "";
    string[] sources = [];
    foreach int i in 0 ..< context.length() {
        contextBlock += string `[Source ${i + 1}]: ${context[i].text}` + "\n\n";
        string source = (check context[i].metadata.source).toString();
        if sources.indexOf(source) is () {
            sources.push(source);
        }
    }

    chat:ChatCompletionResponse completion = check chatClient->createChatCompletion({
        model: generationModel,
        messages: [
            {
                role: "system",
                content: string `You are a knowledgeable assistant that answers questions based on provided context.

                    Rules:
                    - Base your answer ONLY on the provided context
                    - If the context doesn't contain enough information to answer, say so clearly
                    - Reference specific sources when possible (e.g., "According to Source 1...")
                    - Be concise and accurate

                    Context:
                    ${contextBlock}`
            },
            {role: "user", content: question}
        ],
        temperature: 0.2  // Low temperature for factual responses
    });

    string answer = completion.choices[0].message.content ?: "Unable to generate a response.";
    int tokensUsed = completion.usage?.total_tokens ?: 0;

    return {
        answer,
        sources,
        chunksUsed: context.length(),
        tokensUsed
    };
}

type GeneratedAnswer record {|
    string answer;
    string[] sources;
    int chunksUsed;
    int tokensUsed;
|};
```

## HTTP Service

```ballerina
// service.bal
import ballerina/http;
import ballerina/log;

service /rag on new http:Listener(8090) {

    // Ingest a document
    resource function post ingest(@http:Payload IngestRequest request)
            returns IngestResponse|http:BadRequest|error {
        if request.content.trim().length() == 0 {
            return <http:BadRequest>{body: {message: "Content cannot be empty"}};
        }

        // Chunk the document
        DocumentChunk[] chunks = check chunkDocument(request.content, request.sourceId);

        // Store chunks with embeddings
        check storeChunks(chunks);

        log:printInfo("Document ingested",
            sourceId = request.sourceId,
            chunks = chunks.length()
        );

        return {
            sourceId: request.sourceId,
            chunksCreated: chunks.length(),
            status: "ingested"
        };
    }

    // Query the knowledge base
    resource function post query(@http:Payload QueryRequest request)
            returns QueryResponse|http:BadRequest|error {
        if request.question.trim().length() == 0 {
            return <http:BadRequest>{body: {message: "Question cannot be empty"}};
        }

        // Retrieve relevant chunks
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

        // Generate answer from context
        GeneratedAnswer generated = check generateAnswer(request.question, context);

        // Calculate average similarity as a confidence proxy
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

    // Delete documents by source
    resource function delete documents/[string sourceId]() returns http:Ok|error {
        check collection.deleteByMetadata({"source": sourceId});
        return http:OK;
    }
}

type IngestRequest record {|
    string sourceId;
    string content;
|};

type IngestResponse record {|
    string sourceId;
    int chunksCreated;
    string status;
|};

type QueryRequest record {|
    string question;
|};

type QueryResponse record {|
    string answer;
    string[] sources;
    int chunksUsed;
    int tokensUsed;
    float confidence;
|};
```

## Testing the Service

```bash
# Start ChromaDB
docker run -d --name chromadb -p 8000:8000 chromadb/chroma:latest

# Run the service
bal run

# Ingest documents
curl -X POST http://localhost:8090/rag/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "sourceId": "return-policy",
    "content": "## Return Policy\n\nItems may be returned within 30 days of delivery in original condition.\n\n## Refund Processing\n\nRefunds are processed within 5-7 business days after we receive the returned item. The refund will be applied to your original payment method."
  }'

# Query
curl -X POST http://localhost:8090/rag/query \
  -H "Content-Type: application/json" \
  -d '{"question": "How long do I have to return an item and when will I get my refund?"}'
```

## What's Next

- [Input/Output Guardrails](/docs/genai/guardrails/input-output-guardrails) — Add validation to your RAG service
- [Performance Metrics](/docs/genai/agent-observability/performance-metrics) — Monitor retrieval and generation latency
- [RAG Knowledge Base Tutorial](/docs/genai/tutorials/rag-knowledge-base) — Extended tutorial with advanced patterns
- [Vector Databases](vector-databases.md) — Switch to a production vector database
