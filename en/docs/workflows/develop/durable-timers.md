---
sidebar_position: 9
title: "Durable Timers"
description: Pause a WSO2 Integrator durable workflow for hours, days, or months with a durable sleep that survives restarts and holds no threads or memory while it waits.
keywords: [wso2 integrator, durable workflow, timer, sleep, delay, wait, long running, crash recovery]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Durable Timers

Long-running processes spend most of their life waiting: a cooling-off period before a refund, a settlement delay before a payout, a reminder three days after a request. A **durable timer** is how a workflow waits. The instance suspends, the runtime remembers when to wake it, and nothing is held open in the meantime.

## Sleep in a workflow

Add a **Sleep** step to the flow, or call it on the workflow context in code:

```ballerina
check ctx->sleep({hours: 24});
```

The duration is a record, so express the wait in the unit that reads best for the process — `{hours: 24}` for a settlement delay, `{days: 3}` for a reminder window.

<ThemedImage
    alt="Sleep step in a workflow diagram between two activities"
    sources={{
        light: useBaseUrl('/img/workflows/develop/durable-timers/01-sleep-step.png'),
        dark: useBaseUrl('/img/workflows/develop/durable-timers/01-sleep-step.png'),
    }}
/>

## What makes it durable

A durable sleep is not a blocked thread. When the workflow reaches the timer:

- The instance **suspends**. It consumes no thread and no memory while waiting, so thousands of waiting instances cost nothing to keep around.
- The deadline is **recorded**. Restart the integration, redeploy it, or lose the process to a crash, and the timer still fires at its original time.
- On replay, an **already-elapsed timer does not wait again.** Like a completed activity, it is read back from the record, so a restart never restarts the clock.

That last point is the reason to reach for the workflow's own sleep rather than a language-level one:

:::warning
Never use `runtime:sleep()` inside a workflow. It blocks a thread, it is invisible to the runtime, and the wait is lost on restart — the workflow resumes with the delay silently skipped or repeated. Always use the workflow context's durable sleep.
:::

## Timers versus task timeouts

A timer and a timeout look similar but answer different questions:

| | What it does |
| --- | --- |
| **Durable timer** (`ctx->sleep`) | Waits a fixed duration, then continues. Nothing can cut it short. |
| **Human task timeout** (`timeout = {days: 3}`) | Bounds a wait for a *person or an event*. It ends early when the task is answered, and fails with a timeout error if nobody answers in time. |

Use a timer for a delay you always want, and a timeout when you are waiting on something that may or may not arrive. See [Await human task](human-task-workflow.md) for the timeout form and how to handle its error.

## Watching timers

A pending timer appears as a `TIMER` node in the instance's execution graph in the [Integration Control Plane](../icp/managing-workflows.md), so a workflow that looks stalled can be identified as simply waiting, and you can see what it is waiting for and until when. The same graph is available over the [Management API](../reference/management-api.md).

## Next steps

- [Activities](activities.md) — the recorded steps a timer sits between.
- [Await human task](human-task-workflow.md) — waiting on people and external events instead of the clock.
- [Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md) — a timer in a complete flow.
