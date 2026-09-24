---
title: Content-Based Router
description: "Implement the Content-Based Router pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Content-Based Router

Use a Content-Based Router to examine each message and route it to the correct recipient based on the data the message contains, so one logical function can be served by multiple physical systems. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html" label="Enterprise Integration Patterns Content-Based Router reference" />

In WSO2 Integrator, the router is implemented at the point where the flow has enough message content to choose the recipient: an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) for predicate-based routing or a [Match node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#match) for value-based routing.

## Example: Routing tracking requests by country

This example routes shipment tracking requests by the destination country in the request. UK shipments are routed to the DHL Parcel UK API, and other shipments are routed to the DHL Deutsche Post International API. The caller sees one tracking endpoint regardless of which physical system answers.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `get` resource that accepts the country and tracking number as path parameters.
2. Add an HTTP client connection for the DHL API. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) on the routing field with the condition `country is UK`.
4. In the **True** branch, call the DHL Parcel UK tracking endpoint and return the shipment status.
5. In the **False** branch, call the DHL Deutsche Post International tracking endpoint and return the event status.

The flow branches on the message content: UK shipments are routed to the DHL Parcel UK API and everything else to the DHL Deutsche Post International API:

<PatternImage src="/img/eip-patterns/content_based_router_flow.png" alt="Content-Based Router flow in the WSO2 Integrator visual designer" width={760} />

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

The complete project is available in the [content-based router sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/content_based_router) on GitHub.
