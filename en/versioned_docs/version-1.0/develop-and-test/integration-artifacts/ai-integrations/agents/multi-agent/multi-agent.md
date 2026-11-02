---
sidebar_position: 0
sidebar_label: Multi-Agent Concepts
title: Multi-Agent Concepts
description: Why and when to split work across multiple AI agents in WSO2 Agent Builder, how sequential and hierarchical agents differ, and how context, sessions, and cost behave across agents.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Multi-Agent Concepts

A multi-agent system is an architecture in which a task is accomplished not by a single LLM-driven agent, but by several cooperating agents, each with its own instructions, tools, model, and optionally its own memory. Instead of one agent carrying every instruction, every tool definition, and the full working context in a single prompt, the work is decomposed and distributed: agents specialize in retrieval, generation, validation, or domain-specific actions, and their results are composed into a final outcome.

The individual agents remain ordinary agents, an LLM in a loop with tools and instructions. What makes a system multi-agent is the coordination layer: how control flows between agents, what context each agent can see, and how results are aggregated.

WSO2 Agent Builder supports two ways to coordinate agents:

- **[Sequential agents](sequential-agents.md)** run one after another in a fixed order, each passing its result to the next.
- **[Hierarchical agents](hierarchical-agents.md)** put an orchestrator in charge, which decides at run time which specialist agents to call.

See [Sequential or hierarchical](#sequential-or-hierarchical) to choose between them.

## Why use multiple agents

A single capable agent with many tools is often the right starting point, but it hits well-understood limits as tasks grow.

| Motivation | What it buys you |
|---|---|
| **Context window management** | Every tool schema, instruction, and intermediate result competes for space in one context window. Splitting the work gives the system parallel context capacity far beyond any single model's window. Each agent works with a clean, scoped context containing only what its subtask needs. |
| **Specialization** | Tool selection accuracy and instruction-following degrade measurably as a prompt fills with dozens of tools and long, mixed instructions. A focused agent with five relevant tools and a tight system prompt outperforms a generalist with fifty tools on the same subtask. |
| **Fault isolation** | When an agent goes off the rails by hallucinating, looping, or misusing a tool, the damage is contained to its subtask. The result can be discarded and the subtask retried without corrupting the state of the overall run. |
| **Parallelism** | Independent subtasks, such as researching five competitors or validating five endpoints, can be delegated separately and joined, cutting wall-clock latency. |
| **Separation of concerns** | An agent reviewing work it did not produce is less prone to self-consistency bias. Writer/reviewer and generator/validator splits produce more reliable output than asking one agent to critique itself. |
| **Security and permissions** | Each agent is granted only the credentials and tools its role requires, limiting the blast radius of prompt injection or plain mistakes. A read-only research agent cannot be tricked into mutating production data, because it never held those permissions. |
| **Cost optimization** | Different agents can run on different models. Use a strong model for planning and synthesis, and cheaper, faster models for extraction, classification, or formatting. This is impossible when everything runs inside one agent on one model. |
| **Governance and auditability** | A trace records which agent handled which subtask, and what it returned. That is far easier to audit than one opaque monolithic transcript, and gives regulated environments attributable decision points. |

## When to add another agent

Most problems that look like they need a second agent are better solved by adding a tool. Reach for another agent when the work needs its own *reasoning*, not just its own *capability*.

| Situation | Do this |
|---|---|
| The agent needs to perform a discrete action or fetch data | Add a [tool](../tools.md) |
| A task needs several tools and its own multi-step reasoning | Add an agent |
| A task needs instructions that conflict with the main agent's | Add an agent |
| The agent has grown so many tools that it picks the wrong one | Group related tools behind specialist agents |
| A subtask should run with narrower credentials than the caller | Add an agent |
| Two capabilities have separate owners or release cadences | Separate integrations, or a [shareable agent](../definitions/definitions.md) |
| The steps are fixed, known in advance, and need no reasoning | A [function or custom tool](../tools.md), not an agent |

A single agent with five tools is usually better than two agents with three tools each. Every extra agent adds a reasoning hop, and every hop is a chance to lose intent.

## Sequential or hierarchical

The two patterns differ in who decides which agent runs next: the flow, or an agent.

### Sequential agents

In a sequential system, a trigger's flow calls agents one after another, and each agent's result becomes the next agent's input. The order is fixed by the flow, so every request passes through every stage. A writer/reviewer split is a typical example: one agent drafts a customer reply, and a second checks it against the support team's rules before it goes out.

<ThemedImage
    alt="The support_reply Overview showing the /support-reply Agent Chat trigger connected to replyDrafter, which is connected to replyReviewer by a solid arrow."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/multi-agent/18-overview-sequential-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/multi-agent/18-overview-sequential-v1.0.png'),
    }}
