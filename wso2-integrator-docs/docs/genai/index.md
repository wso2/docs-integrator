---
sidebar_position: 4
title: AI Integrations Overview
description: "How do I build AI agents, RAG apps, or MCP servers?"
---

# AI Integrations Overview

Build AI-powered integrations using large language models, vector databases, and the Model Context Protocol. This section covers everything you need to create intelligent agents, retrieval-augmented generation pipelines, and MCP-enabled services with WSO2 Integrator.

:::info GenAI vs. Develop
This section focuses on **building AI-powered integrations** — agents that reason, RAG apps that retrieve knowledge, and MCP servers that expose enterprise data to AI. For AI that helps you write code (copilot, test generation, data mapping assistance), see [Develop](/docs/develop).
:::

## Getting Started

Set up your environment and build your first AI integration.

- [Setting Up WSO2 Integrator](getting-started/setup.md) — Prerequisites and environment configuration for AI development
- **Build a Smart Calculator Assistant** — [Your first AI agent with tool calling](getting-started/smart-calculator.md)
- **Build a Sample Hotel Booking Agent** — [A more advanced agent with multiple tools](getting-started/hotel-booking-agent.md)

## Key Concepts

Understand the core building blocks of AI integrations.

- [What is an LLM?](key-concepts/what-is-llm.md) — Large language models and how they power integrations
- [What is a Natural Function?](key-concepts/what-is-natural-function.md) — LLM-powered typed function calls in Ballerina
- [What is an AI Agent?](key-concepts/what-is-ai-agent.md) — Agents that reason, plan, and use tools
- [What are Tools?](key-concepts/what-are-tools.md) — Functions and APIs that agents can call
- [What is AI Agent Memory?](key-concepts/what-is-agent-memory.md) — Conversation persistence and context
- [What is MCP?](key-concepts/what-is-mcp.md) — Model Context Protocol for AI-system integration
- [What is RAG?](key-concepts/what-is-rag.md) — Retrieval-augmented generation for grounded responses

## Develop AI Applications

Build production-ready AI integrations step by step.

### Direct LLM Calls

- [Configuring LLM Providers](develop/direct-llm/configuring-providers.md) — Set up OpenAI, Anthropic, Google, Azure, and more
- [Constructing Prompts](develop/direct-llm/constructing-prompts.md) — Craft effective prompts for your models
- [Handling Responses](develop/direct-llm/handling-responses.md) — Parse and process LLM outputs

### Natural Functions

- [Defining Natural Functions](develop/natural-functions/defining.md) — Create LLM-powered typed functions
- [Constructing Prompts](develop/natural-functions/constructing-prompts.md) — Write prompts for natural functions
- [Handling Responses](develop/natural-functions/handling-responses.md) — Type-safe response processing

### RAG (Retrieval-Augmented Generation)

- [Chunking Documents](develop/rag/chunking-documents.md) — Split documents for vector storage
- [Generating Embeddings](develop/rag/generating-embeddings.md) — Convert text to vector representations
- [Connecting to Vector Databases](develop/rag/connecting-vector-dbs.md) — Store and query vectors
- [RAG Querying](develop/rag/rag-querying.md) — Build the complete RAG query pipeline

### AI Agents

- [Creating an AI Agent](develop/agents/creating-agent.md) — Build agents with system prompts and LLM providers
- [Adding Tools to an Agent](develop/agents/adding-tools.md) — Bind functions and APIs as agent tools
- [Adding Memory to an Agent](develop/agents/adding-memory.md) — Configure conversation persistence
- [Advanced AI Agent Configurations](develop/agents/advanced-config.md) — Multi-agent orchestration and tuning
- [AI Agent Observability](develop/agents/agent-observability.md) — Monitor and trace agent behavior
- [AI Agent Evaluations](develop/agents/agent-evaluations.md) — Test and measure agent quality

### MCP Integration

- [Creating an MCP Server](develop/mcp/creating-mcp-server.md) — Expose integrations to AI assistants
- [Building AI Agents with MCP Servers](develop/mcp/agents-with-mcp.md) — Connect agents to MCP tools

## Tutorials

End-to-end walkthroughs that combine multiple GenAI capabilities.

- [HR Knowledge Base Agent with RAG](tutorials/hr-knowledge-base-rag.md) — Build an agent that answers employee questions using document retrieval
- [Customer Care Agent with MCP](tutorials/customer-care-mcp.md) — Create a support agent that accesses CRM and order data via MCP
- [IT Helpdesk Chatbot with Persistent Memory](tutorials/it-helpdesk-chatbot.md) — Build a chatbot that remembers conversation history
- [Legal Document Q&A with MCP and RAG](tutorials/legal-doc-qa.md) — Combine RAG and MCP for intelligent document analysis

## Reference

- [Ballerina Copilot Guide](reference/copilot-guide.md) — Set up and use AI code assistance
- [AI Governance and Security](reference/ai-governance.md) — Data handling, guardrails, and compliance
- [Troubleshooting](reference/troubleshooting.md) — Common issues and solutions
