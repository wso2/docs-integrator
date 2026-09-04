---
title: "Review Activities"
description: Approve, correct, or reject a gated or failed workflow activity from the WSO2 Integration Control Plane.
keywords: [wso2 integrator, integration control plane, icp, review activity, approval gate, retry review, proceed with input, reject]
sidebar_label: "Review Activities"
---

# Review Activities

A review activity is a decision attached to an activity rather than a free-standing task. A workflow raises one in two situations: before a sensitive step runs, so a person can approve it, and after a step fails, so a person can decide whether to try again. Both land on the **Review Activities** tab, where you can see the arguments the step would run with, correct them, and let it proceed, or reject it and hand the outcome back to the workflow.

For how workflows declare these gates, see [Error handling and review activities](../develop/review-activity-and-error-handling.md).

:::info Prerequisites

- A runtime registered with workflow management enabled ([Connect a workflow runtime](connect-runtime.md))
- The `workflow_mgt:view_workflows` permission to browse reviews, and `workflow_mgt:manage_workflows` to decide them
:::

## The two kinds of review

| Trigger | Raised | What you are deciding |
| --- | --- | --- |
| Approval gate | Before the activity runs | Whether this call should be made at all, and with which arguments. |
| Rerun decision | After the activity failed | Whether to run it again, with the original or corrected arguments, or to let the failure reach the workflow. |

The difference matters when you read the detail: an approval gate shows a proposed call, while a rerun decision also shows the error that the previous attempt produced.

## Browse reviews

Open **Workflows**, choose an environment, and go to the **Review Activities** tab. The tab badge counts the reviews waiting for a decision, and refreshes every 30 seconds. It reads `50+` when more are pending than a single page reports.

| Column | Description |
| --- | --- |
| **Activity Name** | The activity being reviewed. |
| **Workflow Name** | The workflow type that raised the review. |
| **Integration** | The integration that owns it. Shown at project level only. |
| **Workflow ID** | The run that is waiting. Click it to open that run in [Workflow executions](executions.md). |
| **Status** | Pending, Completed, Canceled, or Terminated. A review that nobody decided before it timed out reports Failed. |
| **Started** | When the review was created. |
| **View** | Opens the review. |

The list opens filtered to **Pending**, because that is the work waiting on you. Change the **Status** filter to look back at decided reviews. You can also filter by workflow name, by integration at project level, by a time range, and search by workflow ID. **Clear** resets everything back to Pending.

:::note
Rejecting a review completes it. There is no separate rejected status, so a rejected review appears under **Completed** with its decision recorded.
:::

## Decide a review

Click the view icon to open the review.

The dialog shows:

- **Description**, the context the workflow supplied for the reviewer.
- **Activity Detail**, with the task name, workflow name, parent workflow ID, and creation time. For a rerun decision it also shows the **Error** from the failed attempt.
- **The arguments**, rendered as a form generated from the activity's parameters and pre-filled with the values the activity would run with. Where no form can be derived, the arguments are shown as JSON instead.

You then have two decisions.

### Proceed

**Proceed** runs the activity with the values currently in the form. The fields are editable, so correcting the input and clicking **Proceed** is how you fix a bad argument before the step runs or after it failed.

Leave the form untouched to run the step exactly as proposed. Field-level messages appear under any value that does not match the expected type, and a constraint the runtime rejects is reported in a banner at the top of the dialog, with your edits preserved.

### Reject

**Reject** skips the call. Enter an optional **Feedback** note, which is relayed to the workflow as the rejection reason, then click **Submit Rejection**.

What rejection means to the run depends on the trigger. An approval gate that you reject does not make the call, and the workflow continues along its rejection path. A rerun decision that you reject surfaces the original failure to the workflow, which then handles it with its own error handling.

:::warning
Only a pending review can be decided. Once a review is completed, canceled, or terminated, the dialog is read-only and the decision buttons are gone. The buttons are also hidden from users without `workflow_mgt:manage_workflows`.
:::

## Who sees which review

A review that declares roles is listed only for users holding one of them, matched by exact role name, in the same way as [human tasks](human-tasks.md#who-can-decide-a-task).

Reviews raised by a failing activity are created without role restrictions, so they are visible to any user who can open the tab. To restrict them, set `reviewActivityAccessRole` in the runtime's `[ballerina.workflow.management]` configuration to the role a caller must hold:

```toml
[ballerina.workflow.management]
enableManagementApi = true
reviewActivityAccessRole = "support-lead"
```

Reviews that declare their own roles always require a matching role, whatever this setting is.

## What's next

- [Error handling and review activities](../develop/review-activity-and-error-handling.md) — how a workflow declares approval gates and retry reviews
- [Complete human tasks](human-tasks.md) — free-standing decisions that a workflow waits on
- [Workflow executions](executions.md) — see the review in the run's timeline and execution graph
- [Management API](../reference/management-api.md) — decide reviews programmatically
