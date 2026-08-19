---
sidebar_position: 2
title: "Start a Workflow"
description: Launch a durable workflow run from a service or an automation with the Run Workflow step, keep its ID, and read the result when it finishes.
keywords: [wso2 integrator, durable workflow, start workflow, run workflow, workflow id, workflow result, entry point]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Start a Workflow

A workflow does not start itself. Something has to launch it. It can be any type of trigger: a service resource that receives a request, an automation that runs on a schedule, a file handler on file receive or an operator starting one by hand. Whatever the trigger, starting a run returns a **workflow ID**, and that ID is the handle to the run from then on.

<ThemedImage
    alt="A POST resource that starts a workflow: a Run Workflow step capturing workflowId, with a link across to the orderWorkflow it starts, followed by a Return of that same workflowId"
    sources={{
        light: useBaseUrl('/img/workflows/develop/start-workflow/run-workflow-light.png'),
        dark: useBaseUrl('/img/workflows/develop/start-workflow/run-workflow-dark.png'),
    }}
/>

## Start one from an integration

1. In the trigger artifact flow design, click **+**.
2. In the node panel, under **Workflow**, click **Run Workflow**.

   ![The node panel with Run Workflow and Send Data Event under the Workflow group](/img/workflows/develop/start-workflow/run-workflow-node.png)

3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Input** | Yes | The data the workflow starts with. It must match the workflow's [input type](create-workflow.md). Pick the request payload from **Inputs** in the value helper. |
   | **Workflow ID Variable Name** | Yes | The variable that receives the ID of the started run. |

4. Click **Save**.

![Adding a Run Workflow step and following its link to the workflow it starts](/img/workflows/develop/start-workflow/add-run-workflow.gif)

The step is drawn with an arrow across to the workflow it starts, so an entry point shows at a glance which process it kicks off. Click that marker to open the workflow itself.

## Starting returns immediately

**Run Workflow** starts the run and returns its ID straight away. It does not wait for the workflow to finish, and that is the point: a durable workflow may sit on a [human task](human-task-workflow.md) or a [data event](data-events.md) for days, and no caller should be held open for that.

So hand the ID back to whoever will need it:

- Return it in the response, so the caller can ask about the run later.
- Store it against your own record, such as the order row, so the process can be traced from your data.
- Include it in the callback URL you give a partner system, so the value they post [comes back to the right run](data-events.md).

## Other ways to start a run

| Route | Use it for                                                                             |
|---|----------------------------------------------------------------------------------------|
| [Integration Control Plane](../icp/start-workflow.md) | Starting a run by hand from a generated form, for testing, onboarding, and operations. |
| [Management API](../reference/management-api.md) | `POST /workflows` for custom portals and automation of your own.                       |

## Next steps

- [Await data events](data-events.md) — deliver data into a run using the ID you kept.
- [Workflow executions](../icp/executions.md) — follow a started run through its timeline and execution graph.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — a service resource that starts a workflow, end to end.
