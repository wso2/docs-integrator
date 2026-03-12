---
sidebar_position: 4
title: Chunking & Embedding Strategies
description: Optimize how documents are split into chunks and converted to vector embeddings for RAG.
---

# Chunking & Embedding Strategies

Chunking and embedding are the two steps that most directly impact your RAG system's retrieval quality. Chunking determines how content is divided into searchable units. Embedding determines how those units are represented in vector space.

Getting these right means the difference between retrieving exactly the right context and getting irrelevant or partial results.

## Chunking Strategies

### Fixed-Size Chunking

Split text into chunks of a fixed token or character count. Simple and predictable.

```ballerina
import ballerinax/ai.rag;

// Fixed-size chunks with overlap
rag:ChunkConfig fixedConfig = {
    strategy: rag:FIXED_SIZE,
    maxChunkSize: 500,     // 500 tokens per chunk
    overlap: 50            // 50-token overlap between chunks
};

string[] chunks = check rag:chunk(documentText, fixedConfig);
```

**Overlap** ensures that information at chunk boundaries isn't lost. A sentence split between two chunks appears in both.

| Parameter | Recommendation | Notes |
|-----------|---------------|-------|
| `maxChunkSize` | 300-500 tokens | Smaller for precise retrieval, larger for more context |
| `overlap` | 10-20% of chunk size | Too much wastes space; too little misses boundary content |

### Paragraph-Based Chunking

Split at natural paragraph boundaries. Preserves the document's logical structure.

```ballerina
rag:ChunkConfig paragraphConfig = {
    strategy: rag:PARAGRAPH,
    maxChunkSize: 500,
    overlap: 50,
    preserveHeadings: true  // Include the nearest heading in each chunk
};

string[] chunks = check rag:chunk(documentText, paragraphConfig);
// Each chunk corresponds to one or more paragraphs
// Headings are prepended for context
```

When `preserveHeadings` is enabled, each chunk includes its section heading:

```
Chunk 1: "## Return Policy\nItems may be returned within 30 days of delivery..."
Chunk 2: "## Return Policy\nRefunds are processed within 5-7 business days..."
```

### Sentence-Based Chunking

Split at sentence boundaries and group sentences up to the chunk size limit.

```ballerina
rag:ChunkConfig sentenceConfig = {
    strategy: rag:SENTENCE,
    maxChunkSize: 300,
    minChunkSize: 100,  // Don't create tiny chunks
    overlap: 1          // Overlap by 1 sentence
};
```

### Semantic Chunking

Group semantically related sentences together by measuring embedding similarity between consecutive sentences. Produces chunks that are more coherent than fixed-size splitting.

```ballerina
rag:ChunkConfig semanticConfig = {
    strategy: rag:SEMANTIC,
    maxChunkSize: 500,
    similarityThreshold: 0.7,  // Split when similarity drops below this
    embeddingModel: {
        provider: "openai",
        model: "text-embedding-3-small",
        apiKey: openAiApiKey
    }
};

string[] chunks = check rag:chunk(documentText, semanticConfig);
```

Semantic chunking is more expensive (it requires embedding calls during chunking) but produces higher-quality chunks, especially for documents that cover multiple topics.

### Recursive Chunking

Try multiple splitting strategies in order of preference. First try to split by headings, then paragraphs, then sentences, then fixed-size as a fallback.

```ballerina
rag:ChunkConfig recursiveConfig = {
    strategy: rag:RECURSIVE,
    maxChunkSize: 500,
    separators: ["\n## ", "\n\n", "\n", ". "],  // Try each in order
    overlap: 50
};
```

## Choosing a Chunking Strategy

| Strategy | Quality | Cost | Best For |
|----------|---------|------|----------|
| **Fixed-size** | Medium | Low | Uniform content, quick prototyping |
| **Paragraph** | Good | Low | Structured documents with clear paragraphs |
| **Sentence** | Good | Low | Content where individual facts matter |
| **Semantic** | Best | High | Mixed-topic documents, highest quality needs |
| **Recursive** | Good | Low | Documents with varying structure |

## Embedding Models

### OpenAI Embeddings

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

### Cohere Embeddings

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

### Google Vertex AI Embeddings

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

## Embedding Model Comparison

| Model | Provider | Dimensions | Quality | Cost per 1M tokens |
|-------|----------|------------|---------|---------------------|
| `text-embedding-3-small` | OpenAI | 1536 | Good | $0.02 |
| `text-embedding-3-large` | OpenAI | 3072 | Best | $0.13 |
| `embed-english-v3.0` | Cohere | 1024 | Good | $0.10 |
| `text-embedding-004` | Google | 768 | Good | $0.025 |

### Dimension Reduction

Some models support reduced dimensions for faster search with slightly lower quality.

```ballerina
// Reduce OpenAI embedding dimensions for faster search
embeddings:EmbeddingResponse response = check openaiEmbeddings->createEmbedding({
    model: "text-embedding-3-large",
    input: texts,
    dimensions: 1024  // Reduce from 3072 to 1024
});
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

## Advanced: Contextual Chunking

Prepend document-level context to each chunk to improve retrieval quality.

```ballerina
function contextualChunk(string document, string title, string summary) returns string[]|error {
    string[] rawChunks = check rag:chunk(document, paragraphConfig);

    // Prepend document context to each chunk
    return from string chunk in rawChunks
        select string `Document: ${title}
            Summary: ${summary}
            ---
            ${chunk}`;
}
```

This technique helps the embedding model understand the broader context of each chunk, leading to better retrieval for ambiguous queries.

## What's Next

- [Building a RAG Service](building-rag-service.md) — Assemble a complete RAG service
- [Document Ingestion](document-ingestion.md) — Build ingestion pipelines for various formats
- [Vector Databases](vector-databases.md) — Store and query your embeddings
- [Managing Context Windows](/docs/genai/llm-connectivity/managing-context-windows) — Optimize how retrieved chunks fit in the LLM prompt
