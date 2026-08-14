---
sidebar_position: 6
title: "Review Activities & Error Handling"
description: Gate risky workflow steps behind human approval and turn failures into human-reviewed retries in WSO2 Integrator durable workflows.
keywords: [wso2 integrator, durable workflow, review activity, retry, error handling, approval gate, human review]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Review Activities & Error Handling

Failures and risky steps are where durable workflows earn their keep. Instead of scattering try/catch blocks and retry loops through your code, you attach a **retry policy** to each activity call — and for the steps that matter most, you put a **human review** in front of the step or behind its failure.

## The three retry policies

Every activity call takes a **Retry Policy**, chosen in the call's form:

| Policy | What happens on failure |
| --- | --- |
| **No Automatic Retry** (default) | The error returns to your workflow logic — handle it with normal Ballerina `check`/`if` handling. |
| **Auto Retry** | The engine re-executes the activity with configurable attempts, delay, and backoff. |
| **Human Review** | A **review task** is created for the roles you name. The reviewer can retry as-is, retry with corrected input, or fail the step. |

<ThemedImage
    alt="Call Activity form with the Retry Policy dropdown showing No Automatic Retry, Auto Retry, and Human Review"
    sources={{
        light: useBaseUrl('/img/workflows/develop/review-activity/01-retry-policy-form.png'),
        dark: useBaseUrl('/img/workflows/develop/review-activity/01-retry-policy-form.png'),
    }}
/>

### Auto Retry — for transient failures

```ballerina
string _ = check ctx->callActivity(notifyEmployee,
        {"claimId": claim.claimId, "message": "Your claim was approved."},
        retryPolicy = {maxRetries: 3, retryDelay: 2, retryBackoff: 2.0});
```

A flaky notification service recovers transparently; the workflow never sees the intermediate failures.

### Human Review — when a person should fix it

The roles **are** the policy — name who may decide the retry:

```ballerina
string paymentRef = check ctx->callActivity(makePayment,
        {"claimId": claim.claimId, "amount": claim.amount, "currency": claim.currency},
        retryPolicy = "manager");   // one role, or ["manager", "finance"]
```

When `makePayment` fails (say, the gateway rejects the currency), a **review task** appears in the [Control Plane](../icp/managing-workflows.md) inbox for managers, showing the failing input and the error. The reviewer chooses:

- **Proceed** — rerun with the same input.
- **Proceed with input** — rerun with corrected input (the form is generated from the activity's parameters, pre-filled with the failing values — fix the currency and retry).
- **Reject** — surface the original error to the workflow, which handles it like any other error.

<ThemedImage
    alt="Review task in the Control Plane showing the failed makePayment input with Proceed, Proceed with input, and Reject"
    sources={{
        light: useBaseUrl('/img/workflows/develop/review-activity/02-review-task.png'),
        dark: useBaseUrl('/img/workflows/develop/review-activity/02-review-task.png'),
    }}
/>

## Approval gates — review *before* the step runs

Some steps should never run without sign-off, even when nothing has failed. On a durable agent's activity, enable **Requires Approval** with **Reviewer Roles**:

```ballerina
activities: [
    validateClaim,
    {activity: payClaim, requiresApproval: true, userRoles: "manager"}
]
```

Before every `payClaim` call the agent pauses and a review task shows the *proposed* input. The manager can proceed, edit the input, or reject the call — the same three decisions as a failure review, just before the step instead of after it.

## Error handling in the workflow logic

Retry policies handle the step; your workflow logic handles the outcome. Because activities return ordinary Ballerina values and errors, error handling looks like normal code:

```ballerina
string|error paymentRef = ctx->callActivity(makePayment,
        {"claimId": claim.claimId, "amount": claim.amount}, retryPolicy = "manager");
if paymentRef is error {
    // the reviewer chose Reject — compensate and finish cleanly
    string _ = check ctx->callActivity(notifyEmployee,
            {"claimId": claim.claimId, "message": "Payment could not be completed."});
    return {claimId: claim.claimId, status: "PAYMENT_FAILED"};
}
```

Because completed activities are never re-executed, compensation logic only ever deals with the step that actually failed — everything before it is already safely recorded.

## Choosing a policy

| Situation | Policy |
| --- | --- |
| Flaky downstream, safe to repeat | Auto Retry |
| Bad input a person could correct | Human Review |
| Risky/irreversible step (payments, deletions) | Approval gate (`requiresApproval`) |
| Business-level failure with a fallback path | No Automatic Retry + workflow logic |

## Next steps

- [Human task workflows](human-task-workflow.md) — free-standing decisions and external data.
- [Durable agentic workflows](durable-agentic-workflow.md) — the same policies applied to an AI agent's activities.
