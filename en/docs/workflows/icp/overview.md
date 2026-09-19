---
title: "Workflow Overview"
description: Learn how to view workflow definitions, workflow executions, and runtimes for an integration in the Integration Control Plane.
keywords: [wso2 integrator, integration control plane, workflow definitions, workflow executions, workflow runtimes]
sidebar_label: "Overview"
---

# Overview

The Integration Control Plane provides workflow management views for integrations that expose workflow definitions. From an integration overview, you can review the available workflows, open their executions, start a workflow, and view the connected runtimes.

## Open an integration overview

Select **Overview** in the console navigation to open the integration overview. From there:

1. Open the integration that contains the workflows, such as `orderprocessor`.
2. Review the environment cards shown for the integration, such as **Dev** and **Prod**. The page displays the workflow definitions available for each environment and actions for viewing workflows and runtimes.

![Integration overview showing workflow definitions, workflow actions, and runtime status](/img/workflows/icp/integration-overview.png)

The environment overview also summarizes workflow activity by status:

| Status | Description |
| --- | --- |
| **Running** | Workflow instances that are currently executing or paused. Select the status to open the execution list. |
| **Suspended** | Workflow instances paused by an operator and waiting to resume. |
| **Failed (24h)** | Workflow instances that failed within the last 24 hours. |
| **Completed (24h)** | Workflow instances that completed successfully within the last 24 hours. |
| **Pending reviews** | Workflow instances waiting for a review decision, such as an approval or a failed activity review. |
| **Pending tasks** | Human tasks waiting for action from an eligible user. |

## View workflow definitions

The **Workflow Definitions** section lists the workflows that the integration provides. Select a workflow definition to see the workflow available for execution.

Select **View Workflows** to open the **Workflow Executions** page. This page lists the executions for the selected integration and environment.

## View workflow executions

The **Workflow Executions** page lists the workflow runs for the integration. You can search for executions, review their status, and inspect individual runs.

To start a workflow, select **Start New Workflow**. The console opens the **Start Workflow** dialog, where you select a workflow definition and enter its input values. For instructions on starting a workflow, see [Start a workflow](start.md).


## What's next

- [Connect a workflow runtime](connect-runtime.md) — connect the runtime that hosts the workflows.
- [Start a workflow](start.md) — launch a new workflow execution from the console.
- [Workflow executions](executions.md) — inspect workflow runs and their progress.
