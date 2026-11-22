---
title: AI Building Blocks
description: The shared connections every AI feature in WSO2 Integrator is built from, starting with model providers.
keywords: [wso2 integrator, model provider, llm, ai]
sidebar_label: Building Blocks
sidebar_position: 0
slug: /develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks
hide_table_of_contents: true
wide_layout: true
---

# AI Building Blocks

Every AI feature in WSO2 Integrator, direct LLM calls, agents, and natural functions, is composed from the same small set of shared connections. Configure one once, then reuse it wherever it's needed.

<PaletteGrid>

<PaletteCard icon="model-providers" href="/develop-and-test/integration-artifacts/ai-integrations/ai-building-blocks/model-providers">
  <h3 class="palette-card-title">Model Providers</h3>
  <p class="palette-card-desc">Connect to the LLM behind every prompt: the Default WSO2 provider, OpenAI, Azure OpenAI, Anthropic, Google Vertex, Mistral, DeepSeek, Ollama, and OpenRouter.</p>
</PaletteCard>

</PaletteGrid>

## What's next

- [AI Agents](../agents/agents.md) — Use a model provider to power an agent's reasoning
- [Direct LLMs](../direct-llm/direct-llm.md) — Use a model provider directly, with no agent loop
