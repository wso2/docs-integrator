---
sidebar_position: 9
title: "Prebuilt Activities"
description: Ready-made durable wrappers for the calls every integration makes, so REST, SOAP, and email run as recorded workflow activities without writing one.
keywords: [wso2 integrator, durable workflow, prebuilt activity, builtin activity, rest api, soap, smtp email, connection]
---

# Prebuilt Activities

Every outbound call from a workflow has to run inside an [activity](../activities.md) so the runtime records its result. For your own logic that means writing an activity function. For the calls almost every integration makes, the runtime ships the wrapper for you.

**Prebuilt activities** are ready-made, durable wrappers around the most common connector calls. You pick an existing connection and fill in the call, and the runtime records the result exactly as it would for an activity you wrote yourself. Nothing to wrap, and nothing to keep in sync when the call changes.

Three are available today:

| Prebuilt activity | Calls through | Returns |
|---|---|---|
| **[Call REST API](call-rest-api.md)** | An `http:Client` connection | The response payload, bound to the type you choose |
| **[Call SOAP API](call-soap-api.md)** | A `soap11:Client` or `soap12:Client` connection | The response envelope as `xml` |
| **[Send Email (SMTP)](send-email.md)** | An `email:SmtpClient` connection | Nothing |

## Add one to a workflow

1. On the workflow diagram, click **+**.
2. In the node panel, under **Workflow** > **Steps**, click **Call Activity**.
3. In the **Activities** panel, expand **Prebuilt Activities** and click the one you need.
4. Choose the **Connection** to call through, fill in the call's fields, and click **Save**.

The call appears on the diagram as an ordinary activity node, and it behaves like one: recorded on success, retryable on failure, and visible as an `ACTIVITY` node in the [Integration Control Plane](../../icp/executions.md) execution graph.

:::info Connections come first
A prebuilt activity calls through a connection that already exists in your integration. Create it under **Connections** in the sidebar before you add the step. In code it is a module-level `final` client variable, which is what lets the runtime hand it to the activity worker.
:::

## Fields shared by all three

Each prebuilt activity has its own fields, covered on its page. These two are common to all of them:

| Field | Description |
|---|---|
| **Retry Policy** | What the engine does when the call fails: **No Automatic Retry**, **Auto Retry** for backoff retries, or **Human Review** to hand the failure to a person. See [Review activities and error handling](../review-activity-and-error-handling.md). |
| **Check Error** | Propagates a failure to the workflow with `check`. Clear it to handle the error yourself. |

:::tip Idempotent side effects
A completed prebuilt activity never runs twice, but a failed attempt runs again once **Auto Retry** is on. That matters most for calls that change something: a retried `POST` or a retried email can duplicate. Send an idempotency key with the request where the API supports one, or keep retries off for calls that cannot be repeated safely.
:::

## When to write your own activity instead

Reach for a custom [activity](../activities.md) when the call is not one of the three above, when you want several calls recorded as a single step, or when the response needs shaping before the workflow sees it. Two other entries in the **Activities** panel cover the middle ground:

- **Create Activity from a Connection** generates an activity function around an action on a connector you already have, which is the route for connectors other than HTTP, SOAP, and SMTP.
- **+ Create Activity** writes an empty activity function for you to design.

## Next steps

- [Call REST API](call-rest-api.md) — invoke an HTTP endpoint and bind the response to a type.
- [Call SOAP API](call-soap-api.md) — send a SOAP envelope and read the response.
- [Send Email (SMTP)](send-email.md) — send a message through an SMTP connection.
- [Activities](../activities.md) — how activities are recorded, retried, and shown in the execution graph.
