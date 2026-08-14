---
sidebar_position: 2
title: "Start a Workflow"
description: Launch a durable workflow run from a service or an automation with the Run Workflow step, keep its ID, and read the result when it finishes.
keywords: [wso2 integrator, durable workflow, start workflow, run workflow, workflow id, workflow result, entry point]
---

# Start a Workflow

A workflow does not start itself. Something has to launch it: a service resource that receives a request, an automation that runs on a schedule, or an operator starting one by hand. Whatever the trigger, starting a run returns a **workflow ID**, and that ID is the handle to the run from then on.

## Start one from an integration

Add a **Run Workflow** step to the entry point that should launch it.

1. In a service resource or an automation, click **+**.
2. In the node panel, under **Workflow**, click **Run Workflow**.
3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Input** | Yes | The data the workflow starts with. It must match the workflow's input type. |
   | **Workflow ID Variable Name** | Yes | The variable that receives the ID of the started run. |

4. Click **Save**.

```ballerina
import ballerina/workflow;

service /orders on httpDefaultListener {

    resource function post .(OrderInfo payload) returns json|error {
        string workflowId = check workflow:run(orderWorkflow, payload);
        return workflowId;
    }
}
```

The step is drawn with an arrow across to the workflow it starts, so an entry point shows at a glance which process it kicks off.

## Starting returns immediately

`workflow:run` starts the run and returns its ID straight away. It does not wait for the workflow to finish, and that is the point: a durable workflow may sit on a [human task](human-task-workflow.md) or a [data event](data-events.md) for days, and no caller should be held open for that.

So hand the ID back to whoever will need it:

- Return it in the response, as above, so the caller can ask about the run later.
- Store it against your own record, such as the order row, so the process can be traced from your data.
- Include it in the callback URL you give a partner system, so the value they post [comes back to the right run](data-events.md).

:::warning Losing the ID orphans the run
Nothing else identifies the instance. A run whose ID was never kept still executes, but no code can deliver its data events or complete its tasks. Supply your own ID when you want it to be predictable, for example the order number.
:::

## Wait for the result

When the caller genuinely needs the outcome, and the workflow is short enough to wait for, read it with the run's ID:

```ballerina
string workflowId = check workflow:run(orderWorkflow, payload);
anydata result = check workflow:getWorkflowResult(workflowId, 60);
```

The second argument is how many seconds to wait, defaulting to 30. The call returns an error if the workflow has not finished by then, which leaves the run untouched and still going. Reserve this for workflows measured in seconds, and let long-running processes report their outcome another way, such as the confirmation email or a callback of your own.

## Other ways to start a run

| Route | Use it for |
|---|---|
| **Run Workflow** step | Production traffic: a service, an automation, or another workflow. |
| [Integration Control Plane](../icp/start-workflow.md) | Starting a run by hand from a generated form, for testing, onboarding, and operations. |
| [Management API](../reference/management-api.md) | `POST /workflows` for custom portals and automation of your own. |

## Next steps

- [Data events](data-events.md) — deliver data into a run using the ID you kept.
- [Workflow executions](../icp/executions.md) — follow a started run through its timeline and execution graph.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — a service resource that starts a workflow, end to end.
