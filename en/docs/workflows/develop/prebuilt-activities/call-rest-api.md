---
sidebar_position: 2
title: "Call a REST API"
sidebar_label: "Call REST API"
description: Invoke an HTTP endpoint from a WSO2 Integrator durable workflow as a recorded activity, with the response bound to the type you choose.
keywords: [wso2 integrator, durable workflow, prebuilt activity, call rest api, http client, databinding, workflow activity]
---

# Call a REST API

**Call REST API** invokes an HTTP endpoint through an `http:Client` connection and binds the response to the type you ask for. The call is recorded like any other [activity](../activities.md), so a workflow that restarts mid-flight reads the recorded response back instead of calling the API again.

Use it whenever a workflow needs to talk to an HTTP service and you would otherwise write an activity function that does nothing but forward the call.

## Fields

| Field                | Required                       | Description                                                                                                                                              |
|----------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Connection**       | Yes                            | The `http:Client` to call through. Only HTTP connections are offered.                                                                                    |
| **Method**           | Yes                            | `GET`, `POST`, `PUT`, `DELETE`, or `PATCH`.                                                                                                              |
| **Path**             | No                             | Resource path appended to the connection's base URL, for example `/users/1`.                                                                             |
| **Message**          | For `POST`, `PUT`, and `PATCH` | The request body. Accepts a record, `json`, `xml`, a string, or bytes.                                                                                   |
| **Headers**          | No                             | Request headers. Under the advanced fields.                                                                                                              |
| **Result**           | Yes                            | The variable that receives the response.                                                                                                                 |
| **Databinding Type** | Yes                            | The type to bind the response payload to. Eg: A `GET` with a **Databinding Type** of `OrderStatus` hands the workflow a typed value rather than raw JSON |

**Retry Policy** and **Check Error** work the same as for every prebuilt activity. See [Prebuilt activities](index.md#fields-shared-by-all-three).

:::warning Retries and writes
A `POST` that failed after the server processed it will be sent again when **Auto Retry** is on, which can create a duplicate. Pass an idempotency key if the API supports one, choose **Human Review** so a person decides, or leave retries off for calls that cannot be repeated safely.
:::

## Next steps

- [Call SOAP API](call-soap-api.md) — the same idea for SOAP endpoints.
- [Error handling and review activities](../review-activity-and-error-handling.md) — what happens when the call keeps failing.
- [Activities](../activities.md) — write your own activity when the call needs more than a forward.
