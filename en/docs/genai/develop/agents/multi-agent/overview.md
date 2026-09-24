---
sidebar_position: 1
title: Multi-Agent Systems
description: Why and when to split work across multiple AI agents in WSO2 Integrator, covering the orchestrator pattern, context and session isolation, and the cost of delegation.
---

# Multi-Agent Systems

A multi-agent system is an architecture in which a task is accomplished not by a single LLM-driven agent, but by several cooperating agents, each with its own instructions, tools, model, and optionally its own memory. Instead of one agent carrying every instruction, every tool definition, and the full working context in a single prompt, the work is decomposed and distributed: one agent plans and delegates, others specialize in retrieval, generation, validation, or domain-specific actions, and their results are composed into a final outcome.

The individual agents remain ordinary agents, an LLM in a loop with tools and instructions. What makes a system multi-agent is the coordination layer: how control flows between agents, what context each agent can see, and how results are aggregated.

In WSO2 Integrator, coordination is expressed by attaching one agent as a tool of another. See [Agents as Tools](agents-as-tools.md) for the mechanics.

## Why use multiple agents

A single capable agent with many tools is often the right starting point, but it hits well-understood limits as tasks grow.

| Motivation | What it buys you |
|---|---|
| **Context window management** | Every tool schema, instruction, and intermediate result competes for space in one context window. Splitting the work gives the system parallel context capacity far beyond any single model's window. Each sub-agent works with a clean, scoped context containing only what its subtask needs. |
| **Specialization** | Tool selection accuracy and instruction-following degrade measurably as a prompt fills with dozens of tools and long, mixed instructions. A focused agent with five relevant tools and a tight system prompt outperforms a generalist with fifty tools on the same subtask. |
| **Fault isolation** | When a sub-agent goes off the rails by hallucinating, looping, or misusing a tool, the damage is contained to its subtask. The orchestrator can discard the result and retry without corrupting the state of the overall run. |
| **Parallelism** | Independent subtasks, such as researching five competitors or validating five endpoints, can be delegated separately and joined, cutting wall-clock latency. |
| **Separation of concerns** | An agent reviewing work it did not produce is less prone to self-consistency bias. Writer/reviewer and generator/validator splits produce more reliable output than asking one agent to critique itself. |
| **Security and permissions** | Each agent is granted only the credentials and tools its role requires, limiting the blast radius of prompt injection or plain mistakes. A read-only research sub-agent cannot be tricked into mutating production data, because it never held those permissions. |
| **Cost optimization** | Different agents can run on different models. Use a strong model for planning and synthesis, and cheaper, faster models for extraction, classification, or formatting. This is impossible when everything runs inside one agent on one model. |
| **Governance and auditability** | A delegation trace records that the orchestrator assigned this subtask to that agent, which returned this result. That is far easier to audit than one opaque monolithic transcript, and gives regulated environments attributable decision points. |

## When to add a sub-agent

Most problems that look like they need a second agent are better solved by adding a tool. Reach for a sub-agent when the work needs its own *reasoning*, not just its own *capability*.

| Situation | Do this |
|---|---|
| The agent needs to perform a discrete action or fetch data | Add a [tool](../tools.md) |
| A task needs several tools and its own multi-step reasoning | Add a sub-agent |
| A task needs instructions that conflict with the main agent's | Add a sub-agent |
| The agent has grown so many tools that it picks the wrong one | Group related tools behind sub-agents |
| A subtask should run with narrower credentials than the caller | Add a sub-agent |
| Two capabilities have separate owners or release cadences | Separate integrations, or a shared [agent definition](../definitions/overview.md) |
| The steps are fixed and known in advance | An integration flow, not an agent |

A single agent with five tools is usually better than two agents with three tools each. Every delegation adds a reasoning hop, and every hop is a chance to lose intent.

## The orchestrator pattern

WSO2 Integrator supports the **orchestrator** pattern, also called supervisor/worker. One agent owns the request, decomposes it into subtasks, delegates each to a specialist agent attached as a tool, and aggregates the results into a final answer.

