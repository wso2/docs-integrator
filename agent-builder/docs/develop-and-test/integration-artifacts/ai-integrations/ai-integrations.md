---
title: AI Integrations Overview
---

# AI Integrations

WSO2 Agent Builder lets you build AI agents and the agentic integrations around them, including agents with tools and memory, direct LLM calls, RAG pipelines, MCP servers, and voice agents.

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/agents">
  <h3 class="palette-card-title">AI Agents</h3>
  <p class="palette-card-desc">Autonomous LLM-driven agents that reason over a system prompt, call tools, and keep memory across turns. Covers reusable definitions, multi-agent systems, gated tools, observability, and evaluations.</p>

<PaletteCard icon="ai-building-blocks" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks">
  <h3 class="palette-card-title">AI Building Blocks</h3>
  <p class="palette-card-desc">The shared connections and stores every AI feature is built from: model providers, embedding providers, vector stores, knowledge bases, chunkers, and data loaders.</p>

<PaletteCard icon="rag" href="/develop-and-test/integration-artifacts/ai-integrations/rag">
  <h3 class="palette-card-title">Retrieval-Augmented Generation (RAG)</h3>
  <p class="palette-card-desc">Ground LLM responses in your own documents. Ingest documents into a knowledge base, then retrieve the relevant chunks at query time and inject them into the prompt.</p>

<PaletteCard icon="mcp" href="/develop-and-test/integration-artifacts/ai-integrations/mcp">
  <h3 class="palette-card-title">Model Context Protocol (MCP)</h3>
  <p class="palette-card-desc">Expose a service as MCP tools for AI assistants, or use tools from external MCP servers in your agents.</p>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/voice-agent">
  <h3 class="palette-card-title">Voice Agent</h3>
  <p class="palette-card-desc">Expose an AI agent over a voice channel. WSO2 Cloud handles speech-to-text and text-to-speech, so your service works only with text.</p>

## Getting started

- **[Build an AI Agent](../../../get-started/quickstarts/build-ai-agent.md):** Create your first agent and chat with it.
- **[Build a Sentiment Analyzer](../../../guides/how-to-guides/build-a-sentiment-analyzer.md):** Your first agentic integration with a direct LLM call.
- **[Build a Hotel Finder Agent](../../../guides/how-to-guides/build-a-hotel-finder-agent.md):** An agent with two custom tools and session-scoped memory.

## Tutorials

- **[Building an IT Helpdesk AI Agent with Persistent Memory](../../../guides/business-use-cases/it-helpdesk-chatbot.md)**
- **[Build a customer care agent with MCP](../../../guides/business-use-cases/building-a-customer-care-agent-mcp.md)**
