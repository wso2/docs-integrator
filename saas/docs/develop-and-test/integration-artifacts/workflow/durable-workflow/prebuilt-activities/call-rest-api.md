---
title: Call a REST API
---

# Call a REST API

**Call REST API** invokes an HTTP endpoint through an `http:Client` connection and binds the response to the type you ask for. The call is recorded like any other [activity](../activities.md), so a workflow that restarts mid-flight reads the recorded response back instead of calling the API again.

Use it whenever a workflow needs to talk to an HTTP service and you would otherwise write an activity function that does nothing but forward the call.

## Fields

| Field                | Required                       | Description                                                                                                                                              |
|----------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Connection**       | Yes                            | The `http:Client` to call through. Only HTTP connections are offered.                                                                                    |
| **Method**           | Yes                            | `GET`, `POST`, `PUT`, `DELETE`, or `PATCH`. Choose **From Expression** to pass the method as an `activity:RestMethod` value instead.                     |
| **Path**             | No                             | Resource path appended to the connection's base URL, for example `/users/1`.                                                                             |
| **Message**          | No                             | The request body, offered for every method except `GET`. Accepts an `http:Request`, a record, `json`, `xml`, a string, or bytes.                          |
| **Headers**          | No                             | Request headers. Under the advanced fields.                                                                                                              |
| **Result**           | Yes                            | The variable that receives the response.                                                                                                                 |
| **Databinding Type** | Yes                            | The type to bind the response payload to. Defaults to `json`. For example, a `GET` with a **Databinding Type** of `OrderStatus` hands the workflow a typed value rather than raw JSON. |

**Approval Policy**, **Retry Policy**, and **Check Error** work the same as for every prebuilt activity. See [Prebuilt activities](prebuilt-activities.md#fields-shared-by-all-three).

:::warning Retries and writes
A `POST` that failed after the server processed it will be sent again when **Auto Retry** is on, which can create a duplicate. Pass an idempotency key if the API supports one, choose **Human Review** so a person decides, or leave retries off for calls that cannot be repeated safely.

## Next steps

- [Call SOAP API](call-soap-api.md) — the same idea for SOAP endpoints.
- [Error handling and review activities](../review-activity-and-error-handling.md) — what happens when the call keeps failing.
- [Activities](../activities.md) — write your own activity when the call needs more than a forward.
