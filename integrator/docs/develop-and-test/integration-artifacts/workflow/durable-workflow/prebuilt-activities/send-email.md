---
title: Send an Email
---

# Send an Email

**Send Email (SMTP)** sends a message through an `email:SmtpClient` connection. It is the notification step most long-running processes need: the order shipped, the claim was approved, the document is ready.

The send is recorded like any other [activity](../activities.md), which is what stops a restart from mailing the same person twice.

## Fields

The activity returns nothing, so there is no result variable to name unless you clear **Check Error**: then **Result** names the variable that receives the error, or nil when the send succeeded.

| Field             | Required | Description                                           |
|-------------------|----------|-------------------------------------------------------|
| **Connection**    | Yes      | The `email:SmtpClient` to send through.               |
| **To**            | Yes      | Recipient address, or a list of addresses.            |
| **Subject**       | Yes      | Subject line.                                         |
| **From**          | Yes      | Sender address.                                       |
| **Body**          | Yes      | Plain-text body.                                      |
| **CC**, **BCC**   | No       | Further recipients.                                   |
| **Reply To**      | No       | Where replies should go.                              |
| **Sender**        | No       | Envelope sender, when it differs from **From**.       |
| **HTML Body**     | No       | An HTML body sent alongside the plain-text one.       |
| **Content Type**  | No       | MIME content type override, for example `text/plain`. |
| **Email Headers** | No       | Additional mail headers.                              |

The optional fields above sit under the advanced fields.

**Approval Policy**, **Retry Policy**, and **Check Error** work the same as for every prebuilt activity. See [Prebuilt activities](prebuilt-activities.md#fields-shared-by-all-three).

Set **HTML Body** as well when you want a formatted message. The plain-text **Body** is still sent, so clients that cannot render HTML have something to show.

:::warning A retried email is a second email
Mail cannot be recalled, and the send is not idempotent: if the message left the server but the activity reported a failure, **Auto Retry** sends it again. For customer-facing mail, prefer **No Retry**, or **Human Review** so a person decides whether to resend. See [Error handling and review activities](../review-activity-and-error-handling.md).

:::tip Notification or decision?
Use this activity to tell someone what happened. When the workflow needs an answer back, pause it with a [human task](../await-human-task.md) instead and let the person decide from their inbox in the Control Plane.

## Next steps

- [Await human task](../await-human-task.md) — wait for a person's decision rather than notifying them.
- [Call REST API](call-rest-api.md) — reach a notification service over HTTP instead of SMTP.
- [Activities](../activities.md) — write your own activity when a template or attachment is involved.