/>

The integration's **Overview** draws the chain as solid arrows, in the order the flow calls the agents. See [Sequential Agents](sequential-agents.md).

### Hierarchical agents

In a hierarchical system, also called orchestrator/worker or supervisor/worker, one orchestrator agent owns the request. It decomposes the request into subtasks, delegates each one to a specialist agent attached as its tool, and aggregates the results into a final answer. The orchestrator decides at run time which specialists a request needs, if any.

In the support desk below, a chat trigger calls a `supportOrchestrator` agent. The orchestrator delegates to three specialists: `orderStatusAgent` looks up orders, `returnsPolicyAgent` decides return eligibility, and `refundsAgent` checks an order and issues the refund. Each specialist has only the tools its job needs.

<ThemedImage
    alt="The support_desk Overview showing an Agent Chat trigger connected to the supportOrchestrator agent with 3 tools, which has dashed delegation edges to three specialist cards: returnsPolicyAgent (an instance of the ReturnsPolicyAgent definition, no tools), orderStatusAgent (1 tool), and refundsAgent (2 tools)."
    sources={{
        light: useBaseUrl('/img/genai/develop/agents/multi-agent/14-overview-multi-agent-v1.0.png'),
        dark: useBaseUrl('/img/genai/develop/agents/multi-agent/14-overview-multi-agent-v1.0.png'),
    }}
/>

The **Overview** draws each delegation as a dashed edge from the orchestrator to the agent it delegates to. See [Hierarchical Agents](hierarchical-agents.md).

### Choosing between them

| Aspect | Sequential | Hierarchical |
|---|---|---|
| **Who decides what runs** | The flow, the same way for every request | The orchestrator, per request |
| **Topology** | A chain of stages | One orchestrator, N specialists |
| **How agents are connected** | `agent : run` nodes in a trigger's flow | Specialists attached to the orchestrator as tools |
| **What each agent sees** | Its own query, usually built from the previous result | The task the orchestrator composes for it |
| **Cost and latency** | Predictable: the sum of every stage, on every request | Varies with how many delegations the orchestrator makes |
| **Debuggability** | High: each stage is a top-level span, in order | Good: each delegation is nested under the orchestrator's tool call |
| **Main failure mode** | A stage passes on too little for the next to work with | Vague subtask specifications; the orchestrator becoming a bottleneck |

Use **sequential** agents when the stages are known in advance and every request needs all of them, such as extract then summarize, draft then review, or classify then route. Use **hierarchical** agents when the work depends on the request, such as a support desk where one question needs the order history and another needs the returns policy.

The two combine. A stage in a sequential chain can be an orchestrator with its own specialists, and a specialist can call other agents in turn. Keep such systems shallow: every level multiplies cost and makes failures harder to trace.

Other coordination patterns exist in the wider ecosystem, such as peer-to-peer handoff and shared group conversations. They trade centralized control for lower per-hop latency or richer shared context, at the cost of debuggability and predictable spend. WSO2 Agent Builder does not model these directly. Delegation only goes one way: an agent can't be a tool of one of its own sub-agents.

## Context and session isolation

The subtlest question in a multi-agent system is what each agent gets to see.

