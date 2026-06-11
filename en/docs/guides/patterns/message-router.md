---
title: Message Router
description: "Implement the Message Router pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Router

Use a Message Router to decouple individual processing steps so each message is passed to a different destination depending on a set of conditions, without the sender knowing which destination handles it. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html" label="Enterprise Integration Patterns Message Router reference" />

In WSO2 Integrator, the router is the decision construct in the flow — an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) or a [Match node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#match) — that selects which connection or processing path receives the message.

## Example: Routing shipment tracking requests

This example exposes a shipment tracking service that routes each request to a different DHL tracking API depending on the destination country. Requests for the UK are routed to the DHL Parcel UK API, while other requests are routed to the DHL Deutsche Post International API. The caller uses one endpoint and never sees the routing decision.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `get` resource that accepts the country and tracking number as path parameters.
2. Add an HTTP client connection for the DHL API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) with the condition `country is UK`.
4. In the **True** branch, call the DHL Parcel UK tracking endpoint and return the shipment status.
5. In the **False** branch, call the DHL Deutsche Post International tracking endpoint and return the event status.

The flow routes each request by destination country — UK to the DHL Parcel UK API, others to the DHL Deutsche Post International API:

<PatternImage src="/img/eip-patterns/message_router_flow.png" alt="Message Router flow in the WSO2 Integrator visual designer" width={760} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type DhlUkResponse record {|
    string url;
    ShipmentData[] shipments;
|};

type ShipmentData record {|
    string id;
    Status status;
|};

type DhlDpiResponse record {|
    Status[] events;
    string publicUrl;
    string barcode;
|};

type Status record {|
    string statusCode;
    string status;
|};

enum Country {
    UK,
    DE
}

final http:Client dhl = check new ("http://api.dhl.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /shipments on httpListener {
    resource function get [Country country]/[string trackingNumber]/status() returns string|error {
        if country is UK {
            DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments.get(trackingNumber = trackingNumber);
            return response.shipments[0].status.status;
        } else {
            DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[trackingNumber].get();
            return response.events[0].status;
        }
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message router sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message_router) on GitHub.
