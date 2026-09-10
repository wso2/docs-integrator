---
title: Durable Workflows Overview
description: Build long-running, crash-safe business processes with WSO2 Integrator using durable workflows, human tasks, events, and durable AI agents.
keywords: [wso2 integrator, durable workflow, workflow, human task, agentic workflow, durable agent, temporal, long running, crash recovery]
sidebar_label: Overview
slug: /workflows/overview
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Durable Workflows

Most integrations start simple and end up long-lived: an order needs a manager's approval, a claim waits days for supporting documents, a payment needs a retry after a gateway hiccup. A normal program loses everything when the process restarts — a **durable workflow does not**.

<ThemedImage
    alt="The orderWorkflow diagram: Start, the reserveInventory activity, a Wait for paymentInfo node fed from outside the flow, the sendConfirmationEmail activity, and the end node"
    sources={{
        light: useBaseUrl('/img/workflows/overview/workflow-diagram-light.png'),
        dark: useBaseUrl('/img/workflows/overview/workflow-diagram-dark.png'),
    }}
/>

A Workflow is a step-by-step process which completes a larger task. WSO2 Integrator lets you design workflows that: 

- **Survive crashes and restarts** — every completed step is recorded, and the workflow resumes exactly where it left off. A finished step is never re-executed.
- **Wait for as long as it takes** — pause for hours, days, or months for a human decision or an external event, consuming no threads or memory while suspended.
- **Recover from failures** — retry failed steps automatically, or hand the failure to a human who can fix the input and retry.
- **Keep humans in the loop** — assign role-based tasks that people decide from the [Integration Control Plane](icp/managing-workflows.md) task inbox.

## Two ways to build, one durable runtime

| Durable Workflow | Durable Agentic Workflow                                             |
| --- |----------------------------------------------------------------------|
| You wire the steps together in a visual flow | You describe the goal in natural language; an AI model decides the steps |
| Explicit, predictable path | Adapts to each request at runtime                                    |
| Best for known, fixed business logic | Best for branchy, hard-to-enumerate logic                            |

Both run on the same durable runtime, so an AI agent gets crash-safety, human tasks, timers, and retries for free.

## Getting started

- **[Build an Order Processing Workflow](getting-started/build-an-order-processing-workflow.md):** Your first durable workflow — it reserves inventory, waits for a payment confirmation, and then confirms or cancels the order.
- **[Build a Claim Handling Agent](getting-started/build-a-claim-workflow-agent.md):** A durable agentic workflow — an agent that validates expense claims and pays them out only after a Finance reviewer approves.

## Develop workflows

- **[Create a workflow](develop/create-workflow.md):** Add the artifact, give it an input type, and design its steps on the diagram.
- **[Start a workflow](develop/start-workflow.md):** Launch a run from a service or an automation, and keep the ID that identifies it.
- **[Activities](develop/activities.md):** The recorded units of work in a workflow — exactly-once on replay and retryable on failure.
- **[Durable timers](develop/durable-timers.md):** Pause for hours, days, or months with a wait that survives restarts and holds no resources.
- **[Await data events](develop/data-events.md):** Wait until an external system or a person delivers the data the workflow needs, then resume with it.
- **[Send a data event](develop/send-data-event.md):** Deliver a value into a waiting run, using the workflow ID it was started with.
- **[Await human task](develop/human-task-workflow.md):** Pause for role-based human decisions and external data, for as long as it takes.
- **[Error handling and review activities](develop/review-activity-and-error-handling.md):** Approval gates before risky steps and human-reviewed retries after failures.
- **[Prebuilt activities](develop/prebuilt-activities/index.md):** Durable REST, SOAP, and email calls with no wrapper to write.

## Develop agentic workflows

- **[Create a durable agent](agentic/create-durable-agent.md):** Describe the goal in natural language, and give the agent activities, data events, and human tasks as its capabilities.
- **[Run a durable agent](agentic/run-durable-agent.md):** Start an agent instance from an integration flow, and bind the instance ID the rest of the flow needs.
- **[Send an agent data event](agentic/send-agent-data-event.md):** Deliver one turn on a channel the running agent listens on, and keep the correlation token it returns.
- **[Get a data event result](agentic/get-data-event-result.md):** Read the agent's answer to a sent turn, using that correlation token.
- **[Get an agent result](agentic/get-agent-result.md):** Read what an agent instance finally produced, addressed by its instance ID.

## Manage running workflows

- **[Integration Control Plane](icp/managing-workflows.md):** Where workflow management lives in the console, and the permissions and roles that control each view.
- **[Connect a workflow runtime](icp/connect-runtime.md):** Register an integration so its workflows, tasks, and reviews appear in the console.
- **[Start a workflow](icp/start-workflow.md):** Launch an execution from a form generated out of the workflow's input type.
- **[Workflow executions](icp/executions.md):** Follow a run through its timeline, execution graph, and history, and suspend, resume, or terminate it.
- **[Complete human tasks](icp/human-tasks.md):** Decide the tasks a workflow is waiting on, from the task inbox.
- **[Review activities](icp/review-activities.md):** Approve, correct, or reject an activity before it runs or after it fails.

## Reference

- **[Management API](reference/management-api.md):** The REST API behind the Control Plane — list instances, read execution graphs, and complete tasks programmatically.
