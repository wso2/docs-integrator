---
sidebar_position: 6
title: "Await Human Task"
description: Pause a WSO2 Integrator durable workflow until a person with the right role decides, with the decision returned as a typed value.
keywords: [wso2 integrator, durable workflow, human task, await human task, approval, human in the loop, task inbox, icp]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Await Human Task

Real processes wait on people: a manager approves an expense, a reviewer checks documents, an HR lead assigns a new joiner to a team. An **Await Human Task** step stops the workflow at exactly that point, hands a task to a role, and resumes the moment someone submits a decision, whether that takes a minute or a month. While it waits it holds no threads, no memory, and no connections.

<ThemedImage
    alt="The employeeOnboarding workflow halted on an Await Human Task step whose result is HRFeedback, with a dashed arrow arriving from an HRManager role marker"
    sources={{
        light: useBaseUrl('/img/workflows/develop/human-task-workflow/await-human-task-light.png'),
        dark: useBaseUrl('/img/workflows/develop/human-task-workflow/await-human-task-dark.png'),
    }}
/>

## Add the step

The steps below follow one example: an onboarding workflow where an HR lead assigns a new joiner to a team. The task lands in the [Control Plane](../icp/human-tasks.md) inbox of the matching role, as a form rendered with the information needed to answer it. The workflow starts with the employee's details, so its [input type](create-workflow.md) is an `EmployeeDetails` record:

| Field | Type |
|---|---|
| `id` | `string` |
| `name` | `string` |

1. On the workflow diagram, click **+** where the workflow should wait.
2. In the node panel, under **Workflow** > **Steps**, click **Await Human Task**.
3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Task Name** | Yes | Identifies the task type, for example `Assign Employee to Team`. |
   | **User Roles** | Yes | One or more roles permitted to complete this task, for example `HRManager`. Only users holding a matching role see the task. |
   | **Payload** | No | Under **Advanced Configurations**. See [Show the decider what they need](#show-the-decider-what-they-need). |
   | **Title** | No | Under **Advanced Configurations**. Short summary shown in the inbox, for example `Assign Employee to Team`. |
   | **Description** | No | Under **Advanced Configurations**. Additional context shown alongside the form, for example `Assign the new employee to the appropriate team and select their team lead.` |
   | **Timeout** | No | Under **Advanced Configurations**. Maximum time to wait. Omit it to wait indefinitely. |
   | **Result** | Yes | Name of the variable that receives the decision. |
   | **Completion Type** | Yes | The type of the data returned when the task is completed. See [Type the decision](#type-the-decision). |

4. Click **Save**.

![Adding an Await Human Task step, with its payload, title, description, and a new completion type](/img/workflows/develop/human-task-workflow/await-human-task.gif)

The workflow suspends at this step, and the task appears in the [Integration Control Plane](../icp/human-tasks.md) inbox for every user holding one of the roles you named.

## Show the decider what they need

**Payload** is the context the person answering needs, rendered read-only next to the form. It answers "what am I deciding about?", which the decision form itself cannot.

In the onboarding example that is the employee, so **Payload** is set to the workflow's input, the `EmployeeDetails` record. The new joiner's ID and name then appear alongside the form when the task is completed in the Control Plane.

:::tip Payload is not the decision
Nothing in the payload comes back to the workflow. It is there to inform the person, while the value they submit is governed by **Completion Type** below.
:::

## Type the decision

**Completion Type** is what the workflow gets back, and it is also what the Control Plane renders the form from. A plain approve or reject can be a `boolean`, while anything richer wants a record.

For the onboarding task, the HR lead answers with a team and a team lead:

| Field | Type |
|---|---|
| `team` | `string` |
| `lead` | `string` |

That record produces a two-field form in the inbox, and the workflow resumes with the values as an ordinary typed value. Records created this way are ordinary types, editable later from **Types** in the sidebar. See [Types](../../develop/integration-artifacts/supporting/types.md) for the type editor and the kinds it supports.

:::tip Design for the form
Whatever you put in the completion type is exactly what the decider fills in. Keep it small: an action, a comment, maybe a corrected value. Use an enum for a fixed set of choices and the Control Plane renders it as a dropdown.
:::

## Bound the wait

**Timeout** limits how long the task can sit unanswered. When it expires the wait returns an error, which the workflow can handle: escalate to another role, send a reminder, or end the process. Omit it and the task waits indefinitely.

## Decision or data?

Use a human task when a person is making a **decision** the Control Plane should render as a form. When the workflow needs **content** instead, such as an uploaded document or a partner system's confirmation, [await a data event](data-events.md), which suspends the same way but is filled by whoever holds the workflow ID.

## How these tasks are completed

A workflow never exposes its own endpoint for finishing a task. Completion happens outside the workflow, in one of two places:

- **[Complete human tasks](../icp/human-tasks.md)** in the Integration Control Plane, where the task appears in the inbox of everyone holding a matching role, rendered as a form built from the completion type with the payload shown beside it. This is the route for the people actually deciding.
- **[Management API](../reference/management-api.md)**, whose `POST /human-tasks/{taskId}/complete` accepts the same decision as JSON, for building your own portal or automating a decision.

## Next steps

- [Complete human tasks](../icp/human-tasks.md) — decide a waiting task from the Control Plane inbox.
- [Await data events](data-events.md) — wait for data delivered by a system or a person instead of a decision.
- [Error handling and review activities](review-activity-and-error-handling.md) — approvals attached to activities rather than free-standing tasks.
