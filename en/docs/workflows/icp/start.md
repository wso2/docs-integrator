---
title: "Start a Workflow"
description: Launch a new durable workflow execution from the WSO2 Integration Control Plane, using the input form generated from the workflow's input type.
keywords: [wso2 integrator, integration control plane, icp, start workflow, workflow input schema, workflow id, workflow timeout]
sidebar_label: "Start a Workflow"
---

# Start a Workflow

Workflows usually start from your own integration logic, but during testing, onboarding, and day-to-day operations it is useful to launch one by hand. The Integration Control Plane can start any workflow the runtime advertises and builds the input form for you from the workflow's input type, so you do not have to hand-write JSON.

:::info Prerequisites

- A runtime registered with workflow management enabled ([Connect a workflow runtime](connect-runtime.md))
- The `workflow_mgt:manage_workflows` permission on the project or integration
:::

## Where to start a workflow

1. Select **Start New Workflow**. The button is available in two places:

   - Select **Overview** in the console navigation, and then select **Start New Workflow** on the card for the environment where you want to run the workflow.
   - Select **Workflows** in the console navigation, and then select **Start New Workflow**.

2. Then **Start Workflow** form opens.

3. In the **Workflow Name** field, select the workflow you want to run. The list shows the workflow definitions available in the current integration.

4. After you select a workflow, the input form for that workflow appears in the dialog.

![Workflow input form showing field validation](/img/workflows/icp/workflow-input-validation.png)

5. The form is validated according to the workflow input type. Required fields are marked with an asterisk.

6. Enter the values for the fields shown in the form. If the workflow defines additional options, they can appear under **Advanced**.

7. Click **Start** to launch the workflow. After you click **Start**, the console shows a confirmation message with the workflow name and the generated workflow ID.
You can then:

   - **Copy Workflow ID** puts the ID on your clipboard, which is useful for correlating logs.
   - **View Running Workflow** opens the **Workflow Executions** tab filtered to that ID.
   - **Close** returns to the list.

8. Then workflow is started and appears in the **Workflow Executions** list with a status such as **Running**. You can then inspect the execution, monitor its progress, and review activity details.

![Starting a workflow from the Workflow Executions page and confirming the workflow ID before viewing the running workflow](/img/workflows/icp/start-workflow.gif)

## What's next

- [Workflow executions](executions.md) — monitor workflow runs and inspect their status
- [Complete human tasks](human-tasks.md) — handle task-based approvals or actions
- [Activities](../develop/activities.md) — review the steps recorded during workflow execution
