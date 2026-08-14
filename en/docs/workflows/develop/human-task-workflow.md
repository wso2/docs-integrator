---
sidebar_position: 5
title: "Human Task Workflows"
description: Pause WSO2 Integrator durable workflows for role-based human decisions and external data — for hours, days, or months — with zero resources held while waiting.
keywords: [wso2 integrator, durable workflow, human task, approval, human in the loop, data event, task inbox, icp]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Human Task Workflows

Real processes wait on people: a manager approves an expense, a reviewer checks documents, an employee submits missing information. A durable workflow can stop at any point, hand a **task** to a role, and resume the moment someone decides — whether that takes a minute or a month. While it waits, it holds no threads, no memory, no connections.

## Await a human task

Add an **Await Human Task** step from the palette's **Workflow → Steps** group. Give the task a name, the **roles** that may decide it, and the **payload** the decider should see:

```ballerina
RequestDecision request = check ctx->awaitHumanTask("checkExpenseRequest", "manager",
        payload = {"claimId": claim.claimId, "employee": claim.employee,
            "amount": claim.amount, "purpose": claim.purpose},
        title = string `Check expense request ${claim.claimId}`,
        description = "Review the new claim: request the supporting bills, or reject it.",
        timeout = {days: 3});
```

The workflow suspends here. The task appears in the [Integration Control Plane](../icp/managing-workflows.md) task inbox for every user holding the `manager` role, showing your title, description, and payload.

<ThemedImage
    alt="Integration Control Plane task inbox showing the checkExpenseRequest task with its payload"
    sources={{
        light: useBaseUrl('/img/workflows/develop/human-task-workflow/01-task-inbox.png'),
        dark: useBaseUrl('/img/workflows/develop/human-task-workflow/01-task-inbox.png'),
    }}
/>

## Typed decisions build the task form

The value the human submits is typed — declare a record and the Control Plane renders a matching form. Use an **enum** for the action and it becomes a dropdown:

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

When the manager submits, the workflow resumes with the decision as a plain value:

```ballerina
if request.action == REJECT {
    // notify and finish
} else {
    // ask the employee for the supporting bills
}
```

:::tip Design for the form
Whatever you put in the decision record is exactly what the decider fills in. Keep it small: an action enum, a comment, maybe a corrected amount.
:::

## Wait for external data

When the workflow needs *data* rather than a decision — the employee submits the bills, a partner system posts a confirmation — wait on a [data event](data-events.md) instead of a human task. The workflow suspends the same way and resumes when anyone holding the workflow ID delivers the value.

## A complete two-review flow

Combining tasks and data events gives the classic claim pattern — two reviews with an evidence hand-off between them:

1. **`checkExpenseRequest`** — the manager triages the new claim: request bills, or reject.
2. The employee submits bills via a [data event](data-events.md) → the workflow validates them.
3. **`reviewBills`** — the manager sees the validation result and approves or rejects the payout.

Every decision happens in the Control Plane inbox; the service exposes no task-completion endpoints.

## Timeouts

`timeout` bounds the wait. When it expires the task fails with a timeout error your workflow can handle — escalate, remind, or fail gracefully:

```ballerina
RequestDecision|error decision = ctx->awaitHumanTask("checkExpenseRequest", "manager",
        payload = ..., timeout = {days: 3});
if decision is error {
    // escalate to a different role, or end the claim
}
```

## Next steps

- [Data events](data-events.md) — wait for data delivered by a system or a person instead of a decision.
- [Review activities and error handling](review-activity-and-error-handling.md) — approvals attached to *activities* rather than free-standing tasks.
- [Integration Control Plane](../icp/managing-workflows.md) — where tasks are decided, and how roles map to users.
