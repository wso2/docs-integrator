---
sidebar_position: 9
title: "Durable Timers"
description: Pause a WSO2 Integrator durable workflow for hours, days, or months with a durable sleep that survives restarts and holds no threads or memory while it waits.
keywords: [wso2 integrator, durable workflow, timer, sleep, delay, wait, cooling-off period, long running, crash recovery]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Durable Timers

Long-running processes spend most of their life waiting: a cooling-off period before a sensitive change takes effect, a settlement delay before a payout, a reminder three days after a request. A **durable timer** is how a workflow waits. The instance suspends, the runtime remembers when to wake it, and nothing is held open in the meantime.

<ThemedImage
    alt="The emailChangeRequest workflow running from Start through validateEmailChange, a workflow : Sleep step, and performEmailChange"
    sources={{
        light: useBaseUrl('/img/workflows/develop/durable-timers/sleep-step-light.png'),
        dark: useBaseUrl('/img/workflows/develop/durable-timers/sleep-step-dark.png'),
    }}
/>

## Add a Sleep step

Some waits are policy rather than plumbing. Take a rule a support team might be held to:

> Changes to a customer's email address must have a 24-hour cooling-off period.

The `emailChangeRequest` workflow puts that rule in one place. It validates the request, waits out the cooling-off period, and only then applies the change, so a hijacked account has a day in which the real owner can still intervene:

1. On the workflow diagram, click **+** where the workflow should wait, between `validateEmailChange` and `performEmailChange`.
2. In the node panel, under **Workflow** > **Steps**, click **Sleep**. The **Sleep** form opens.
3. Fill in the form:

   | Field        | Required | Description                                                                                                                                                                                                 |
   |--------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | **Duration** | Yes      | How long to wait. Keep the field on **Record** to build the duration from units in a form, or switch it to **Expression** to write the record yourself, for example to take the period from a configurable. |

4. On **Record**, click the field to open the **Record Configuration** editor, tick the units the wait is expressed in, and fill in their values. The cooling-off period here is one day, so **days** is ticked and set to `1`.
5. Click **Save**.

![Adding a Sleep step between validateEmailChange and performEmailChange, ticking days in the Record Configuration editor and setting it to 1](/img/workflows/develop/durable-timers/add-sleep-step.gif)

### Duration units

**Record Configuration** offers one field per unit, all optional, so a duration names only the units it needs:

| Unit      | Type      |
|-----------|-----------|
| `years`   | `int`     |
| `months`  | `int`     |
| `weeks`   | `int`     |
| `days`    | `int`     |
| `hours`   | `int`     |
| `minutes` | `int`     |
| `seconds` | `decimal` |

Express the wait in whichever unit reads like the rule it implements. A cooling-off period written as 24 hours can be ticked as `hours` set to `24` or, as in the recording above, `days` set to `1`. In code the same step is a call on the workflow context:

## What makes it durable

A durable sleep is not a blocked thread. When the workflow reaches the timer:

- The instance **suspends**. It consumes no thread and no memory while waiting, so thousands of accounts sitting out their cooling-off period cost nothing to keep around.
- The deadline is **recorded**. Restart the integration, redeploy it, or lose the process to a crash, and the timer still fires at its original time.
- On crash recovery, an **already-elapsed timer does not wait again.** Like a completed activity, it is read back from the record, so a restart never restarts the clock.

:::warning
Never use regular **Standard Library Sleep** inside a workflow. It blocks a thread, it is invisible to the runtime, and the wait is lost on restart, so the workflow resumes with the delay silently skipped or repeated. Always use the workflow context's durable sleep.
:::

## Timers versus task timeouts

A timer and a timeout look similar but answer different questions:

|                        | What it does                                                                                                                                 |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Durable timer**      | Waits a fixed duration, then continues. Nothing can cut it short.                                                                            |
| **Human task timeout** | Bounds a wait for a *person or an event*. It ends early when the task is answered, and fails with a timeout error if nobody answers in time. |

Use a timer for a delay you always want, and a timeout when you are waiting on something that may or may not arrive. The email change rule is the first kind: the 24 hours pass whether or not anyone objects. Giving the owner a way to cancel within the window is the second kind, an [await human task](human-task-workflow.md) or an [await data event](data-events.md) bounded by a timeout.

## Watching timers

A pending timer appears as a `TIMER` node in the instance's execution graph in the [Integration Control Plane](../icp/managing-workflows.md), so a workflow that looks stalled can be identified as simply waiting, and you can see what it is waiting for and until when. The same graph is available over the [Management API](../reference/management-api.md).

## Next steps

- [Activities](activities.md) — the recorded steps a timer sits between.
- [Await human task](human-task-workflow.md) — waiting on people and external events instead of the clock.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — a timer in a complete flow.
