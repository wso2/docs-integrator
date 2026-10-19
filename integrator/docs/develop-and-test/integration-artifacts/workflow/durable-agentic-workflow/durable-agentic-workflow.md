---
title: Durable Agentic Workflow
---

# Durable Agentic Workflow

A Durable Agentic Workflow combines the [Durable Workflow](../durable-workflow/durable-workflow.md) execution model — long-running, interruptible by events and timers, recoverable after a crash or restart — with an [AI agent](../../ai-integrations/agents/agents.md) driving the workflow's decisions at each step, instead of (or alongside) fixed logic. You describe the goal in natural language and the model decides the steps, adapting to each request at runtime — the best fit for branchy, hard-to-enumerate logic. Both run on the same durable runtime, so an agent gets crash safety, human tasks, timers, and retries for free.

## When to use it

Reach for a Durable Agentic Workflow instead of a plain Durable Workflow when the process needs an agent to reason about what to do next at one or more points — for example, deciding which branch to take, what tool to call, or how to respond to a human task's outcome — while still needing the durability guarantees (surviving restarts, waiting on timers or events) that a plain request/response agent invocation doesn't provide.

## In this section

- **[Create a durable agent](create-durable-agent.md):** Describe the goal in natural language, and give the agent activities, data events, and human tasks as its capabilities.
- **[Run a durable agent](run-durable-agent.md):** Start an agent instance from an integration flow, and bind the instance ID the rest of the flow needs.
- **[Send an agent data event](send-agent-data-event.md):** Deliver one turn on a channel the running agent listens on, and keep the correlation token it returns.
- **[Get a data event result](get-data-event-result.md):** Read the agent's answer to a sent turn, using that correlation token.
- **[Get an agent result](get-agent-result.md):** Read what an agent instance finally produced, addressed by its instance ID.

## What's next

- [Build a Claim Handling Durable Agent](../../../../get-started/quickstarts/build-claim-handling-agent.md) — a worked example: an agent that validates expense claims and pays them out only after a Finance reviewer approves.
- [Durable Workflow](../durable-workflow/durable-workflow.md) — the same durable execution model, without an agent driving it.
- [AI Agents](../../ai-integrations/agents/agents.md) — the agent building block (model, system prompt, tools, memory) used inside this workflow.
- [Creating an Agent](../../ai-integrations/agents/create-an-agent.md) — configure the agent's role, instructions, and tools.
