---
sidebar_position: 2
title: Generating Embeddings
description: Convert text chunks into vector embeddings using OpenAI, Cohere, and Google Vertex AI embedding models.
---

# Generating Embeddings

Embeddings convert text chunks into numerical vectors that capture semantic meaning. Similar content produces similar vectors, enabling semantic search in your RAG pipeline. This page covers supported embedding models, batch processing, and dimension reduction.

## Supported Embedding Models

| Model | Provider | Dimensions | Quality | Cost per 1M tokens |
|-------|----------|------------|---------|---------------------|
| `text-embedding-3-small` | OpenAI | 1536 | Good | $0.02 |
| `text-embedding-3-large` | OpenAI | 3072 | Best | $0.13 |
| `embed-english-v3.0` | Cohere | 1024 | Good | $0.10 |
| `text-embedding-004` | Google | 768 | Good | $0.025 |

## OpenAI Embeddings

```ballerina
import ballerinax/openai.embeddings;

final embeddings:Client openaiEmbeddings = check new ({
    auth: {token: openAiApiKey}
});

// text-embedding-3-small: 1536 dimensions, good quality, low cost
function embedSmall(string[] texts) returns float[][]|error {
    embeddings:EmbeddingResponse response = check openaiEmbeddings->createEmbedding({
        model: "text-embedding-3-small",
        input: texts
    });
    return from var item in response.data
        order by item.index ascending
        select item.embedding;
}

// text-embedding-3-large: 3072 dimensions, best quality, higher cost
function embedLarge(string[] texts) returns float[][]|error {
    embeddings:EmbeddingResponse response = check openaiEmbeddings->createEmbedding({
        model: "text-embedding-3-large",
        input: texts
    });
    return from var item in response.data
        order by item.index ascending
        select item.embedding;
}
```

## Cohere Embeddings

```ballerina
import ballerinax/cohere;

final cohere:Client cohereClient = check new ({
    auth: {token: cohereApiKey}
});

function embedWithCohere(string[] texts) returns float[][]|error {
    cohere:EmbedResponse response = check cohereClient->embed({
        model: "embed-english-v3.0",
        texts: texts,
        inputType: "search_document"  // Use "search_query" for queries
    });
    return response.embeddings;
}
```

## Google Vertex AI Embeddings

```ballerina
import ballerinax/googleapis.vertexai;

final vertexai:Client vertexClient = check new ({
    auth: {token: gcpAccessToken},
    projectId: gcpProjectId,
    location: "us-central1"
});

function embedWithVertex(string[] texts) returns float[][]|error {
    vertexai:EmbeddingResponse response = check vertexClient->embedText({
        model: "text-embedding-004",
        instances: from string text in texts select {content: text}
    });
    return from var prediction in response.predictions
        select prediction.embeddings.values;
}
```

## Batch Embedding

Process large document sets efficiently by batching embedding requests.

```ballerina
function batchEmbed(string[] texts, int batchSize = 100) returns float[][]|error {
    float[][] allEmbeddings = [];

    int i = 0;
    while i < texts.length() {
        int end = int:min(i + batchSize, texts.length());
        string[] batch = texts.slice(i, end);

        float[][] batchEmbeddings = check embedSmall(batch);
        allEmbeddings.push(...batchEmbeddings);

        i = end;
    }

    return allEmbeddings;
}
```

## Dimension Reduction

Some models support reduced dimensions for faster search with slightly lower quality.

```ballerina
embeddings:EmbeddingResponse response = check openaiEmbeddings->createEmbedding({
    model: "text-embedding-3-large",
    input: texts,
    dimensions: 1024  // Reduce from 3072 to 1024
});
```

## What's Next

- [Chunking Documents](/docs/genai/develop/rag/chunking-documents) -- Chunking strategies for RAG
- [Connecting to Vector Databases](/docs/genai/develop/rag/connecting-vector-dbs) -- Store embeddings for search
- [RAG Querying](/docs/genai/develop/rag/rag-querying) -- Build the query pipeline
