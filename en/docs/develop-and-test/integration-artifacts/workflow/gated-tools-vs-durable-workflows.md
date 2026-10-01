---
title: Choosing between Gated Tools and Durable Workflows
description: What gated tools and durable workflows each cover in WSO2 Integrator, where they overlap, and when to use which.
keywords: [wso2 integrator, gated tools, durable workflows, human task, approval gate, comparison, human in the loop]
sidebar_position: 3
slug: /develop-and-test/integration-artifacts/workflow/gated-tools-vs-durable-workflows
---

import HitlRoutingTable from '@site/src/components/HitlRoutingTable';

# Choosing between Gated Tools and Durable Workflows

[Gated tools](../ai-integrations/agents/gated-tools.md) and [durable workflows](workflow.md) solve different problems, and they overlap in only one place. Both can stop a call until a person approves it. This page sets out what each one covers, where they overlap, and how to tell which one your case needs.

## Scope of gated tools

A gated tool adds an approval step to an AI agent's tool calls, and that is all it does. You mark a tool **Requires Approval**, and the agent stops before it runs that tool until the person using the agent approves or rejects the call. It needs nothing installed beyond the agent itself.

**Gated tools cover:**

- Stopping an AI agent before it runs a tool you marked **Requires Approval**
- Every call to that tool, or only the calls an approval function picks out from the proposed arguments
- A yes or no from the person using the agent, with an optional reason that the agent reads and adjusts its plan to
- A pause that survives a restart and can resume on another replica, when the agent has a durable memory store

**Gated tools don't cover:**

- Choosing who may answer, or keeping a record of who answered and when
- Deadlines, reminders, or escalation. A pause waits until someone answers
- A decision that supplies a value, or a change to the proposed call before it runs
- A person fixing a step that failed
- Continuing a run that crashes partway through. Only the pause itself is kept
- Anything outside an AI agent

## Scope of durable workflows

Durable workflows run business processes and keep the whole run going, not only a pause, when the process restarts or crashes partway through. The run continues from where it stopped, and steps that already finished don't run again. Involving a person is one of several things a workflow can do.

**Durable workflows cover:**

- A run that continues from where it stopped after a restart or crash partway through
- Waiting for hours, days, or months on a timer, or on an event from another system
- Retrying a failed step automatically, with backoff
- A person approving a call before it runs, with the option to edit its arguments first
- A person supplying a typed decision as a step in the process
- A person fixing a step that failed
- Control over who may decide, including exclusions, and administrators who can reassign or extend a task
- Deadlines on decisions, and a record of who decided and when
- Watching and controlling runs from the Integration Control Plane or the Management API

A durable workflow can include an AI agent or not. You can wire the steps yourself, or give a durable agent capabilities and let it plan its own path. Both build styles get everything in this list.

## Where they overlap

The two features meet in one place. Both can stop a call before it runs and wait for a person to approve it. In both:

- The stop happens before the action, not after it.
- The person sees the proposed action and its arguments, not a generic prompt.
- The answer goes back into the same run, rather than starting a new one.
- The wait outlives the request that started it, and holds no thread while it waits.
- The wait can last as long as it needs to and survives a restart.

Everything else in the durable workflows scope above is theirs alone.

## When to use which

Use a gated tool when your AI agent only needs a yes or no from the person using it, before a risky tool call. Use a durable workflow when the process waits on timers or events from other systems, when it must continue after a crash partway through, or when a decision needs anything beyond that yes or no.

<HitlRoutingTable />

## How to read the comparison

Three columns, because durable workflows come in two build styles that differ in what they expose:

| Column | What it means |
|---|---|
| **Gated Tools** | An AI agent with a tool marked **Requires Approval**. No workflow runtime. The pause is kept in the agent's memory store. |
| **Durable Workflow** | A workflow whose steps you wire by hand on the diagram. No AI agent involved. |
| **Durable Agentic Workflow** | A durable agent that is given capabilities and plans its own path. |

## What the person is asked

A gated tool can ask exactly one question. A durable workflow can ask three.