Every agent in the system is **isolated**: it sees only its own input, not the user's conversation or the other agents' work. In a sequential chain, that input is the **Query** set on its `agent : run` node. In a hierarchy, it is the task the orchestrator composes in its tool call. A trace shows exactly what each agent received; see [Test the delegation](hierarchical-agents.md#test-the-delegation) and [Test the chain](sequential-agents.md#test-the-chain). This gives the strongest fault isolation and the cleanest context, which is the core value of splitting the work. The trade-off is that results depend entirely on each input being self-contained.

Because an agent cannot see the conversation, anything it needs must be in its input. In a sequential chain, build it into the next stage's **Query**. In a hierarchy, say so in the orchestrator's instructions, and in the [tool description](hierarchical-agents.md#configure-the-tool) of every attached agent.

### Memory posture

- **Don't rely on what a sub-agent remembers.** In a hierarchy, the tool call and its result, as recorded by the orchestrator, are the canonical representation of the sub-work. Put everything the sub-agent needs in its task.
- **Never reuse the orchestrator's memory for a sub-agent.** A sub-agent writing into the orchestrator's session pollutes it with the sub-agent's internal turns, and the store keeps only the latest system message per key, so the sub-agent's persona overwrites the orchestrator's.
- **Never let two concurrent runs share the same memory instance and session ID.** A run reads history at the start and writes at the end; two runs on one key interleave into a single corrupted conversation.

If an agent genuinely needs persistent memory on a shared store, key it per agent and per conversation rather than by another agent's raw session ID. See [Memory](../memory.md).

## Cost and latency

Every agent call is a full agent run with its own prompt, its own tool-calling loop, and its own tokens.

- **Token spend adds up.** A sequential chain pays for every stage on every request. An orchestrator pays for each sub-agent's entire run, then pays again to reason about the result.
- **Latency is additive.** A stage, or an orchestrator, waits for each agent it calls before it can continue.
- **Iteration budgets multiply in a hierarchy.** Each agent enforces its own maximum iterations, so the worst case of a delegating agent is the product of the budgets, not their sum. A sub-agent that averages four reasoning steps turns one tool call into five LLM calls.

Set a maximum iteration count on every agent in the system, and use [observability](../observability.md) to see where calls actually go before adding another agent. In a trace, each stage of a sequential chain is a top-level **Invoke Agent** span. Each delegation in a hierarchy is an **Execute Tool** span with the sub-agent's own **Invoke Agent** span nested inside. Both show latency and token counts.

## Common pitfalls

| Symptom | Likely cause | Fix |
|---|---|---|
| The orchestrator never delegates. | The sub-agent's tool description doesn't say when to use it. | Rewrite the description around the trigger condition, not the capability. |
| The orchestrator delegates everything. | Its own instructions don't say what it handles itself. | State the orchestrator's own responsibilities explicitly. |
| An agent answers a question it wasn't asked. | It received the raw user message instead of a scoped task. | Build a self-contained input for it: a scoped **Query**, or a subtask the orchestrator is instructed to write. |
| An agent lacks information it needs. | It cannot see the conversation, and its input omitted it. | Add what it needs to its **Query**, or say in the tool description what a complete handoff must include. |
| Responses are slow and expensive for simple questions. | Every request goes through every agent. | Give the first agent tools for the common cases, and call further agents only for the hard ones. |
| The system loops or runs long. | Iteration budgets multiply across layers. | Lower maximum iterations at each level and keep the hierarchy shallow. |
| The orchestrator's history fills with sub-agent chatter. | A sub-agent is writing into the orchestrator's session. | Give the sub-agent its own memory and key. |

## What's next

- **[Sequential Agents](sequential-agents.md)** — Run agents one after another in a fixed order.
- **[Hierarchical Agents](hierarchical-agents.md)** — Let an orchestrator delegate to specialist agents.
- **[Create an Agent Definition](../definitions/definitions.md)** — Build a specialist once and reuse it.
- **[Memory](../memory.md)** — Configure conversational and persistent memory.
- **[Observability](../observability.md)** — Trace work across agents.
