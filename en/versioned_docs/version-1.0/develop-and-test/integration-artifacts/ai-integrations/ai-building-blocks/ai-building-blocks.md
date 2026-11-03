---
title: AI Building Blocks
description: The shared connections and stores every AI feature in WSO2 Agent Builder is built from -- model providers, embedding providers, vector stores, chunkers, and data loaders.
keywords: [wso2 agent builder, model provider, embedding provider, vector store, chunker, data loader, knowledge base, rag]
sidebar_label: Building Blocks
sidebar_position: 0
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks
hide_table_of_contents: true
wide_layout: true
---

# AI Building Blocks

Every AI feature in WSO2 Agent Builder, agents, direct LLM calls, and knowledge bases, is composed from the same small set of shared connections and stores. Configure one once, then reuse it wherever it's needed in your agentic integration.

<PaletteGrid>

<PaletteCard icon="model-providers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers">
  <h3 class="palette-card-title">Model Providers</h3>
  <p class="palette-card-desc">Connect to the LLM behind every prompt: the Default WSO2 provider, models from WSO2 Agent Manager, OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, Google Vertex, Mistral, DeepSeek, Ollama, and OpenRouter.</p>
</PaletteCard>

<PaletteCard icon="embedding-providers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/embedding-providers">
  <h3 class="palette-card-title">Embedding Providers</h3>
  <p class="palette-card-desc">Turn text into semantic vectors used on both ingest and query for similarity search.</p>
</PaletteCard>

<PaletteCard icon="vector-stores" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/vector-stores">
  <h3 class="palette-card-title">Vector Stores</h3>
  <p class="palette-card-desc">Persist embeddings and run similarity search across In-Memory, Pinecone, pgvector, Weaviate, or Milvus.</p>
</PaletteCard>

<PaletteCard icon="chunkers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/chunkers">
  <h3 class="palette-card-title">Chunkers</h3>
  <p class="palette-card-desc">Split documents into chunks before embedding. Smaller chunks improve retrieval precision; larger chunks preserve more surrounding context.</p>
</PaletteCard>

<PaletteCard icon="data-loaders" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/data-loaders">
  <h3 class="palette-card-title">Data Loaders</h3>
  <p class="palette-card-desc">Read source documents, such as text files or a Microsoft SharePoint library, into <code>ai:Document</code> values ready for chunking and ingestion.</p>
</PaletteCard>

</PaletteGrid>

## What's next

- [How Knowledge Bases Work](../knowledge-bases/how-knowledge-bases-work.md) — Combine these building blocks into a knowledge base that grounds agent responses in your own documents
- [AI Agents](../agents/agents.md) — Use a model provider to power an agent's reasoning
