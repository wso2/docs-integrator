---
sidebar_position: 3
title: "Activities"
description: Activities are the recorded units of work in a WSO2 Integrator durable workflow — exactly-once on replay, retryable on failure, and shared by workflows and durable agents alike.
keywords: [wso2 integrator, durable workflow, activity, call activity, exactly once, replay, idempotency, retry]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Activities

An **activity** is a single unit of work that the durable runtime records and its modeled as a function. Anything that touches the outside world — an API call, a database write, a payment, an email — belongs in an activity rather than in the workflow body. That split is what makes a workflow crash-safe: the workflow function can be replayed from the start after a restart, while the work already done inside activities is read back from the record instead of being repeated.

<ThemedImage
    alt="A workflow diagram made of three activity nodes in sequence: reserveInventory capturing inventoryResult, chargePayment capturing paymentResult, and sendConfirmationEmail capturing emailResult"
    sources={{
        light: useBaseUrl('/img/workflows/develop/activities/workflow-activities-light.png'),
        dark: useBaseUrl('/img/workflows/develop/activities/workflow-activities-dark.png'),
    }}
/>

## Why the split matters

When a workflow resumes after a crash or a restart, the runtime replays the workflow function to rebuild its state. During that replay:

- A **completed activity is never re-executed.** Its recorded result is handed straight back, so the card is not charged twice and the email is not sent twice.
- A **failed activity can be retried** on its own, without repeating the steps that already succeeded.

:::warning Keep the workflow body deterministic
Everything **outside** an activity is ordinary code that runs again on replay. No direct API calls, no random values, and no wall-clock reads in the workflow body — put that work in an activity so its result is recorded instead of recomputed.
:::

## Create an activity

To create an activity, click **+** on **Workflow Activities** in the left sidebar.

![The left sidebar with the + button on the Workflow Activities entry](/img/workflows/develop/activities/add-workflow-activity.png)

**Create Activity** form provides the following fields for defining the activity function:

| Field | Required | Description |
|---|---|---|
| **Activity Name** | Yes | The name of the activity function. This is the name the workflow calls and the name shown on the activity's node in the execution graph. |
| **Description** | No | Explains what the activity does. |
| **Parameters** | No | Defines the inputs of the activity function. Each parameter has a name and a type. Selecting **+ Add Parameter** adds a new parameter definition row. |
| **Return Type** | No | The type of the value the activity returns, for example `string` or `string\|error`. Leave it empty for an activity that returns nothing. |

After clicking **Create**, you will be directed to design its body in the same flow diagram used for any other function.

:::tip Check the prebuilt ones first
REST calls, SOAP calls, and SMTP email already have durable wrappers that ship with the runtime, so there is nothing to write for those. See [Prebuilt activities](prebuilt-activities/index.md).
:::

## Call an activity from a workflow

To call an activity from a workflow, click **+** on the workflow diagram and select **Call Activity** from the palette's **Workflow → Steps** group. Then select the activity function you want to call.
Call Activity form provides the following fields for calling an activity function:

| Field                  | Required                                         | Description                                                                                                                                                                                        |
|------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Activity Arguments** | Yes                                              | Form field will appear for each activity function parameter. Provide the relevent arguments for each required parameter                                                                            |
| **Retry Policy**       | Yes                                              | When an activity call failied, how should the workflow handle it. No Automatic Retry, Auto Retry, Human Review. See [Error handling and review activities](review-activity-and-error-handling.md). |
| **Result**             | Only if the output of the activity is not `null` | Name of the result variable to capture the activity's output.                                                                                                                                      |
| **Result type**        | Only if the output of the activity is not `null` | Type of the resulting data of the activity function.                                                                                                                                               |
| **Check Error**        | No                                               | Under **Advanced Configurations**. Adds `check` to the call so a failure automatically propagates out from the workflow. Clear it to handle the error yourself. Defaults to `checked`. See [Error handling in the workflow logic](review-activity-and-error-handling.md#error-handling-in-the-workflow-logic). |

![Call an activity from a workflow](/img/workflows/develop/activities/activity-call.gif)

:::tip Idempotent side effects
A *completed* activity never runs twice, but a *failed* attempt may run again once retries are on. Make the side effect idempotent — pass an idempotency key to the payment gateway, upsert instead of insert — so a repeated attempt cannot double-charge or duplicate a record.
:::

## Activities on a durable agent

A durable agent uses the same activities. Instead of you wiring the call order, the model chooses which activity to call and when, and each call is recorded exactly as it is in a hand-wired workflow.

To give an agent an activity, click **+** on the activity icon at the right bottom of the agent node and select the activity. The register form provides the following fields for registering the activity as a durable agent activity:

| Field | Required | Description |
|---|---|---|
| **Retry Policy** | Yes | Engine retry strategy when the activity fails: no automatic retry (an AI agent may still re-invoke it), automatic backoff retries, or a human review task. See [Error handling and review activities](review-activity-and-error-handling.md). |
| **Reviewer Roles** | Only for **Human Review** | Roles permitted to decide the human review, for example `"manager"` or `["finance", "manager"]`. |
| **Advanced Configurations** | No | Approval settings for the registered activity, collapsed by default. |
| ↳ **Requires Approval** | No | Gate the activity: before the agent runs it, a review activity is created and the agent suspends durably until a reviewer proceeds (optionally editing the arguments) or rejects. |
| ↳ **Reviewer Roles** | Only with **Requires Approval** | Roles permitted to decide the approval review of this activity, for example `"support-lead"` or `["finance", "manager"]`. |

![Register a workflow activity as a durable agent activity](/img/workflows/develop/activities/register-activity-as-agent-activity.png)

Registering the activity is what makes it available to the agent. See [Create a Durable Agent](../agentic/create-durable-agent.md).

## Watching activities run

Each activity call appears as an `ACTIVITY` node in the instance's execution graph in the [Integration Control Plane](../icp/managing-workflows.md), so you can see which step an instance is on, which activities have completed, and which one failed. The same graph is available over the [Management API](../reference/management-api.md).

[//]: # (Add a screenshot of the execution graph with an activity node highlighted.)

## Next steps

- [Prebuilt activities](prebuilt-activities/index.md) — durable REST, SOAP, and email calls with no wrapper to write.
- [Durable timers](durable-timers.md) — pause between activities without holding resources.
- [Error handling and review activities](review-activity-and-error-handling.md) — retry policies and approval gates.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — activities wired into a complete flow.
