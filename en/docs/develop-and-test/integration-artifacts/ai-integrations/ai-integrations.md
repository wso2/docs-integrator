---
title: AI Integrations Overview
description: Build AI-powered integrations with Choreo Integrator using direct LLM calls, AI agents, MCP servers, natural functions, and voice agents.
keywords: [choreo integrator, genai, ai, llm, agent, mcp, natural function, voice agent, model provider]
sidebar_label: AI Integration Basics
sidebar_position: 0
slug: /develop-and-test/integration-artifacts/ai-integrations
hide_table_of_contents: true
wide_layout: true
---

# AI Integrations

Choreo Integrator lets you build AI-powered integrations, including direct LLM calls, AI agents, MCP servers, natural functions, and voice agents.

<PaletteGrid>

<PaletteCard icon="ai-building-blocks" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks">
  <h3 class="palette-card-title">AI Building Blocks</h3>
  <p class="palette-card-desc">The shared connections every AI feature is built from, starting with model providers.</p>
</PaletteCard>

<PaletteCard icon="quickstart" href="/develop-and-test/integration-artifacts/ai-integrations/direct-llm">
  <h3 class="palette-card-title">Direct LLMs</h3>
  <p class="palette-card-desc">The simplest AI block. Add a generate node to a flow, write a prompt, and bind the response to a typed value in a single round-trip.</p>
</PaletteCard>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/agents">
  <h3 class="palette-card-title">AI Agents</h3>
  <p class="palette-card-desc">Autonomous LLM-driven agents that reason over a system prompt, call tools, and keep memory across turns. Covers reusable definitions, multi-agent systems, gated tools, observability, and evaluations.</p>
</PaletteCard>

<PaletteCard icon="mcp" href="/develop-and-test/integration-artifacts/ai-integrations/mcp">
  <h3 class="palette-card-title">Model Context Protocol (MCP)</h3>
  <p class="palette-card-desc">Expose a service as MCP tools for AI assistants, or use tools from external MCP servers in your agents.</p>
</PaletteCard>

<PaletteCard icon="natural-functions" href="/develop-and-test/integration-artifacts/ai-integrations/natural-functions">
  <h3 class="palette-card-title">Natural Functions</h3>
  <p class="palette-card-desc">Experimental. Write the function body in plain English. The LLM returns a value that conforms to your declared return type.</p>
</PaletteCard>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/ai-integrations/voice-agent">
  <h3 class="palette-card-title">Voice Agent</h3>
  <p class="palette-card-desc">Expose an AI agent over a voice channel. Choreo Cloud handles speech-to-text and text-to-speech, so your service works only with text.</p>
</PaletteCard>

</PaletteGrid>

## Getting started

- **[Build a Sentiment Analyzer](../../../guides/how-to-guides/build-a-sentiment-analyzer.md):** Your first AI integration with a direct LLM call.
- **[Build a Hotel Finder Agent](../../../guides/how-to-guides/build-a-hotel-finder-agent.md):** An agent with two custom tools and session-scoped memory.

## Tutorials

- **[Email Generator with Direct LLM](../../../guides/how-to-guides/email-generator-direct-llm.md)**
- **[Building an IT Helpdesk AI Agent with Persistent Memory](../../../guides/business-use-cases/it-helpdesk-chatbot.md)**
- **[Build a customer care agent with MCP](../../../guides/business-use-cases/building-a-customer-care-agent-mcp.md)**
- **[Customer review analyzer with Natural Function](../../../guides/business-use-cases/review-summarizer-natural-function.md)**
