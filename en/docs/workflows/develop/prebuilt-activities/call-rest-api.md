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

:::info Prerequisites

- An `http:Client` connection in your integration, created under **Connections** in the sidebar
:::

## Fields

| Field | Required | Description |
|---|---|---|
| **Connection** | Yes | The `http:Client` to call through. Only HTTP connections are offered. |
| **Method** | Yes | `GET`, `POST`, `PUT`, `DELETE`, or `PATCH`. |
| **Path** | No | Resource path appended to the connection's base URL, for example `/users/1`. |
| **Message** | For `POST`, `PUT`, and `PATCH` | The request body. Accepts a record, `json`, `xml`, a string, or bytes. |
| **Headers** | No | Request headers. Under the advanced fields. |
| **Result** | Yes | The variable that receives the response. |
| **Databinding Type** | Yes | The type to bind the response payload to. |

**Retry Policy** and **Check Error** work the same as for every prebuilt activity. See [Prebuilt activities](index.md#fields-shared-by-all-three).

## Read a resource

A `GET` with a **Databinding Type** of `OrderStatus` hands the workflow a typed value rather than raw JSON:

```ballerina
import ballerina/http;
import ballerina/workflow;
import ballerina/workflow.activity;

final http:Client ordersApi = check new ("https://api.example.com");

type OrderStatus record {|
    string id;
    string status;
|};

@workflow:Workflow
function trackOrderWorkflow(workflow:Context ctx, string orderId) returns error? {
    OrderStatus status = check ctx->callActivity(activity:callRestAPI, {
        connection: ordersApi,
        method: "GET",
        path: string `/orders/${orderId}`
    });
}
```

The binding is the client's own: whatever `http:Client` can bind a response to, this activity can return. Use `json` when the shape varies and you want to inspect it in the workflow.

## Send a body

For `POST`, `PUT`, and `PATCH`, fill in **Message**. Here the request body is a record and the response binds to another:

```ballerina
type Shipment record {|
    string orderId;
    string address;
|};

type ShipmentCreated record {|
    string trackingId;
|};

@workflow:Workflow
function shipOrderWorkflow(workflow:Context ctx, Shipment shipment) returns error? {
    ShipmentCreated created = check ctx->callActivity(activity:callRestAPI, {
        connection: ordersApi,
        method: "POST",
        path: "/shipments",
        message: shipment
    });
}
```

:::warning Retries and writes
A `POST` that failed after the server processed it will be sent again when **Auto Retry** is on, which can create a duplicate. Pass an idempotency key if the API supports one, choose **Human Review** so a person decides, or leave retries off for calls that cannot be repeated safely.
:::

## Next steps

- [Call SOAP API](call-soap-api.md) — the same idea for SOAP endpoints.
- [Error handling and review activities](../review-activity-and-error-handling.md) — what happens when the call keeps failing.
- [Activities](../activities.md) — write your own activity when the call needs more than a forward.
