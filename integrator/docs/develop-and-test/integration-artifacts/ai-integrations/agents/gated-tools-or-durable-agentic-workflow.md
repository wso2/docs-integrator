---
title: Gated Tools or Durable Agentic Workflow
---

# Gated Tools or Durable Agentic Workflow

Both features can pause an AI agent so a person approves a call before it runs. A [gated tool](gated-tools.md) stops there. A [durable agentic workflow](../../workflow/durable-agentic-workflow/durable-agentic-workflow.md) can do far more. This doc exists to help you pick one: the table below shows exactly what each one covers, then what each costs to set up.

## Capability comparison

| Capability | Gated Tools | Durable Agentic Workflow |
|---|:---:|:---:|
| Pause the agent before a tool runs, for a person to approve | ✓ | ✓ |
| Reject with a reason the agent reads and plans around | ✓ | ✓ |
| Pause survives a restart and resumes on another replica | ✓¹ | ✓ |
| Pause only some calls conditionally based on the proposed arguments | ✓ | ✗ |
| Add approval to an AI agent you already have | ✓ | ✗ |
| Runs in production without a workflow engine | ✓ | ✗ |
| Edit the proposed arguments before the call runs | ✗ | ✓ |
| Ask the person for a typed value, not just yes or no | ✗ | ✓ |
| A person fixes a step that failed | ✗ | ✓ |
| Choose who may answer, by role or user | ✗ | ✓ |
| Record who decided and when | ✗ | ✓ |
| Deadline on the decision | ✗ | ✓ |
| Reassign a decision or move its deadline | ✗ | ✓ |
| Approver inbox | ✗ | ✓ |
| Pause for a fixed duration, with no person involved | ✗ | ✓ |
| Wait for an event from another system | ✗ | ✓ |
| Retry a failed step automatically | ✗ | ✓ |
| Run history and execution graph | ✗ | ✓ |

¹ With a durable memory store (see Infrastructure and setup below).

✗ means not built in. Some of these can be built with your own code.

## Infrastructure and setup

| | Gated Tools | Durable Agentic Workflow |
|---|---|---|
| **Infrastructure required** | None beyond the agent's memory store | Temporal |
| **Setup effort** | Tick **Requires Approval** on a tool you already have | Stand up Temporal |
| **Works today with no new infrastructure** | ✓ | ✗ (The module's own lightweight in-memory engine lets you try it with nothing installed, but it doesn't persist. Production needs Temporal) |

If you only need a yes or no before a tool runs and don't want to run a workflow engine, start with gated tools. If you already run durable workflows, or need anything in the capability table above beyond a yes or no, use a durable agent instead.

By default, **gated tools** need nothing beyond the agent itself. For a pause that survives a restart or resumes on another replica, attach a durable [memory store](memory.md#add-memory-store): PostgreSQL, MSSQL, SQLite, Redis, or Amazon DynamoDB.

For a first try with nothing installed, **durable agentic workflows** can run on the `ballerina/workflow` module's own lightweight in-memory engine, though it doesn't persist. For a run that survives a restart, use [Temporal](../../workflow/durable-workflow/deployment-modes.md): a local server for development, and self-hosted or cloud for production.
