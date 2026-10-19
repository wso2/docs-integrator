---
title: AI Building Blocks
---

# AI Building Blocks

Every AI feature in WSO2 Integrator, direct LLM calls, agents, RAG, and natural functions, is composed from the same small set of shared connections and stores. Configure one once, then reuse it wherever it's needed.

<PaletteCard icon="model-providers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers">
  <h3 class="palette-card-title">Model Providers</h3>
  <p class="palette-card-desc">Connect to the LLM behind every prompt: the Default WSO2 provider, OpenAI, Azure OpenAI, Anthropic, Google Vertex, Mistral, DeepSeek, Ollama, and OpenRouter.</p>

<PaletteCard icon="embedding-providers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/embedding-providers">
  <h3 class="palette-card-title">Embedding Providers</h3>
  <p class="palette-card-desc">Turn text into semantic vectors used on both ingest and query for similarity search.</p>

<PaletteCard icon="vector-stores" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/vector-stores">
  <h3 class="palette-card-title">Vector Stores</h3>
  <p class="palette-card-desc">Persist embeddings and run similarity search across In-Memory, Pinecone, pgvector, Weaviate, or Milvus.</p>

<PaletteCard icon="knowledge-bases" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/knowledge-bases">
  <h3 class="palette-card-title">Knowledge Bases</h3>
  <p class="palette-card-desc">The indexable document store RAG reads from and writes to, composed of a vector store, embedding provider, and chunker.</p>

<PaletteCard icon="chunkers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/chunkers">
  <h3 class="palette-card-title">Chunkers</h3>
  <p class="palette-card-desc">Split documents into chunks before embedding. Smaller chunks improve retrieval precision; larger chunks preserve more surrounding context.</p>

<PaletteCard icon="data-loaders" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/data-loaders">
  <h3 class="palette-card-title">Data Loaders</h3>
  <p class="palette-card-desc">Read source documents, such as text files or a Microsoft SharePoint library, into <code>ai:Document</code> values ready for chunking and ingestion.</p>

## What's next

- [RAG](../rag/rag.md) — Ground LLM responses in your own documents using these building blocks together
- [AI Agents](../agents/agents.md) — Use a model provider to power an agent's reasoning
- [Direct LLMs](../direct-llm/direct-llm.md) — Use a model provider directly, with no agent loop
