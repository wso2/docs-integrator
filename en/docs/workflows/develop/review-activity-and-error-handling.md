---
sidebar_position: 7
title: "Error Handling & Review Activities"
description: Gate risky workflow steps behind human approval and turn failures into human-reviewed retries in WSO2 Integrator durable workflows.
keywords: [wso2 integrator, durable workflow, review activity, retry, error handling, approval gate, human review, replay, crash safe, state management]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Error Handling & Review Activities

Failures and risky steps are where durable workflows earn their keep. Instead of scattering try/catch blocks and retry loops through your flow, you attach a **retry policy** to each activity call — and for the steps that matter most, you put a **human review** in front of the step or behind its failure.

## The three retry policies

Every activity call takes a **Retry Policy**, which says what the workflow should do after a failed attempt to execute that activity.

| Policy                           | What happens on failure                                                                                                          |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **No Automatic Retry** (default) | Error will be returned from the workflow if the first activity execution attempt fails.                                          |
| **Auto Retry**                   | The engine re-executes the activity with configurable attempts, delay, and backoff.                                              |
| **Human Review**                 | A **review task** is created for the roles you name. The reviewer can retry as-is, retry with corrected input, or fail the step. |

![The activity call form with the Retry Policy dropdown open on No Automatic Retry, Auto Retry, and Human Review](/img/workflows/develop/review-activity/retry-policy.png)

## Auto Retry — for transient failures

Choosing **Auto Retry** adds the backoff fields to the form. Every one of them is optional, and a field left empty falls back to its default.

| Field               | Required | Description                                                                                          |
|---------------------|----------|------------------------------------------------------------------------------------------------------|
| **Max Retries**     | No       | Maximum retry attempts. Defaults to `3`.                                                             |
| **Retry Delay**     | No       | Initial delay in seconds before the first retry. Defaults to `1.0`.                                  |
| **Retry Backoff**   | No       | Multiplier applied to the delay after each retry. Defaults to `2.0`.                                 |
| **Max Retry Delay** | No       | Cap on the delay between retries, in seconds. Left empty, the delay keeps growing by the multiplier. |

![The activity call form with Auto Retry chosen, showing Max Retries, Retry Delay, Retry Backoff, and Max Retry Delay](/img/workflows/develop/review-activity/auto-retry.png)

## Human Review — when a person should fix it

Choosing **Human Review** hands a failure to a person instead of to the engine. The workflow does not fail along with the activity and the engine does not retry on its own: the run parks at that step, and a review task is raised carrying the failing input and the error it produced. The task takes its name from the activity being called, so there is nothing to name in the form.

The task is listed in the **Review Activities** tab of the [Control Plane](../icp/review-activities.md) for the roles you name below, matched by exact role name. Until one of them decides it, the run waits there durably and holds no resources, the same as any other durable wait. The decision is what resumes it.

| Field              | Required | Description                                                                                                                                          |
|--------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Reviewer Roles** | Yes      | The role permitted to decide the review, for example `"Finance"`, or a list such as `["finance", "manager"]`. Leave it empty to let any role decide. |

![The activity call form with Human Review chosen, showing the Reviewer Roles field set to Finance](/img/workflows/develop/review-activity/human-review.png)

## Approval gates — review *before* the step runs

