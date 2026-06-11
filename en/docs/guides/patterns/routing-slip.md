---
title: Routing Slip
description: "Implement the Routing Slip pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Routing Slip

Use a Routing Slip to route a message consecutively through a series of processing steps when the sequence of steps is not known at design time and may vary for each message. The slip is attached to the message, and each component processes its step and passes the message on. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html" label="Enterprise Integration Patterns Routing Slip reference" />

In WSO2 Integrator, the slip is computed per message and attached to it as a field. The flow inspects the slip and forwards the message to the steps it lists, so each message follows its own route.

## Example: Applying loyalty point steps to a payment

This example processes retail payments where the applicable discount steps differ per customer. For each payment, the flow looks up which point programs the customer belongs to — store loyalty points and mobile points — and builds a routing slip listing only those steps. The message is then sent through the point-handling steps named on its slip before the final checkout computes the redeemed amount.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts the `PaymentRequest` payload.
2. In the flow, call the `lookupMessageSlip` function: it checks the loyalty and mobile point memberships for the customer and returns the routing slip for this message.
3. Attach the slip to the message by building a `Message` record from the request and the slip.
4. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) that forwards the message to the point-handler service when the slip is not empty.
5. Call the `checkout` function to compute the redeemed amount and return the `PaymentStatus`.

The flow computes the routing slip for each payment, then sends the message through only the point-handling steps the slip lists before checkout:

<PatternImage src="/img/eip-patterns/routing_slip_flow.png" alt="Routing Slip flow in the WSO2 Integrator visual designer" width={666} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type PaymentRequest record {|
    string mobileNumber;
    string customerName;
    float totalAmount;
    string storeCode;
    record {}[] items;
|};

type PaymentStatus record {|
    string status;
    record {
        float totalPoints;
        float redeemedAmount;
        float totalAmount;
    } details;
|};

type Message record {|
    string mobileNumber;
    string customerName;
    float totalAmount;
    record {
    }[] items;
    string storeCode;
    string[] routingSlip = [];
|};

type Points record {
    float loyaltyPoints = 0.0;
    float mobilePoints = 0.0;
};

function checkout(Message message, Points points) returns PaymentStatus {
    float totalPoints = points.loyaltyPoints + points.mobilePoints;
    return {
        status: "SUCCESS",
        details: {
            totalPoints: totalPoints,
            redeemedAmount: totalPoints * 50,
            totalAmount: message.totalAmount - (totalPoints * 50)
        }
    };
}

function isRegisteredToPointsService(string mobileNumber) returns boolean|error {
    http:Client openLoyalty = check new ("http://mob.points.hub.com.balmock.io");
    anydata|error memberCheck = openLoyalty->/api/[mobileNumber]/member/'check/get.get();
    return memberCheck is error ? false : true;
}
// docs-fold-end

function lookupMessageSlip(PaymentRequest request) returns string[]|error {
    final http:Client openLoyalty = check new ("http://openloyalty.com.balmock.io");
    anydata|error customer = openLoyalty->/api/[request.storeCode]/member/'check/get.get();
    string[] routingSlip = [];
    if customer is anydata {
        () var1 = routingSlip.push("CustomerLoyaltyPoints");
    }
    if check isRegisteredToPointsService(request.mobileNumber) {
        () var1 = routingSlip.push("MobilePoints");
    }
    return routingSlip;
}

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post payments(PaymentRequest request) returns PaymentStatus|error {
        string[] routingSlip = check lookupMessageSlip(request);
        Message message = {...request, routingSlip: routingSlip};
        Points points = {};
        if message.routingSlip.length() > 0 {
            final http:Client pointHandler = check new ("http://localhost:8081/loyaltyPoints");
            json payload = {
                storeCode: message.storeCode,
                mobileNumber: message.mobileNumber,
                routingSlip: message.routingSlip
            };
            http:Response targetType = check pointHandler->/points.post(payload);
        }
        return checkout(message, points);
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [routing slip sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/routing_slip) on GitHub.
