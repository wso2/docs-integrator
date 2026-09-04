---
title: "Complete Human Tasks"
description: Find, decide, and fail the human tasks that durable workflows are waiting on, from the WSO2 Integration Control Plane task inbox.
keywords: [wso2 integrator, integration control plane, icp, human task, task inbox, complete task, eligible roles, approval]
sidebar_label: "Complete Human Tasks"
---

# Complete Human Tasks

When a workflow reaches a decision only a person can make, it suspends and creates a **human task**. The task appears in the **My Tasks** tab of the Integration Control Plane for everyone whose roles allow deciding it, and the workflow resumes the moment one of them submits. Nothing is held open while it waits, so a task can sit for minutes or for months.

For how workflows create these tasks, see [Await human task](../develop/human-task-workflow.md).

:::info Prerequisites

- A runtime registered with workflow management enabled ([Connect a workflow runtime](connect-runtime.md))
- The `workflow_mgt:view_human_tasks` permission to see tasks, and `workflow_mgt:manage_human_tasks` to act on them
- An ICP role whose name matches a role the task was assigned to
:::

## Find your tasks

Open **Workflows**, choose an environment, and stay on the **My Tasks** tab. Its badge counts the tasks waiting on your roles and refreshes every 30 seconds.

| Column | Description |
| --- | --- |
| **Task** | The task's title, or its name when the workflow set no title. |
| **Workflow Name** | The workflow type that created the task. |
| **Integration** | The integration that owns it. Shown at project level only. |
| **Workflow ID** | The waiting run. Click it to open that run in [Workflow executions](executions.md). |
| **Status** | Pending, Completed, Failed, or Terminated. |
| **Started** | When the task was created. |
| **Open** | Opens the task. |

The list opens filtered to **Pending**. Change the **Status** filter to review tasks that have already been decided.

A task marked **Read-only** is one you can see but not decide, because you hold no role that permits completing it.

### Task statuses

| Status | Meaning |
| --- | --- |
| **Pending** | Waiting for someone to decide it. |
| **Completed** | Someone submitted a result and the workflow resumed. |
| **Failed** | Failed explicitly through the fail action, or timed out before anyone acted. |
| **Canceled** | Retired because the parent workflow closed. |
| **Terminated** | An administrator terminated the underlying task. |

## Decide a task

Click the open icon. The dialog shows what you need in order to decide:

- **Description**, the context the workflow supplied.
- **Task Detail**, with the creation time, the **Eligible Roles** that may decide it, and every field of the task's payload, one row per value.

From there you have two actions, both of which require `workflow_mgt:manage_human_tasks`.

### Complete

**Complete** opens the decision form and **Submit Completion** sends it. The workflow resumes with your answer as a plain typed value.

The form comes from the decision type the workflow declared:

```ballerina
public enum RequestAction {
    REQUEST_BILL,
    REJECT
}

public type RequestDecision record {|
    RequestAction action;
    string comment = "";
|};
```

That record renders as a dropdown of `REQUEST_BILL` and `REJECT` for the action, and a text box for the comment. Booleans become Yes/No toggles, numbers are validated as numbers, and a nested record becomes an indented group of fields. Required fields carry a red asterisk.

When a task declares no decision type, the dialog falls back to a **Result (JSON)** box where you enter the payload by hand.

:::tip
Keep decision records small. Whatever you put in them is exactly what the decider fills in, so an action enum plus a comment usually reads better than a long form.
:::

### Fail

**Fail** ends the task without a decision. A **Reason** is required. The workflow sees the task as failed and handles it with its own error handling, for example by escalating to another role or by ending the process.

Use **Fail** when the task cannot be decided at all. To answer with a rejection that the workflow expects, complete the task with the rejecting value instead, so the workflow follows its normal rejection path.

## Who can decide a task

A workflow names the roles that may decide each task:

```ballerina
RequestDecision request = check ctx->awaitHumanTask("checkExpenseRequest", "manager",
        payload = {"claimId": claim.claimId, "amount": claim.amount},
        title = string `Check expense request ${claim.claimId}`,
        timeout = {days: 3});
```

When you open the tab, ICP sends your ICP role names to the runtime, which returns only the tasks whose eligible roles include one of them. The comparison is an exact, case-sensitive match on the role name, so the task above is visible only to users holding an ICP role named exactly `manager`.

To make that work, create the roles your workflows name, grant them the workflow permissions, and map them to the groups whose members should decide those tasks. See [Access control](../../manage/icp/access-control.md).

:::note
Permissions and roles do different jobs. `workflow_mgt:manage_human_tasks` decides whether you may act on tasks at all, and the role name decides which tasks you see. Holding the permission without a matching role shows you nothing to decide.
:::

## Tasks that time out

A workflow can bound how long it waits:

```ballerina
RequestDecision|error decision = ctx->awaitHumanTask("checkExpenseRequest", "manager",
        payload = ..., timeout = {days: 3});
```

If nobody decides in time, the task moves to **Failed** and the workflow receives a timeout error to handle. Watch the badge and the **Started** column to catch tasks that are approaching their deadline.

## What's next

- [Await human task](../develop/human-task-workflow.md) — how a workflow creates tasks and types their decisions
- [Await data events](../develop/data-events.md) — wait for data from a system or a person instead of a decision
- [Review activities](review-activities.md) — decisions attached to an activity rather than free-standing
- [Workflow executions](executions.md) — see where the waiting run is halted
- [Management API](../reference/management-api.md) — complete tasks programmatically