| Capability | Gated Tools | Durable Workflow | Durable Agentic Workflow |
|---|---|---|---|
| **Approve or reject a proposed call** <br/> "May this run?" | **Built in**<br/>Its only shape | **Built in**<br/>An [approval policy](durable-workflow/review-activity-and-error-handling.md) on an activity call, with editable arguments | **Built in**<br/>[Requires Approval](durable-workflow/review-activity-and-error-handling.md) on a registered activity, with editable arguments |
| **Supply a typed decision** <br/> "What should happen?" | Not available | **Built in**<br/>[Await Human Task](durable-workflow/await-human-task.md) step | **Built in**<br/>A human task capability the agent raises itself |
| **Fix a step that failed** <br/> "This broke, what now?" | Not available | **Built in**<br/>[Human Review](durable-workflow/review-activity-and-error-handling.md) retry policy | **Built in**<br/>Human Review retry policy |

Only the first row is an approval. The second is a decision the process needs before it can continue, and the third is a repair.

## What the person sees and submits

| Capability | Gated Tools | Durable Workflow | Durable Agentic Workflow |
|---|---|---|---|
| **What is shown** | **Built in**<br/>Tool name, description, and the proposed arguments | **Built in**<br/>A read-only [payload](durable-workflow/await-human-task.md) beside the form | **Built in**<br/>Proposed arguments, plus a description on tasks |
| **What they submit** | **Built in**<br/>Approve or reject, with an optional reason | **Built in**<br/>A typed value from the [completion type](durable-workflow/await-human-task.md), or proceed with edited arguments on a review | **Built in**<br/>Proceed, proceed with edited arguments, or reject, and a typed result on tasks |
| **Where the form comes from** | **You build it**<br/>There is no form. Your application builds one | **Built in**<br/>Generated from the completion type | **Built in**<br/>Generated from activity parameters and the completion type |
| **Where the decision is made** | **You build it**<br/>The agent chat while you develop. In production, a surface you build | **Built in**<br/>[Control Plane](../../../icp/manage-workflows/complete-human-tasks.md) task inbox and review activities, or a surface you build on the [Management API](durable-workflow/management-api.md) | **Built in**<br/>Control Plane task inbox and review activities, or a surface you build on the Management API |

## Governance around the decision

None of this is built into gated tools. A gated tool only captures the yes or no, not who gave it or under what rules.

| Capability | Gated Tools | Durable Workflow | Durable Agentic Workflow |
|---|---|---|---|
| **Who may answer** | **You build it**<br/>Your application enforces it | **Built in**<br/>Roles or named users, matched by exact name | **Built in**<br/>Roles or named users, matched by exact name |
| **Exclusions and administrators** | Not available | **Built in**<br/>Excluded users and roles, plus administrator roles and users | **Built in**<br/>Excluded users and roles, plus administrator roles and users |
| **Who answered, recorded** | **You build it**<br/>Nothing records who answered | **Built in**<br/>Recorded, with the time of the decision and whether an administrator stepped in | **Built in**<br/>Recorded, with the time of the decision and whether an administrator stepped in |
| **Deadline on the decision** | **You build it**<br/>No expiry. A pause waits until someone answers, so production needs your own sweeper | **Built in**<br/>Per-task [timeout](durable-workflow/await-human-task.md), returned as an error the process handles | **Built in**<br/>Per-task timeout, reported to the agent so it can react |
| **Reassign, extend, step in** | Not available | **Built in**<br/>Reassign, move the deadline, or complete the task as an administrator | **Built in**<br/>Reassign, move the deadline, or complete the task as an administrator |
| **Approver inbox** | **You build it**<br/>Your application builds one | **Built in**<br/>[Control Plane](../../../icp/manage-workflows/complete-human-tasks.md), filtered to the viewer's roles, or a surface you build | **Built in**<br/>Control Plane, filtered to the viewer's roles, or a surface you build |
| **Permission model** | Not available<br/>The resume endpoint cannot authenticate its caller in process | **Built in**<br/>Scoped view and manage [permissions](../../../icp/manage-workflows/workflow-permissions.md), plus role matching | **Built in**<br/>Scoped view and manage permissions, plus role matching |

:::warning Securing your own approval surface
If you handle gated tool approvals from your own HTTP service, the `decision` resource cannot authenticate its caller in process. Terminate authentication at a gateway in front of the integration and restrict the endpoint by network policy. See [Gated Tools](../ai-integrations/agents/gated-tools.md).
:::

## The process around the decision

A gated tool has no process. It has a paused agent run, which is durable in its own right, and that is the first two rows.

