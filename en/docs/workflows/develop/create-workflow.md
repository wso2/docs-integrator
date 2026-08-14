---
sidebar_position: 1
title: "Create a Workflow"
description: Add a durable workflow artifact in WSO2 Integrator, give it an input type, and design its steps on the workflow diagram.
keywords: [wso2 integrator, durable workflow, create workflow, workflow artifact, workflow input type, workflow context]
---

# Create a Workflow

A **durable workflow** is an artifact in your integration, the same as a service or an automation. You create it once, give it the shape of the data it starts with, and then design its steps on a diagram. Everything the workflow does from there is recorded, so a restart replays the record rather than redoing the work.

## Add the artifact

1. In the design view, click **+ Add Artifact**.
2. On the **Artifacts** page, under **Durable Workflow**, click **Durable Workflow**.
3. Fill in the **Create New Durable Workflow** form:

   | Field | Required | Description |
   |---|---|---|
   | **Name** | Yes | The workflow's identifier. It is how the workflow is referenced when it is started, and the name it appears under in workflow management. |
   | **Workflow Input Data Type** | No | The type of the data the workflow starts with. Defaults to `anydata`. |

4. Click **Create**.

The workflow opens on its own diagram with a single **Start** node, and appears under **Workflows** in the sidebar.

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInfo input) returns error? {
}
```

For a worked example that fills this in end to end, see [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md).

## Give it an input type

**Workflow Input Data Type** is what a caller passes when it starts a run, so it is usually a record of the business data the process needs: the order, the claim, the ticket.

Clicking the field opens a list of the types already in the project, with two actions at the bottom:

- **+ Create New Type** opens the type editor so you can define the record without leaving the form. It is an ordinary record afterwards, editable from **Types** in the sidebar.
- **Open Type Browser** searches the wider set of types available to the project.

Leave the field empty for a workflow that needs no input.

:::tip Design it for the launcher
Whatever you put in this type is what every caller has to supply, including the form the [Integration Control Plane](../icp/start-workflow.md) generates for starting a run by hand. Keep it to the data the process actually needs.
:::

## The workflow context

Every workflow function takes a `workflow:Context` parameter, `ctx`. You never add it yourself: the IDE writes it in the first time you add a step that needs it.

The context is what makes a step durable. Calls made through it are recorded by the runtime, so `ctx->callActivity(...)` is replayed from the record after a restart, while an ordinary function call in the workflow body simply runs again. That distinction is the subject of [Activities](activities.md).

The signature also grows on its own as you design. Adding an [Await Data Event](data-events.md) step, for example, adds a generated record of `future` fields to the parameters, one per event the workflow waits on.

## Design the steps

The workflow diagram is the same flow diagram used everywhere else in WSO2 Integrator, with a group of durable steps added to the node panel:

| Group | What it holds |
|---|---|
| **Workflow** > **Steps** | [Call Activity](activities.md), [Await Human Task](human-task-workflow.md), [Await Data Event](data-events.md), and [Sleep](durable-timers.md). |
| **Workflow** > **Workflow Functions** | Replay-safe helpers: current time, whether the run is replaying, and the run's own ID and type. |
| **Statement**, **Control**, **Error Handling** | The ordinary building blocks: variables, function calls, `if`, `while`, `foreach`, and error handling. |

**Show More Functions** at the bottom of the panel reaches the rest of the functions available to the project, such as `log:printInfo`.

Use the **Flow** and **Sequence** toggle in the top right to switch between the branching diagram and a sequence view of the same workflow.

:::warning Keep the workflow body deterministic
Everything outside a durable step runs again on replay. No direct API calls, no random values, and no wall-clock reads in the workflow body. Put that work in an [activity](activities.md), or use the replay-safe helpers under **Workflow Functions**.
:::

## Next steps

- [Start a workflow](start-workflow.md) — launch a run from a service, an automation, or the console.
- [Activities](activities.md) — the recorded units of work a workflow calls.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — the whole flow, step by step.
