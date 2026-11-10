---
title: "Develop and Test"
description: "Build, try, and evaluate AI agents in WSO2 Agent Builder: agents, tools, MCP servers, RAG, and direct LLM calls."
keywords: [wso2 agent builder, develop, test, ai agent, mcp, rag, evaluations, tracing]
sidebar_label: Overview
sidebar_position: 0
slug: /develop-and-test
hide_table_of_contents: true
wide_layout: true
---

# Build Your Agent

This section covers the Develop and Test phase: building agents in WSO2 Agent Builder before anything ships. We assume you're already familiar with the editor from the [Editor Tour](../editor/editor.md).

:::tip
Start by describing what your agent should do to [WSO2 Agent Builder Copilot](../editor/copilot/copilot.md) on an empty agentic integration's overview. Copilot generates a first working version, which you can refine on the visual designer, and drop into Ballerina code only when you need more precise control. Everything stays in sync throughout.
:::

## Create a Project

<PaletteGrid>

<PaletteCard icon="quickstart" href="/develop-and-test/create-workspace">
  <h3 class="palette-card-title">Create a project</h3>
  <ul class="palette-card-list">
    <li>Start a new agent project</li>
    <li>Open an existing project</li>
    <li>Explore pre-built agents and samples</li>
  </ul>
</PaletteCard>

<PaletteCard icon="editor-window" href="/editor">
  <h3 class="palette-card-title">Editor Tour<span class="palette-card-badge">Prerequisite</span></h3>
  <ul class="palette-card-list">
    <li>Workspace and views</li>
    <li>Editors and canvases</li>
    <li>WSO2 Agent Builder Copilot</li>
  </ul>
</PaletteCard>

</PaletteGrid>

## Build an Agent

<div class="palette-card--standalone">

<PaletteCard icon="ai" href="/editor/copilot">
  <h3 class="palette-card-title">Build with Copilot</h3>
  <ul class="palette-card-list">
    <li>Describe your agent and get a first working version</li>
    <li>Works across agents, tools, and integration logic</li>
    <li>Iterate in chat, then refine visually or in code</li>
  </ul>
</PaletteCard>

</div>

<div class="palette-group">

<p class="palette-group-label">Or build visually</p>

<PaletteGrid>

<PaletteCard icon="agents" href="/develop-and-test/integration-artifacts/agents">
  <h3 class="palette-card-title">Add Agents</h3>
  <ul class="palette-card-list">
    <li>Agents and durable agents</li>
    <li>Triggers: chat channels, APIs, events, and files</li>
    <li>Tools, memory, and model providers</li>
  </ul>
</PaletteCard>

<PaletteCard icon="artifacts" href="/develop-and-test/integration-artifacts/knowledge-bases">
  <h3 class="palette-card-title">Add AI Integrations</h3>
  <ul class="palette-card-list">
    <li>MCP servers</li>
    <li>RAG and direct LLM calls</li>
    <li>AI building blocks</li>
  </ul>
</PaletteCard>

<PaletteCard icon="canvases" href="/editor/canvases/flow-canvas">
  <h3 class="palette-card-title">Design Integration Logic</h3>
  <ul class="palette-card-list">
    <li>Flow Canvas with Node Palette</li>
    <li>Control flow and error handling</li>
    <li>Expressions and query expressions</li>
    <li>Ballerina pro-code</li>
  </ul>
</PaletteCard>

</PaletteGrid>

</div>

## Try and Evaluate Your Agent

<PaletteGrid>

<PaletteCard icon="manage-observe" href="/develop-and-test/integration-artifacts/agents/observability">
  <h3 class="palette-card-title">Trace Your Agent</h3>
  <ul class="palette-card-list">
    <li>Chat with your agent in Agent Chat</li>
    <li>Turn on tracing</li>
    <li>Inspect LLM and tool calls</li>
  </ul>
</PaletteCard>

<PaletteCard icon="test" href="/develop-and-test/test/evaluations">
  <h3 class="palette-card-title">Evaluate Your Agent</h3>
  <ul class="palette-card-list">
    <li>Capture sessions into evalsets</li>
    <li>Build evaluations from templates or from scratch</li>
    <li>Run evaluations and review reports</li>
  </ul>
</PaletteCard>

</PaletteGrid>

## What's next

- [Create a project](create-workspace/create-a-project.md) — Start a new project in WSO2 Agent Builder.
- [Build an AI Agent](../get-started/quickstarts/build-ai-agent.md) — Build a working agent from an empty project.
- [Deploy and Run](../deploy-and-run/deploy-and-run.md) — Ship your agent once it's ready.
