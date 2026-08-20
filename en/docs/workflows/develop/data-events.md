---
sidebar_position: 4
title: "Await Data Events"
description: Pause a WSO2 Integrator durable workflow until an external system or a person delivers data, then resume with that value as a typed, recorded result.
keywords: [wso2 integrator, durable workflow, data event, send data, external data, wait, callback, long running]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Await Data Events

Sometimes a workflow needs *data*, not a decision — the employee submits the supporting bills, a partner system posts a shipping confirmation, a scanner returns a document. A **data event** is a named slot the workflow waits on. The instance suspends until something delivers a value into that slot, then resumes with the value as an ordinary typed result.

<ThemedImage
    alt="A workflow that reserves inventory and then halts on a Wait for payment step bound to paymentData, drawn with a dashed arrow arriving from outside the flow"
    sources={{
        light: useBaseUrl('/img/workflows/develop/data-events/await-data-event-light.png'),
        dark: useBaseUrl('/img/workflows/develop/data-events/await-data-event-dark.png'),
    }}
/>

Like every other durable wait, it costs nothing while it waits and it survives a restart.

## Pause workflow for data event

1. On the workflow diagram, click **+** where the workflow should wait.
2. In the node panel, under **Workflow** > **Steps**, click **Await Data Event**. The **Await Data** form opens.
3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Data Receive Variable Name** | Yes | The variable that receives the value once it arrives. |
   | **Data Type** | Yes | The type of the value the workflow expects. Pick an existing type, or create one from the list. |
   | **Data Name** | Yes | The name used when sending the data into this workflow. |
   | **Min Count** | No | Under **Advanced Configurations**. How many of the awaited events must arrive before the workflow continues. Defaults to all of them. |
   | **Timeout** | No | Under **Advanced Configurations**. The longest the workflow waits, as a duration record. The wait returns an error when the timeout expires, which your workflow can handle. |

   **Timeout** opens a **Record Configuration** editor: tick the units you want, such as **minutes**, and fill in their values. Switch the field to **Expression** to write the record yourself instead.

4. Click **Add** to commit the **Data Waits** entry. It collapses to a row showing its type and variable. Use **+ Add Data Waits** to wait on more than one event.
5. Click **Save**.

![Adding an Await Data Event step and bounding the wait with a timeout](/img/workflows/develop/data-events/await-data-event.gif)

The diagram gains a wait node, drawn with an arrow arriving from outside the flow, and the workflow now suspends there.

:::tip Data event or human task?
Use a **data event** when a system or a person is submitting *content* the workflow will process. Use a [human task](human-task-workflow.md) when a person is making a *decision* the Control Plane should render as a form in their inbox.
:::

## Watching a waiting workflow

While the workflow waits, the execution graph in the [Integration Control Plane](../icp/managing-workflows.md) marks the halt point as a `DATA` node named after the event, with status `WAITING` — so anyone can see exactly what the process is blocked on rather than guessing that it is stuck.

<ThemedImage
    alt="Execution graph showing the workflow halted on a waiting billSubmitted data event"
    sources={{
        light: useBaseUrl('/img/workflows/develop/data-events/01-waiting-data-event.png'),
        dark: useBaseUrl('/img/workflows/develop/data-events/01-waiting-data-event.png'),
    }}
/>

The same graph is available over the [Management API](../reference/management-api.md).

## Next steps

- [Send a data event](send-data-event.md) — the delivery half: fill the event and resume the run.
- [Await human task](human-task-workflow.md) — pause for a person's decision instead of their data.
- [Durable timers](durable-timers.md) — waiting on the clock instead of an event.
- [Activities](activities.md) — the recorded steps that process the data once it arrives.