| Capability | Gated Tools | Durable Workflow | Durable Agentic Workflow |
|---|---|---|---|
| **Pause survives a restart** | **Built in**<br/>With a durable [memory store](../ai-integrations/agents/memory.md#add-memory-store) | **Built in**<br/>Always | **Built in**<br/>Always |
| **Resume on another replica** | **Built in**<br/>With a shared memory store | **Built in** | **Built in** |
| **Durable timers** | Not available | **Built in**<br/>[Hours, days, or months](durable-workflow/durable-timers.md), holding no threads | **Built in**<br/>Hours, days, or months, holding no threads |
| **Wait for an external event** | Not available | **Built in**<br/>[Data events](durable-workflow/data-events.md) on named, one-way channels | **Built in**<br/>Named channels, one-way or request-response |
| **Automatic retry with backoff** | Not available | **Built in**<br/>Per-[activity](durable-workflow/activities.md) policy | **Built in**<br/>Per-activity policy |
| **Survives a crash partway through a run** | Not available<br/>The run must be sent again, and a tool that already ran can run again. The agent's memory saves the conversation only after a run finishes | **Built in**<br/>Continues from where it stopped, and finished steps don't run again | **Built in**<br/>Continues from where it stopped, and finished steps don't run again |
| **History, execution graph, reset points** | Not available<br/>Traces and spans per run, not a queryable record | **Built in**<br/>[Control Plane](../../../icp/manage-workflows/workflow-executions.md) | **Built in**<br/>Control Plane |
| **Suspend, resume, terminate a run** | Not available | **Built in** | **Built in** |
| **API for other languages** | **You build it**<br/>A JSON resume endpoint you secure yourself | **Built in**<br/>[Management API](durable-workflow/management-api.md), with JWT and OAuth2 identity | **Built in**<br/>Management API, with JWT and OAuth2 identity |
| **Works with no AI agent** | Not available<br/>Agent only | **Built in**<br/>Steps you wire by hand | Not available<br/>It is the agent |
| **Infrastructure required** | None beyond the agent's memory store | [Temporal](durable-workflow/deployment-modes.md) | Temporal |

Once a product can only ask one question, it has nowhere to put a form, a role, a deadline, or a retry, because it has no process to hang them on. A gated tool is not a small workflow. It is a pause.

## What each one needs

**Gated tools** need nothing beyond what the agent already runs. For a pause that survives a restart or resumes on another replica, give the agent a durable [memory store](../ai-integrations/agents/memory.md#add-memory-store): PostgreSQL, MSSQL, SQLite, Redis, or Amazon DynamoDB.

**Durable workflows** need:

- **Temporal.** In memory for a first run with nothing installed, a local server for development, and self-hosted or cloud for production. See [Deployment modes](durable-workflow/deployment-modes.md).
- **The Integration Control Plane**, connected to the runtime, for the task inbox, review activities, and execution views. See [Manage Workflows](../../../icp/manage-workflows/manage-workflows.md).
- **An identity provider** issuing JWT or OAuth2 tokens, so role matching and [permissions](../../../icp/manage-workflows/workflow-permissions.md) resolve against real users.

## Signs you have outgrown gated tools

If you find yourself writing code to look up who should approve, notify them, carry a correlation ID through their reply, remind them, or store an approvals table, you are building a workflow engine by hand. Durable workflows already provide all of it.

A gated tool can be resumed later from your own service. If you use one for an approval that leaves the conversation, you own all of the following:

- Resolving who should approve, and notifying them
- Authenticating the approver and enforcing who is eligible
- A scheduled sweeper, because a pause with no expiry blocks every later message in that session
- An approvals table, because nothing records who decided or when
- A form, an inbox, and a place to see what happened
- Network-level protection of the resume endpoint

## What's next

- **[Gated Tools](../ai-integrations/agents/gated-tools.md)** — Pause an agent for approval before it runs a sensitive tool.
- **[Await Human Task](durable-workflow/await-human-task.md)** — Pause a workflow for a role-based, typed decision.
- **[Error Handling and Review Activities](durable-workflow/review-activity-and-error-handling.md)** — Approval gates before a step, and human-reviewed retries after a failure.
- **[Deployment Modes](durable-workflow/deployment-modes.md)** — Run durable workflows in memory, locally, or in production.