Some steps should never run without sign-off, even when nothing has failed. A gate like that is set where a [durable agent](../agentic/create-durable-agent.md#activities) registers the activity as one of its capabilities: click the activity on the agent's diagram, expand **Advanced Configurations**, and select **Requires Approval**.

| Field                 | Required | Description                                                                                                                                                    |
|-----------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Requires Approval** | No       | Gates the activity. Cleared by default, so an activity runs unattended unless you say otherwise.                                                                |
| **Reviewer Roles**    | No       | The role permitted to decide this activity's approval reviews, for example `"Finance"`, or a list such as `["finance", "manager"]`. Left empty, the agent's own approval roles apply. |

![The payClaim activity registration form with Requires Approval selected and Reviewer Roles set to Finance](/img/workflows/develop/review-activity/requires-approval.png)

With the gate on, the agent suspends durably before every call to that activity and raises a review activity showing the arguments it *proposes*. Gates are decided in the **Review Activities** tab of the Control Plane. See [Review activities](../icp/review-activities.md).

## Error handling in the workflow logic

Retry policies handle the step; your workflow logic handles the outcome. Clearing **Check Error** on an activity call hands the failure back to the workflow as a value instead of propagating it out of the workflow, and from there you branch on it like on any other value.

<ThemedImage
    alt="A workflow diagram where sendConfirmationEmail feeds an If condition on emailResult is error, which routes to notifyFailedEmail before rejoining startShipment"
    sources={{
        light: useBaseUrl('/img/workflows/develop/review-activity/error-handling-light.png'),
        dark: useBaseUrl('/img/workflows/develop/review-activity/error-handling-dark.png'),
    }}
/>

To handle an activity failure inside the workflow, as in the diagram above:

1. On the workflow diagram, click the activity call whose failure you want to handle, `sendConfirmationEmail` here.
2. Expand **Advanced Configurations** and clear **Check Error**. A **Result** field appears.
3. Name the **Result** variable, for example `emailResult`, and click **Save**. The variable holds the error the activity failed with, or nil when it succeeded, and the node now shows the variable under the activity name.

   ![The activity call's Advanced Configurations with Check Error cleared and the Result variable named emailResult](/img/workflows/develop/review-activity/check-error-result.png)

4. Click **+** below the activity and, in the node panel under **Control**, click **If**.
5. In **Condition**, write the error check, `emailResult is error`. Selecting the variable under **Variables** in the expression helper saves typing it. Click **Save**.
6. Click **+** on the branch taken when the condition holds and add the steps that deal with the failure, here a **Call Activity** step calling `notifyFailedEmail`. Click **Save**.

![Clearing Check Error on an activity call, naming its result variable, and branching on emailResult is error to call notifyFailedEmail](/img/workflows/develop/review-activity/handle-error-in-logic.gif)

Both branches rejoin the flow after the **If**, so `startShipment` runs whether or not the email failed. Leave the else branch empty when there is nothing to do on success.

## Choosing a policy

| Situation | Policy |
| --- | --- |
| Flaky downstream, safe to repeat | Auto Retry |
| Bad input a person could correct | Human Review |
| Risky/irreversible step (payments, deletions) | Approval gate (**Requires Approval**) |
| Business-level failure with a fallback path | No Automatic Retry + workflow logic |

## Crash recovery

Everything above rests on one guarantee: the engine writes down the outcome of every step as that step completes. When a run resumes after a crash, a restart, or a redeploy, the workflow function replays, and each step that already finished is read back from the record instead of being run again.

| Step              | What is read back on replay                                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------------------|
| An activity call  | The value the activity returned, so the card is not charged and the email is not sent a second time.              |
| A data event wait | The value that was delivered, so the run does not wait for it again.                                              |
| A human task wait | The decision the person submitted.                                                                                |
| A durable timer   | The original deadline, so an elapsed wait does not restart its clock.                                             |
| Current time      | The instant the run first reached that step. The workflow always works with the time at which it first got there. |

This is why a durable workflow needs no state management of its own. You write no checkpoint rows, no status columns, and no resume logic, and you do not reload progress when a run picks back up: the variables in the workflow body are rebuilt from the record, so the code after a wait sees exactly what the code before it left behind. The recorded events for a run are listed on the **History** tab in the [Control Plane](../icp/executions.md#history).

What this asks of you in return is a deterministic workflow body, since that is the part which runs again on every replay. See [Activities](activities.md#why-the-split-matters).

## Next steps

- [Await human task](human-task-workflow.md) — free-standing decisions and external data.
- [Create a Durable Agent](../agentic/create-durable-agent.md) — the same policies applied to an AI agent's activities.
