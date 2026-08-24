---
sidebar_position: 1
title: "Create a Workflow"
description: Add a durable workflow artifact in WSO2 Integrator, give it an input type, and design its steps on the workflow diagram.
keywords: [wso2 integrator, durable workflow, create workflow, workflow artifact, workflow input type, workflow context]
---

# Create a Workflow

A **durable workflow** is an artifact in your integration, the same as a service or an automation. You create it once, give it the shape of the data it starts with, and then design its steps on a diagram.

## Launching the wizard 

1. In the design view, click **+ Add Artifact**.
2. On the **Artifacts** page, under **Durable Workflow**, click **Durable Workflow**.

   ![The Artifacts page with the Durable Workflow card under the Durable Workflow section](/img/workflows/develop/create-workflow/add-artifact.png)

   **Durable Agentic Workflow** beside it produces the same kind of artifact, but you describe the goal and let a model choose the steps instead of wiring them yourself. See [Create a Durable Agent](../agentic/create-durable-agent.md).

3. Fill in the **Create New Durable Workflow** form:

   | Field | Required | Description |
   |---|---|---|
   | **Name** | Yes | The workflow's identifier. It is how the workflow is referenced when it is started, and the name it appears under in workflow management. |
   | **Workflow Input Data Type** | No | The type of the data the workflow starts with, usually a record. See [Types](../../develop/integration-artifacts/supporting/types.md). |

   :::tip Design it for the launcher
   Whatever you put in this type is what every caller has to supply, including the form the [Integration Control Plane](../icp/start-workflow.md) generates for starting a run by hand. Keep it to the data the process actually needs.
   :::

   ![The Create New Durable Workflow form with Name set to orderWorkflow and Workflow Input Data Type set to OrderInfo](/img/workflows/develop/create-workflow/create-workflow-form.png)

4. Click **Create**.

The workflow opens on its own diagram with a single **Start** node, and appears under **Workflows** in the sidebar.

For a worked example that fills this in end to end, see [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md).

## Design the steps

The workflow diagram is the same flow diagram used everywhere else in WSO2 Integrator, with a group of durable steps added to the node panel:

| Group | What it holds |
|---|---|
| **Workflow** > **Steps** | [Call Activity](activities.md), [Await Human Task](human-task-workflow.md), [Await Data Event](data-events.md), and [Sleep](durable-timers.md). |
| **Workflow** > **Workflow Functions** | Replay-safe helpers: current time, whether the run is replaying, and the run's own ID and type. |
| **Statement**, **Control**, **Error Handling** | The ordinary building blocks: variables, function calls, `if`, `while`, `foreach`, and error handling. |

## Next steps

- [Start a workflow](start-workflow.md) — launch a run from a service, an automation, or the console.
- [Activities](activities.md) — the recorded units of work a workflow calls.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — the whole flow, step by step.
