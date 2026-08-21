---
sidebar_position: 2
title: Agents as Tools
description: Attach an agent as a tool of another AI agent in WSO2 Integrator — reusing an existing instance, creating a one-off agent, or instantiating a shared agent definition.
---

# Agents as Tools

An agent can be attached to another agent as a tool. The calling agent then treats it like any other tool: it decides when to invoke it, passes it a task, and uses what comes back.

This page describes how to attach an agent as a tool and how to configure the result. For guidance on whether to split work across agents at all, see [Multi-Agent Systems](overview.md).

## Attach an agent as a tool

1. Select the **AI Agent** node in the agent canvas and click the **+** button, or click **+ Tool** in the [Agent Definition Designer](../definitions/overview.md#agent-definition-designer).
2. In the **Add Tool** panel, open the **Agent** section.

![The Add Tool panel with a search box and an Agent section containing an Add Agent button.](/img/genai/develop/agents/multi-agent/01-add-tool-agent.png)

Agents already instantiated in the project are listed here and can be attached directly. If the agent you want doesn't exist yet, click **+ Add Agent**.

3. The **Add Agent** dialog opens.

![The Add Agent dialog showing Create Agent, Create Agent Definition, and a Pre-built Agents section containing CustomerSupportAgent.](/img/genai/develop/agents/multi-agent/02-add-agent-prebuilt.png)

This is the same dialog used to add an agent as an artifact, with the same options:

| Option | Result |
|---|---|
| **Create Agent** | A one-off agent instance, created for this integration and used only here. |
| **Create Agent Definition** | A reusable definition, and an instance of it attached as the tool. |
| **Pre-built Agents** | An instance of a definition that already exists in this project or your organization. |

For the fields in each path, see [Create an agent definition](../definitions/overview.md#create-an-agent-definition).

> **Tip:** Creating a definition from inside the tool flow is a reasonable path when you know the specialist will be reused. You build it, share it, and attach it in one pass, rather than creating an artifact first and coming back.

## Reuse an instance or create a new one

If an instance of the agent you want already exists in the project, you can attach it rather than creating another.

| | Reuse an existing instance | Create a new instance |
|---|---|---|
| **Configuration** | Shared with every other user of that instance | Independent |
| **Memory and session** | Shared | Isolated, if configured with its own memory |
| **Cost** | One agent to maintain | Another agent to maintain |
| **Use it when** | The callers should behave identically and can share state | The sub-agent needs its own memory scope or configuration |

Reuse is the simpler default. Create a new instance when the callers must not see each other's conversation state.

## Configure the tool

An agent attached as a tool has two descriptions, and they are not the same thing:

| | Written for | Purpose |
|---|---|---|
| **Tool name and description** | The calling agent's LLM | Deciding *whether* to delegate, and when |
| **Role and instructions** | The sub-agent's own LLM | Deciding *how* to do the work once delegated |

Write the tool description around the trigger condition — the situations in which the calling agent should hand off — not around the sub-agent's capabilities. This is where delegation most often fails: a description that reads like a job title tells the calling agent nothing about when to use it.

<!-- TODO: Document the tool configuration fields presented after selecting an agent — name, description, and how the query is passed to the sub-agent. -->

## What the sub-agent returns

The value the calling agent receives is determined by the sub-agent's response type — the **Response Type** of an [agent definition](../definitions/overview.md#response-type), or the **Type Descriptor** in a one-off agent's advanced configuration.

A narrow response type makes the sub-agent easier for the calling agent to use, because the result needs no further interpretation. A `string` response gives the calling agent prose it must reason about again.

## Execution behavior

<!-- TODO: Confirm and document:
     - Whether the sub-agent inherits the caller's session ID and context, or gets its own.
     - Whether memory is shared with the calling agent by default.
     - How a sub-agent error surfaces to the calling agent — as a tool error it can recover from, or as a failed run.
     - Whether nesting depth is bounded, and what happens at the limit.
     - How agent credentials propagate to a sub-agent's tools. -->

Each agent in the system enforces its own **Maximum Iterations**, so a delegating agent's worst case is its own budget multiplied by its sub-agents'. Set both deliberately. See [Advanced configuration](../creating-an-agent.md#advanced-configuration).

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| The sub-agent is never called. | The tool description describes the agent rather than when to use it. | Rewrite it as a trigger condition. |
| The sub-agent receives the whole conversation. | The calling agent passes the raw user message. | Instruct the calling agent to pass a scoped task. |
| The calling agent re-answers what the sub-agent already answered. | The response type is `string` and the result reads as advice. | Narrow the response type, and say in the instructions that the result is authoritative. |
| Two callers see each other's conversation. | A single instance with shared memory is attached to both. | Create a separate instance for each caller. |
| A sub-agent failure fails the whole request. | The error propagates instead of being handled. | Instruct the calling agent on what to do when the tool fails. |

## What's next

- **[Multi-Agent Systems](overview.md)** — Topologies, cost, and when not to delegate.
- **[Agent Definitions](../definitions/overview.md)** — Build a specialist once and reuse it.
- **[Tools](../tools.md)** — The other tool types available to an agent.
- **[Observability](../observability.md)** — Trace a delegated call end to end.