| Aspect | Behavior |
|---|---|
| **Topology** | One orchestrator, N workers |
| **Control flow** | Centralized. The orchestrator decomposes, delegates, and aggregates |
| **Agent visibility** | Workers do not see each other's outputs |
| **State and context** | The orchestrator holds the overall state; workers receive scoped subtasks |
| **Debuggability** | Good, because the delegation trace is explicit |
| **Human-in-the-loop** | Straightforward, by inserting a checkpoint at the orchestrator |
| **Main failure mode** | Vague subtask specifications; the orchestrator becoming a bottleneck |

This is the production default across the industry: it has the clearest delegation trace, the most natural place to insert human approval, and the most predictable cost profile.

Other coordination patterns exist in the wider ecosystem, such as peer-to-peer handoff, shared group conversations, and multi-level hierarchies. They trade centralized control for lower per-hop latency or richer shared context, at the cost of debuggability and predictable spend. WSO2 Integrator does not model these directly.

## Context and session isolation

The subtlest question in a multi-agent system is what the sub-agent gets to see.

By default a sub-agent is **isolated**: it receives only the task the orchestrator composes in its tool call, and runs in a fresh session. This gives the strongest fault isolation and the cleanest context, which is the core value of the pattern. The trade-off is that results depend entirely on the orchestrator writing self-contained subtask specifications, which is also the pattern's main failure mode.

Because the sub-agent cannot see the conversation, anything it needs must be in the task description. Say so in the orchestrator's instructions, and in the [tool description](agents-as-tools.md#configure-the-tool) of every attached agent.

### Memory posture for sub-agents

The tool call and its result, as recorded by the orchestrator, are the canonical representation of the sub-work. The sub-agent usually does not need to remember anything itself.

- **Prefer stateless sub-agents.** An agent configured without memory clears its session after every run.
- **Otherwise, give each sub-agent its own memory.** Isolated memory per sub-agent keeps its internal dialogue out of the orchestrator's history.
- **Never reuse the orchestrator's session key.** A sub-agent writing into the orchestrator's session pollutes it with the sub-agent's internal turns, and the store keeps only the latest system message per key, so the sub-agent's persona overwrites the orchestrator's.
- **Never let two concurrent runs share the same memory instance and session ID.** A run reads history at the start and writes at the end; two runs on one key interleave into a single corrupted conversation.

If a sub-agent genuinely needs persistent memory on a shared store, key it per sub-agent and per conversation rather than by the parent's raw session ID. See [Memory](../memory.md).

## Cost and latency

Every delegation is a full agent run with its own prompt, its own tool-calling loop, and its own tokens. A sub-agent that averages four reasoning steps turns one call into five.

- **Token spend compounds.** The orchestrator pays for the sub-agent's entire run, then pays again to reason about the result.
- **Latency is additive.** The orchestrator waits for each delegation before it can continue.
- **Iteration budgets multiply.** Each agent enforces its own maximum iterations, so the worst case is their product, not their sum.

Set a maximum iteration count on every agent in the system, and use [observability](../observability.md) to see where calls actually go before adding another layer.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| The orchestrator never delegates. | The sub-agent's tool description doesn't say when to use it. | Rewrite the description around the trigger condition, not the capability. |
| The orchestrator delegates everything. | Its own instructions don't say what it handles itself. | State the orchestrator's own responsibilities explicitly. |
| The sub-agent answers a question it wasn't asked. | The orchestrator passed the raw user message instead of a scoped task. | Instruct the orchestrator to write self-contained subtask specifications. |
| The sub-agent lacks information it needs. | It cannot see the conversation, and the task omitted it. | Say in the tool description what a complete handoff must include. |
| Responses are slow and expensive for simple questions. | Every request goes through a delegation hop. | Give the orchestrator tools for the common cases and delegate only the hard ones. |
| The system loops or runs long. | Iteration budgets multiply across layers. | Lower maximum iterations at each level and keep the hierarchy shallow. |
| The orchestrator's history fills with sub-agent chatter. | A sub-agent is writing into the orchestrator's session. | Make the sub-agent stateless, or give it its own memory and key. |

## What's next

- **[Agents as Tools](agents-as-tools.md)** — Attach an agent as a tool of another agent.
- **[Agent Definitions](../definitions/overview.md)** — Build a specialist once and reuse it.
- **[Memory](../memory.md)** — Configure conversational and persistent memory.
- **[Observability](../observability.md)** — Trace delegation across agents.
