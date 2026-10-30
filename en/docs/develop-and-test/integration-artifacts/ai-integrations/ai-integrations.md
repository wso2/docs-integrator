---
title: AI Integrations Overview
description: Build AI agents and AI-powered agentic integrations with WSO2 Agent Builder using agents, direct LLM calls, knowledge bases (RAG), MCP servers, and voice agents.
keywords: [wso2 agent builder, genai, ai, llm, rag, agent, mcp, voice agent, model provider, embedding, vector store, knowledge base]
sidebar_label: AI Integration Basics
sidebar_position: 0
slug: /develop-and-test/integration-artifacts/ai-integrations
hide_table_of_contents: true
wide_layout: true
---

# AI Integrations

WSO2 Agent Builder lets you build AI agents and the agentic integrations around them, including agents with tools and memory, direct LLM calls, knowledge bases, MCP servers, and voice agents.

<PaletteGrid>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/agents">
  <h3 class="palette-card-title">AI Agents</h3>
  <p class="palette-card-desc">Autonomous LLM-driven agents that reason over a system prompt, call tools, and keep memory across turns. Covers reusable definitions, multi-agent systems, human-in-the-loop approval with gated tools, observability, and evaluations.</p>
</PaletteCard>

<PaletteCard icon="ai-building-blocks" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks">
  <h3 class="palette-card-title">AI Building Blocks</h3>
  <p class="palette-card-desc">The shared connections and stores every AI feature is built from: model providers, embedding providers, vector stores, chunkers, and data loaders.</p>
</PaletteCard>

<PaletteCard icon="knowledge-bases" href="/develop-and-test/integration-artifacts/ai-integrations/knowledge-bases">
  <h3 class="palette-card-title">Knowledge Bases</h3>
  <p class="palette-card-desc">Ground agent responses in your own documents with Retrieval-Augmented Generation (RAG). Ingest documents into a knowledge base, then let an agent retrieve the relevant chunks at query time.</p>
</PaletteCard>

<PaletteCard icon="mcp" href="/develop-and-test/integration-artifacts/ai-integrations/mcp">
  <h3 class="palette-card-title">Model Context Protocol (MCP)</h3>
  <p class="palette-card-desc">Expose a service as MCP tools for AI assistants, or use tools from external MCP servers in your agents.</p>
</PaletteCard>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/voice-agent">
  <h3 class="palette-card-title">Voice Agent</h3>
  <p class="palette-card-desc">Expose an AI agent over a voice channel. WSO2 Cloud handles speech-to-text and text-to-speech, so your service works only with text.</p>
</PaletteCard>

</PaletteGrid>

## Getting started

- **[Build an AI Agent](../../../get-started/quickstarts/build-ai-agent.md):** Create your first agent and chat with it.
- **[Build a Sentiment Analyzer](../../../guides/how-to-guides/build-a-sentiment-analyzer.md):** Your first agentic integration with a direct LLM call.
- **[Build a Hotel Finder Agent](../../../guides/how-to-guides/build-a-hotel-finder-agent.md):** An agent with two custom tools and session-scoped memory.

## Tutorials

- **[Building an IT Helpdesk AI Agent with Persistent Memory](../../../guides/business-use-cases/it-helpdesk-chatbot.md)**
- **[Build a customer care agent with MCP](../../../guides/business-use-cases/building-a-customer-care-agent-mcp.md)**
