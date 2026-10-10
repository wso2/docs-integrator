---
title: AI Integrations Overview
description: Build AI-powered integrations with WSO2 Integrator using direct LLM calls, RAG pipelines, AI agents, and MCP servers.
keywords: [wso2 integrator, genai, ai, llm, rag, agent, mcp, natural function, model provider, embedding, vector store, knowledge base]
sidebar_label: Overview
sidebar_position: 0
slug: /develop-and-test/integration-artifacts/ai-integrations
hide_table_of_contents: true
wide_layout: true
---

# AI Integrations

WSO2 Integrator lets you build AI-powered integrations, including direct LLM calls, RAG pipelines, AI agents, and MCP servers.

<PaletteGrid>

<PaletteCard icon="ai-building-blocks" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks">
  <h3 class="palette-card-title">AI Building Blocks</h3>
  <p class="palette-card-desc">The shared connections and stores every AI feature is built from: model providers, embedding providers, vector stores, knowledge bases, and chunkers.</p>
</PaletteCard>

<PaletteCard icon="quickstart" href="/develop-and-test/integration-artifacts/ai-integrations/direct-llm">
  <h3 class="palette-card-title">Direct LLMs</h3>
  <p class="palette-card-desc">The simplest AI block. Send a prompt and bind the response to a typed value, in a single round-trip.</p>
</PaletteCard>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/agents">
  <h3 class="palette-card-title">AI Agents</h3>
  <p class="palette-card-desc">Autonomous LLM-driven agents that reason over a system prompt, call tools, and maintain conversation state across turns.</p>
</PaletteCard>

<PaletteCard icon="rag" href="/develop-and-test/integration-artifacts/ai-integrations/rag">
  <h3 class="palette-card-title">Retrieval-Augmented Generation (RAG)</h3>
  <p class="palette-card-desc">Ground LLM responses in your own documents by retrieving relevant content at query time and injecting it into the prompt.</p>
</PaletteCard>

<PaletteCard icon="mcp" href="/develop-and-test/integration-artifacts/ai-integrations/mcp">
  <h3 class="palette-card-title">Model Context Protocol (MCP)</h3>
  <p class="palette-card-desc">Expose your integrations as MCP tools for AI assistants, or use external MCP tools with your agents.</p>
</PaletteCard>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/voice-agent">
  <h3 class="palette-card-title">Voice Agent</h3>
  <p class="palette-card-desc">Attach an AI agent to a cloud voice listener so callers can talk to it.</p>
</PaletteCard>

<PaletteCard icon="natural-functions" href="/develop-and-test/integration-artifacts/ai-integrations/natural-functions">
  <h3 class="palette-card-title">Natural Functions</h3>
  <p class="palette-card-desc">Experimental. Write the function body in plain English. The LLM returns a value that conforms to your declared return type.</p>
</PaletteCard>

</PaletteGrid>

## Getting started

- **[Build a Sentiment Analyzer](../../../guides/how-to-guides/build-a-sentiment-analyzer.md):** Your first AI integration with a direct LLM call.
- **[Build a Hotel Finder Agent](../../../guides/how-to-guides/build-a-hotel-finder-agent.md):** An agent with two custom tools and session-scoped memory.

## Tutorials

- **[Email Generator with Direct LLM](../../../guides/how-to-guides/email-generator-direct-llm.md)**
- **[Customer review analyzer with Natural Function](../../../guides/business-use-cases/review-summarizer-natural-function.md)**
- **[Building an HR knowledge base with RAG](../../../guides/business-use-cases/building-hr-knowledge-base-rag.md)**
- **[Build a customer care agent with MCP](../../../guides/business-use-cases/building-a-customer-care-agent-mcp.md)**
- **[Building an IT Helpdesk AI Agent with Persistent Memory](../../../guides/business-use-cases/it-helpdesk-chatbot.md)**
