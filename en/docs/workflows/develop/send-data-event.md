---
sidebar_position: 5
title: "Send a Data Event"
description: Deliver a value into a running WSO2 Integrator durable workflow with the Send Data Event step, so a run waiting on a data event resumes.
keywords: [wso2 integrator, durable workflow, send data event, senddata, resume workflow, workflow id, callback]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Send a Data Event

A run parked on an [await data event](data-events.md) stays there until something delivers the value it is waiting for or timeout is reached. That delivery is a **Send Data Event** step, and it usually lives in the entry point a partner system or a person calls back on: the payment gateway's webhook, the resource where an employee uploads the missing document, a scheduled automation that posts the day's file.

<ThemedImage
    alt="A POST payment resource holding a single Send to paymentInfo step, drawn with a dashed arrow across to the orderWorkflow it delivers into"
    sources={{
        light: useBaseUrl('/img/workflows/develop/send-data-event/send-data-event-light.png'),
        dark: useBaseUrl('/img/workflows/develop/send-data-event/send-data-event-dark.png'),
    }}
/>

The delivery does not create a run. It resumes one, so it needs the workflow ID that [starting the run](start-workflow.md) returned.

## Send one from an integration

1. In the trigger artifact flow design, click **+**.
2. In the node panel, under **Workflow**, click **Send Data Event**.
3. Fill in the form:

   | Field | Required | Description |
   |---|---|---|
   | **Workflow Name** | Yes | The workflow to deliver into. The dropdown lists every workflow in the project. |
   | **Target Workflow Id** | Yes | Which run to resume, so this is the ID that [starting the run](start-workflow.md) returned. |
   | **Data Name** | Yes | The event to fill. The dropdown lists the data events declared by the workflow chosen above, so the two cannot drift apart. |
   | **Data** | Yes | The value to deliver. It has to match the type the event declares. |

4. Click **Save**.

![Adding a Send Data Event step and choosing the workflow and its data event](/img/workflows/develop/send-data-event/add-send-data-event.gif)

## Anyone with the ID can deliver

There is nothing special about the integration that started the run. Any integration that can reach the runtime and holds the workflow ID can fill the event, which is what makes a callback from a third party work: hand out the ID when the run starts, and the delivery can arrive from anywhere, minutes or weeks later.

That also means the ID is worth guarding. A run whose ID was lost keeps waiting, and no code can resume it.

## Next steps

- [Await data events](data-events.md) — the waiting half: declare the event and pause the workflow on it.
- [Start a workflow](start-workflow.md) — where the workflow ID comes from.
- [Await human task](human-task-workflow.md) — when a person is deciding rather than submitting content.
