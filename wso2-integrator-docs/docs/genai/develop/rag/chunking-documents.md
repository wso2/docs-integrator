---
sidebar_position: 1
title: Chunking Documents
description: Split documents into searchable chunks using fixed-size, paragraph, sentence, semantic, and recursive strategies.
---

# Chunking Documents

Chunking determines how your documents are divided into searchable units for a RAG pipeline. The strategy you choose directly impacts retrieval quality -- the right chunks mean the LLM gets exactly the context it needs.

## Chunking Strategies

### Fixed-Size Chunking

Split text into chunks of a fixed token or character count. Simple and predictable.

```ballerina
import ballerinax/ai.rag;

rag:ChunkConfig fixedConfig = {
    strategy: rag:FIXED_SIZE,
    maxChunkSize: 500,     // 500 tokens per chunk
    overlap: 50            // 50-token overlap between chunks
};

string[] chunks = check rag:chunk(documentText, fixedConfig);
```

**Overlap** ensures that information at chunk boundaries is not lost. A sentence split between two chunks appears in both.

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

Group semantically related sentences together by measuring embedding similarity between consecutive sentences. Produces more coherent chunks than fixed-size splitting.

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

## Contextual Chunking

Prepend document-level context to each chunk to improve retrieval quality.

```ballerina
function contextualChunk(string document, string title, string summary) returns string[]|error {
    string[] rawChunks = check rag:chunk(document, paragraphConfig);

    return from string chunk in rawChunks
        select string `Document: ${title}
            Summary: ${summary}
            ---
            ${chunk}`;
}
```

This technique helps the embedding model understand the broader context of each chunk, leading to better retrieval for ambiguous queries.

## What's Next

- [Generating Embeddings](/docs/genai/develop/rag/generating-embeddings) -- Convert chunks to vector embeddings
- [Connecting to Vector Databases](/docs/genai/develop/rag/connecting-vector-dbs) -- Store and query your embeddings
- [RAG Querying](/docs/genai/develop/rag/rag-querying) -- Build the complete query pipeline
