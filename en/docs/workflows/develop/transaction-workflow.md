---
sidebar_position: 1
title: "Transaction Workflows"
description: Wire activities into reliable, crash-safe transaction workflows in WSO2 Integrator with exactly-once recording, automatic retries, and durable timers.
keywords: [wso2 integrator, durable workflow, transaction, activity, retry, timer, crash recovery]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Transaction Workflows

A transaction workflow is a multi-step business process where every step must happen reliably — validate the order, charge the card, reserve the stock, send the confirmation. A durable workflow makes that sequence crash-safe: each completed step is recorded, a restart replays the record instead of redoing the work, and a failed step can retry without touching the steps that already succeeded.

## Create a workflow

1. In the design view, select **+ Add Artifact**.
2. Under **Durable Workflow**, select **Durable Workflow**.
3. Give it a name (for example `orderWorkflow`) and optionally a **Workflow Input Data type**.
4. Select **Create** — the workflow diagram opens.

<ThemedImage
    alt="Durable Workflow creation form with the name and input data type fields"
    sources={{
        light: useBaseUrl('/img/workflows/develop/transaction-workflow/01-create-workflow.png'),
        dark: useBaseUrl('/img/workflows/develop/transaction-workflow/01-create-workflow.png'),
    }}
/>

The generated function is a normal Ballerina function with a workflow context — you design its logic in the same flow diagram used for any integration, with `if`/`else` branches, loops, and variables:

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInput input) returns OrderResult|error {
}
```

## Activities: the reliable units of work

Anything that touches the outside world — an API call, a database write, an email — belongs in an **activity**. The workflow calls activities through the context, and the runtime records each result:

- A **completed activity is never re-executed** on replay; its recorded result is reused, even across process crashes.
- A **failed activity** can retry (see below) without repeating earlier steps.

Add a step with **Call Activity** from the palette's **Workflow → Steps** group, then pick or create the activity function:

```ballerina
@workflow:Activity
function chargeCard(string orderId, decimal amount) returns string|error {
    // call the payment gateway
}
```

```ballerina
@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInput input) returns OrderResult|error {
    boolean valid = check ctx->callActivity(validateOrder, {"input": input});
    if !valid {
        return {orderId: input.orderId, status: "INVALID"};
    } else {
        string paymentRef = check ctx->callActivity(chargeCard,
                {"orderId": input.orderId, "amount": input.amount});
        string _ = check ctx->callActivity(sendConfirmation,
                {"orderId": input.orderId, "paymentRef": paymentRef});
        return {orderId: input.orderId, status: "COMPLETED", paymentRef};
    }
}
```

<ThemedImage
    alt="Workflow diagram showing validate, charge, and confirmation activities wired with an if/else branch"
    sources={{
        light: useBaseUrl('/img/workflows/develop/transaction-workflow/02-flow-diagram.png'),
        dark: useBaseUrl('/img/workflows/develop/transaction-workflow/02-flow-diagram.png'),
    }}
/>

:::tip Idempotent side effects
A *completed* activity never runs twice. A *failed* attempt may run again when retries are enabled — make the activity's side effects idempotent (for example, pass an idempotency key to the payment gateway) when you turn retries on.
:::

## Automatic retries

Transient failures — a flaky network, a rate limit — should not fail the whole transaction. Set the **Retry Policy** on the activity call to **Auto Retry**:

```ballerina
string paymentRef = check ctx->callActivity(chargeCard,
        {"orderId": input.orderId, "amount": input.amount},
        retryPolicy = {maxRetries: 3, retryDelay: 2, retryBackoff: 2.0});
```

The engine retries with backoff; the workflow code stays clean of retry loops. For failures that need a human decision, see [Review activities and error handling](review-activity-and-error-handling.md).

## Durable timers

Need to wait before a step — a cooling-off period, a settlement delay? Use the **Sleep** step. A durable sleep survives restarts and consumes nothing while waiting:

```ballerina
check ctx->sleep({hours: 24});
```

:::warning
Never use `runtime:sleep()` inside a workflow — it blocks a thread and is lost on restart. Always use the workflow context's durable sleep.
:::

## Start a workflow and read its result

Workflows start from services, automations, or other triggers with `workflow:run`, which returns the instance ID:

```ballerina
string workflowId = check workflow:run(orderWorkflow, input);
// later:
anydata result = check workflow:getWorkflowResult(workflowId, 30);
```

Every instance — running, suspended, or completed — is visible in the [Integration Control Plane](../icp/managing-workflows.md), including an execution graph that shows exactly which step it is on.

## Next steps

- [Human task workflows](human-task-workflow.md) — pause the transaction for a person's decision.
- [Review activities and error handling](review-activity-and-error-handling.md) — approval gates and human-reviewed retries.
