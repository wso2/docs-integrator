---
title: AI Integrations Overview
---

# AI Integrations

WSO2 Integrator lets you build AI-powered integrations, including direct LLM calls, RAG pipelines, AI agents, and MCP servers.

## Getting started

- **[Build a sentiment analyzer](getting-started/build-a-sentiment-analyzer.md)** — Your first AI integration with a direct LLM call
- **[Build a Hotel Finder Agent](getting-started/build-a-hotel-finder-agent.md)** — An agent with two custom tools and session-scoped memory

## Develop AI applications

- **[Direct LLM Calls](develop/direct-llm/overview.md)** — The simplest AI block: send a prompt and bind the response to a typed value, in a single round-trip
- **[RAG](develop/rag/overview.md)** — Retrieval Augmented Generation that grounds LLM responses in your own documents by retrieving relevant content at query time and injecting it into the prompt
- **[AI Agents](develop/agents/overview.md)** — Autonomous LLM-driven agents that reason over a system prompt, call tools, and maintain conversation state across turns
- **[MCP Integration](develop/mcp/overview.md)** — Expose your integrations as MCP tools for AI assistants, or use external MCP tools with your agents
- **[Natural Functions](develop/natural-functions/overview.md)** — (Experimental) Write the function body in plain English; the LLM returns a value that conforms to your declared return type
- **[Model Providers](develop/components/model-providers.md)** — Connect to OpenAI, Anthropic, Azure OpenAI, Google Vertex, Mistral, and others through one consistent interface
- **[Embedding Providers](develop/components/embedding-providers.md)** — Turn text into semantic vectors used on both ingest and query for similarity search
- **[Vector Stores](develop/components/vector-stores.md)** — Persist embeddings and run similarity search across In-Memory, Pinecone, pgvector, Weaviate, or Milvus vector databases
- **[Knowledge Bases](develop/components/knowledge-bases.md)** — The indexable document store RAG reads from and writes to, composed of a vector store, embedding provider, and chunker
- **[Chunkers](develop/components/chunkers.md)** — Split documents into chunks before embedding — smaller chunks improve retrieval precision; larger ones preserve more surrounding context

## Tutorials

- **[Email Generator with Direct LLM](tutorials/email-generator-direct-llm.md)**
- **[Customer review analyzer with Natural Function](tutorials/review-summarizer-natural-function.md)**
- **[Building an HR knowledge base with RAG](tutorials/building-hr-knowledge-base-rag.md)**
- **[Build a customer care agent with MCP](tutorials/building-a-customer-care-agent-mcp.md)**
- **[Building an IT Helpdesk AI Agent with Persistent Memory](tutorials/it-helpdesk-chatbot.md)**
