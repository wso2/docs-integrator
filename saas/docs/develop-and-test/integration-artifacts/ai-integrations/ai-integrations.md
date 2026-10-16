---
title: AI Integrations Overview
---

# AI Integrations

WSO2 Integrator lets you build AI-powered integrations, including direct LLM calls, AI agents, RAG pipelines, MCP servers, natural functions, and voice agents.

<PaletteCard icon="ai-building-blocks" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks">
  <h3 class="palette-card-title">AI Building Blocks</h3>
  <p class="palette-card-desc">The shared connections and stores every AI feature is built from: model providers, embedding providers, vector stores, knowledge bases, chunkers, and data loaders.</p>

<PaletteCard icon="quickstart" href="/develop-and-test/integration-artifacts/ai-integrations/direct-llm">
  <h3 class="palette-card-title">Direct LLMs</h3>
  <p class="palette-card-desc">The simplest AI block. Add a generate node to a flow, write a prompt, and bind the response to a typed value in a single round-trip.</p>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/agents">
  <h3 class="palette-card-title">AI Agents</h3>
  <p class="palette-card-desc">Autonomous LLM-driven agents that reason over a system prompt, call tools, and keep memory across turns. Covers reusable definitions, multi-agent systems, gated tools, observability, and evaluations.</p>

<PaletteCard icon="rag" href="/develop-and-test/integration-artifacts/ai-integrations/rag">
  <h3 class="palette-card-title">Retrieval-Augmented Generation (RAG)</h3>
  <p class="palette-card-desc">Ground LLM responses in your own documents. Ingest documents into a knowledge base, then retrieve the relevant chunks at query time and inject them into the prompt.</p>

<PaletteCard icon="mcp" href="/develop-and-test/integration-artifacts/ai-integrations/mcp">
  <h3 class="palette-card-title">Model Context Protocol (MCP)</h3>
  <p class="palette-card-desc">Expose a service as MCP tools for AI assistants, or use tools from external MCP servers in your agents.</p>

<PaletteCard icon="natural-functions" href="/develop-and-test/integration-artifacts/ai-integrations/natural-functions">
  <h3 class="palette-card-title">Natural Functions</h3>
  <p class="palette-card-desc">Experimental. Write the function body in plain English. The LLM returns a value that conforms to your declared return type.</p>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/voice-agent">
  <h3 class="palette-card-title">Voice Agent</h3>
  <p class="palette-card-desc">Expose an AI agent over a voice channel. WSO2 Cloud handles speech-to-text and text-to-speech, so your service works only with text.</p>

## Getting started

- **[Build a Sentiment Analyzer](../../../guides/how-to-guides/build-a-sentiment-analyzer.md):** Your first AI integration with a direct LLM call.
- **[Build a Hotel Finder Agent](../../../guides/how-to-guides/build-a-hotel-finder-agent.md):** An agent with two custom tools and session-scoped memory.

## Tutorials

- **[Email Generator with Direct LLM](../../../guides/how-to-guides/email-generator-direct-llm.md)**
- **[Building an IT Helpdesk AI Agent with Persistent Memory](../../../guides/business-use-cases/it-helpdesk-chatbot.md)**
- **[Building an HR knowledge base with RAG](../../../guides/business-use-cases/building-hr-knowledge-base-rag.md)**
- **[Build a customer care agent with MCP](../../../guides/business-use-cases/building-a-customer-care-agent-mcp.md)**
- **[Customer review analyzer with Natural Function](../../../guides/business-use-cases/review-summarizer-natural-function.md)**
