---
sidebar_position: 1
title: "Start a Workflow"
description: Launch a new durable workflow execution from the WSO2 Integration Control Plane, using the input form generated from the workflow's input type.
keywords: [wso2 integrator, integration control plane, icp, start workflow, workflow input schema, workflow id, workflow timeout]
slug: /icp/manage-workflows/start-a-workflow
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Start a Workflow

A workflow is usually started by your own integration logic, such as a service or an automation. During testing, onboarding, and day-to-day operations, you can also start one by hand from the Integration Control Plane (ICP). ICP builds the input form for you from the workflow's input type, so you do not have to write the input as JSON.

:::info Prerequisites

- A workflow registered with ICP, with a running runtime ([Manage workflows](manage-workflows.md))
- The `workflow_mgt:manage_workflows` permission on the project or integration
:::

## Where to start a workflow

1. Select **Start New Workflow**. The button is available in two places:

   - Select **Overview** in the console navigation, and then select **Start New Workflow** on the card for the environment where you want to run the workflow.
   - Select **Workflows** in the console navigation, and then select **Start New Workflow**.

2. The **Start Workflow** form opens.

3. In the **Workflow Name** field, select the workflow you want to run. The list shows the workflow definitions available in the current integration.

4. After you select a workflow, its input form appears under **Input**. A workflow that takes no input says so instead.

<ThemedImage
    alt="The Start Workflow form for orderWorkflow with each required input field flagged as required"
    sources={{
        light: useBaseUrl('/img/workflows/icp/workflow-input-validation.png'),
        dark: useBaseUrl('/img/workflows/icp/workflow-input-validation.png'),
    }}
/>

5. Required fields are marked with an asterisk. ICP checks each value you enter against the workflow's input type.

6. Enter the values for the fields shown in the form, or select **Edit as JSON** to type the input as JSON. Optionally, expand **Advanced** to set:

   - **Workflow ID**: an ID for this execution. If you leave it empty, the runtime assigns one.
   - **Timeout (seconds)**: the maximum time the whole execution can take.

7. Click **Start** to launch the workflow. The **Workflow Started** dialog shows the workflow name and the **Workflow ID** of the new execution. You can then:

   - **Copy Workflow ID** puts the ID on your clipboard, which is useful for finding this execution in logs.
   - **View Running Workflow** opens the **Workflow Executions** page, filtered to that ID.
   - **Close** closes the dialog.

8. The new execution appears in the **Workflow Executions** list with a status such as **Running**. From there, you can monitor its progress and review the details of each activity.

<ThemedImage
    alt="Starting a workflow from the Workflow Executions page and confirming the workflow ID before viewing the running workflow"
    sources={{
        light: useBaseUrl('/img/workflows/icp/start-workflow.gif'),
        dark: useBaseUrl('/img/workflows/icp/start-workflow.gif'),
    }}
/>

## What's next

- [Workflow executions](workflow-executions.md) — monitor workflow executions and inspect their status
- [Complete human tasks](complete-human-tasks.md) — handle task-based approvals or actions
- [Activities](../../develop-and-test/integration-artifacts/workflow/durable-workflow/activities.md) — review the steps recorded during workflow execution
