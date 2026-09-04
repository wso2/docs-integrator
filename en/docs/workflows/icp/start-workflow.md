---
title: "Start a Workflow"
description: Launch a new durable workflow execution from the WSO2 Integration Control Plane, using the input form generated from the workflow's input type.
keywords: [wso2 integrator, integration control plane, icp, start workflow, workflow input schema, workflow id, workflow timeout]
sidebar_label: "Start a Workflow"
---

# Start a Workflow

Workflows usually start from your own integration logic, but during testing, onboarding, and day-to-day operations it is useful to launch one by hand. The Integration Control Plane can start any workflow the runtime advertises and builds the input form for you from the workflow's input type, so you do not have to hand-write JSON.

:::info Prerequisites

- A runtime registered with workflow management enabled ([Connect a workflow runtime](connect-runtime.md))
- The `workflow_mgt:manage_workflows` permission on the project or integration
:::

## Where to start a workflow

Two places in the console open the same dialog.

| From | Steps |
| --- | --- |
| The workflow list | Open **Workflows**, go to the **Workflow Executions** tab, and click **Start New Workflow**. |
| The integration overview | Open the integration, select a definition under **Workflow Definitions** on the environment card, and click **Start New Workflow**. The workflow is preselected. |

**Start New Workflow** is visible only to users who hold `workflow_mgt:manage_workflows`.

## Fill in the dialog

| Field | Required | Description |
| --- | --- | --- |
| **Workflow name** | Yes | The workflow to run. At project level the list spans every integration in the project, and each option is labelled with the integration that hosts it. |
| Input fields | Depends on the workflow | Generated from the workflow's input type. Required fields carry a red asterisk. |
| **Workflow ID** | No | Your own identifier for the execution. Leave it empty to let the runtime generate one. A meaningful ID, such as an order number, makes the execution easy to find later. |
| **Timeout (seconds)** | No | Bounds the whole execution. The run times out with status **Timed out** if it has not finished when the timeout expires. |

Click **Start** to launch the execution.

:::note
The workflow you pick also decides where it runs. Each definition is reported by the runtime that hosts it, so choosing a workflow name selects that integration's runtime. There is no separate integration picker.
:::

## How the input form is built

Each workflow publishes a JSON schema for its input type, and the console renders a field per property.

```ballerina
public type OrderInput record {|
    string orderId;
    decimal amount;
    boolean expedited = false;
    ShippingAddress address;
|};

@workflow:Workflow
function orderWorkflow(workflow:Context ctx, OrderInput input) returns OrderResult|error {
}
```

The record above produces a form with a text box for `orderId`, a numeric box for `amount`, a Yes/No toggle for `expedited`, and an indented group of fields for `address`.

| Type in the workflow | Control in the console |
| --- | --- |
| `string` | Text box |
| Enum or union of string constants | Dropdown of the allowed values |
| `int`, `decimal`, `float` | Text box validated as a number, and rejected if it is not an integer where one is required |
| `boolean` | Yes/No toggle |
| Nested record | An indented group of that record's own fields |
| Open record, `map`, or array | Multi-line box where you enter JSON |

An optional nested group that you leave completely empty is omitted from the input rather than reported as missing, so you only have to fill in the parts the run actually needs.

If the workflow declares no input, or its schema cannot be turned into fields, the dialog shows the raw schema under **Click to see Input Schema**, or reports that no input schema is defined.

:::tip
Design the input type for the people who launch the workflow. Enums become dropdowns, descriptions become helper text under the field, and a `title` on a property becomes the field label.
:::

## After the workflow starts

A confirmation dialog reports the workflow ID the execution was given, with three actions:

- **Copy Workflow ID** puts the ID on your clipboard, which is useful for correlating logs.
- **View Running Workflow** opens the **Workflow Executions** tab filtered to that ID, so you can watch the run in the [timeline and execution graph](executions.md).
- **Close** returns to the list.

Immediately after starting, the new execution appears in the workflow list with status **Running**.

## When starting fails

Errors are shown inside the dialog so that the values you typed are preserved.

| Message | Cause | Fix |
| --- | --- | --- |
| A field-level message such as "Amount must be a number" | The value does not match the type the workflow declared | Correct the field and submit again |
| A red banner at the top of the dialog | The runtime rejected the input, usually because of a schema constraint the form does not pre-check, such as a pattern or a minimum | Adjust the input to satisfy the constraint |
| "Could not load workflow definitions from *integration*" | One integration in the project did not return its definitions | The workflows it hosts are missing from the dropdown. Check that its runtime is running with workflow management enabled. |
| "No running workflow runtime with a callback URL for this environment" | No runtime in that environment reported a workflow management URL | See [Troubleshooting](connect-runtime.md#troubleshooting) |

## What's next

- [Workflow executions](executions.md) — follow the run through its timeline and execution graph
- [Complete human tasks](human-tasks.md) — decide the tasks a running workflow is waiting on
- [Activities](../develop/activities.md) — the recorded units of work a workflow executes
- [Management API](../reference/management-api.md) — start workflows programmatically with `POST /workflows`
