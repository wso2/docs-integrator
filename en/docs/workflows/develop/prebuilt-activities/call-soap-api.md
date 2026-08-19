---
sidebar_position: 3
title: "Call a SOAP API"
sidebar_label: "Call SOAP API"
description: Send a SOAP envelope from a WSO2 Integrator durable workflow as a recorded activity, over a SOAP 1.1 or SOAP 1.2 connection.
keywords: [wso2 integrator, durable workflow, prebuilt activity, call soap api, soap11, soap12, soapaction, workflow activity]
---

# Call a SOAP API

**Call SOAP API** sends a SOAP envelope through a `soap11:Client` or `soap12:Client` connection and returns the response envelope as `xml`. Like every [activity](../activities.md), the call is recorded, so a restart replays the recorded response instead of calling the service again.

Use it to reach the SOAP services that legacy systems still expose, without writing an activity function to wrap the client.

:::info Prerequisites

- A `soap11:Client` or `soap12:Client` connection in your integration, created under **Connections** in the sidebar
:::

## Fields

| Field | Required | Description |
|---|---|---|
| **Connection** | Yes | The SOAP client to call through. Both SOAP 1.1 and SOAP 1.2 connections are offered. |
| **Body** | Yes | The SOAP envelope, as `xml`. |
| **Action** | For SOAP 1.1 | The SOAPAction header. Required for SOAP 1.1 endpoints, optional for SOAP 1.2. |
| **Headers** | No | Additional HTTP headers. Under the advanced fields. |
| **Path** | No | Path appended to the connection's base URL. Under the advanced fields. |
| **Result** | Yes | The variable that receives the response envelope. |

**Retry Policy** and **Check Error** work the same as for every prebuilt activity. See [Prebuilt activities](index.md#fields-shared-by-all-three).

## Send an envelope

Build the envelope as `xml` and pass it as **Body**. The response comes back as `xml` for the workflow to read:

```ballerina
import ballerina/soap.soap11;
import ballerina/workflow;
import ballerina/workflow.activity;

final soap11:Client billing = check new ("https://billing.example.com/svc?WSDL");

@workflow:Workflow
function invoiceWorkflow(workflow:Context ctx, string invoiceId) returns error? {
    xml request = xml `<m:GetInvoice xmlns:m="http://example.com"><m:id>${invoiceId}</m:id></m:GetInvoice>`;
    xml response = check ctx->callActivity(activity:callSoapAPI, {
        connection: billing,
        body: request,
        action: "urn:GetInvoice"
    });
}
```

## SOAP 1.1 and SOAP 1.2

The activity accepts either client, and the only difference is **Action**:

| Version | Action |
|---|---|
| SOAP 1.1 | Required. The call fails with an error when it is missing. |
| SOAP 1.2 | Optional, because the action can travel in the content type instead. |

:::warning Multipart responses
The activity returns `xml`. An endpoint that answers with a multipart message fails with an error instead. Write your own [activity](../activities.md) around the SOAP client when you need to read `mime:Entity[]` payloads.
:::

## Next steps

- [Call REST API](call-rest-api.md) — the same idea for HTTP endpoints.
- [Error handling and review activities](../review-activity-and-error-handling.md) — what happens when the call keeps failing.
- [Activities](../activities.md) — write your own activity when the response needs shaping first.
