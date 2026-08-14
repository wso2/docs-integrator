---
sidebar_position: 4
title: "Send an Email"
sidebar_label: "Send Email (SMTP)"
description: Send an email from a WSO2 Integrator durable workflow as a recorded activity, through an SMTP connection.
keywords: [wso2 integrator, durable workflow, prebuilt activity, send email, smtp, notification, workflow activity]
---

# Send an Email

**Send Email (SMTP)** sends a message through an `email:SmtpClient` connection. It is the notification step most long-running processes need: the order shipped, the claim was approved, the document is ready.

The send is recorded like any other [activity](../activities.md), which is what stops a restart from mailing the same person twice.

:::info Prerequisites

- An `email:SmtpClient` connection in your integration, created under **Connections** in the sidebar
:::

## Fields

The activity returns nothing, so there is no result variable to name.

| Field | Required | Description |
|---|---|---|
| **Connection** | Yes | The `email:SmtpClient` to send through. |
| **To** | Yes | Recipient address, or a list of addresses. |
| **Subject** | Yes | Subject line. |
| **Body** | Yes | Plain-text body. |
| **From** | Yes | Sender address. |
| **CC**, **BCC** | No | Further recipients. Under the advanced fields. |
| **Reply To** | No | Where replies should go. |
| **Sender** | No | Envelope sender, when it differs from **From**. |
| **HTML Body** | No | An HTML body sent alongside the plain-text one. |
| **Content Type** | No | MIME content type override, for example `text/plain`. |
| **Email Headers** | No | Additional mail headers. |

**Retry Policy** and **Check Error** work the same as for every prebuilt activity. See [Prebuilt activities](index.md#fields-shared-by-all-three).

## Send a notification

```ballerina
import ballerina/email;
import ballerina/workflow;
import ballerina/workflow.activity;

final email:SmtpClient smtp = check new ("smtp.example.com", "username", "password");

@workflow:Workflow
function notifyWorkflow(workflow:Context ctx, string recipient) returns error? {
    check ctx->callActivity(activity:sendEmail, {
        connection: smtp,
        to: recipient,
        subject: "Order shipped",
        'from: "no-reply@example.com",
        body: "Your order is on the way."
    });
}
```

Set **HTML Body** as well when you want a formatted message. The plain-text **Body** is still sent, so clients that cannot render HTML have something to show.

:::warning A retried email is a second email
Mail cannot be recalled, and the send is not idempotent: if the message left the server but the activity reported a failure, **Auto Retry** sends it again. For customer-facing mail, prefer **No Automatic Retry**, or **Human Review** so a person decides whether to resend. See [Review activities and error handling](../review-activity-and-error-handling.md).
:::

:::tip Notification or decision?
Use this activity to tell someone what happened. When the workflow needs an answer back, pause it with a [human task](../human-task-workflow.md) instead and let the person decide from their inbox in the Control Plane.
:::

## Next steps

- [Human task workflows](../human-task-workflow.md) — wait for a person's decision rather than notifying them.
- [Call REST API](call-rest-api.md) — reach a notification service over HTTP instead of SMTP.
- [Activities](../activities.md) — write your own activity when a template or attachment is involved.
