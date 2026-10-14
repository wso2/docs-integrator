---
sidebar_position: 0
sidebar_label: Overview
title: "Durable Workflow"
description: Design long-running workflow logic that survives restarts, waits on events and timers, and involves human tasks.
keywords: [wso2 integrator, durable workflow, long-running, crash recovery]
slug: /develop-and-test/integration-artifacts/workflow/durable-workflow
---

# Durable Workflow

A Durable Workflow is a long-running workflow artifact that can be interrupted by events, wait on timers, involve human tasks, and recover its state after a crash or restart — as opposed to a single request/response flow that runs start to finish in one execution. You wire the steps together in a visual flow, giving an explicit, predictable path — the best fit for known, fixed business logic. For logic that needs to adapt to each request at runtime instead, see [Durable Agentic Workflow](../durable-agentic-workflow/durable-agentic-workflow.md).

## When to use it

Reach for a Durable Workflow instead of a regular integration flow when the process:

- Spans a long period of time (hours, days, or longer) rather than completing in one request.
- Needs to pause and wait for an external event, a timer, or a person to complete a step before continuing.
- Must survive a restart or crash partway through without losing its place.

## In this section

- **[Create a workflow](create.md):** Add the artifact, give it an input type, and design its steps on the diagram.
- **[Start a workflow](start.md):** Launch a run from a service or an automation, and keep the ID that identifies it.
- **[Activities](activities.md):** The recorded units of work in a workflow — exactly-once on replay and retryable on failure.
- **[Durable timers](durable-timers.md):** Pause for hours, days, or months with a wait that survives restarts and holds no threads or connections.
- **[Await data events](data-events.md):** Wait until an external system or a person delivers the data the workflow needs, then resume with it.
- **[Send a data event](send-data-event.md):** Deliver a value into a waiting run, using the workflow ID it was started with.
- **[Await human task](await-human-task.md):** Pause for role-based human decisions and external data, for as long as it takes.
- **[Error handling and review activities](review-activity-and-error-handling.md):** Approval gates before risky steps and human-reviewed retries after failures.
- **[Prebuilt activities](prebuilt-activities/prebuilt-activities.md):** Durable REST, SOAP, and email calls with no wrapper to write.

## What's next

- [Build an Order Processing Workflow](../../../../get-started/quickstarts/build-order-processing.md) — a worked example that fills this in end to end.
- [Durable Agentic Workflow](../durable-agentic-workflow/durable-agentic-workflow.md) — the same durable execution model, with an AI agent driving the workflow's decisions.
- [AI Agents](../../ai-integrations/agents/agents.md) — the AI agent building block, usable inside a workflow.
