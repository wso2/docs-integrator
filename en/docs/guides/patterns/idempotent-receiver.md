---
title: Idempotent Receiver
description: "Implement the Idempotent Receiver pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Idempotent Receiver

Use an Idempotent Receiver so the receiver can safely handle duplicate messages: processing the same message more than once has the same effect as processing it once. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html" label="Enterprise Integration Patterns Idempotent Receiver reference" />

In WSO2 Integrator, the receiver keeps track of what it has already processed — keyed by the message identifier — and skips the side effect when the incoming message matches the recorded state.

## Example: Deduplicating order status updates

This example receives order status updates that may be delivered more than once. The receiver records the last status per order ID; when an update arrives with a status it has already applied, it acknowledges the duplicate with `204 No Content` instead of processing it again, and applies genuinely new statuses with `201 Created`.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `put` resource keyed by the `orderId` path parameter.
2. In the flow, look up the recorded status for the order in the status map.
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) comparing the recorded status with the incoming status.
4. When they match, return `204 No Content` — the duplicate is acknowledged without reprocessing. Otherwise record the new status and return `201 Created`.

The flow compares the incoming status with the last recorded status: a duplicate returns `204 No Content`, while a new status is recorded and returns `201 Created`:

<PatternImage src="/img/eip-patterns/idempotent_receiver_flow.png" alt="Idempotent Receiver flow in the WSO2 Integrator visual designer" width={740} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type OrderDetail record {
    string orderId;
    OrderStatus status;
};

enum OrderStatus {
    CREATED,
    SHIPPED,
    COMPLETED,
    CANCELLED
}
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function put manage\-orders/[string orderId](OrderDetail orderDetail) returns http:STATUS_NO_CONTENT|http:STATUS_CREATED {
        map<OrderStatus> orderStatuses = {};
        "CANCELLED"|"COMPLETED"|"SHIPPED"|"CREATED"|() orderStatus = orderStatuses[orderId];
        if orderStatus == orderDetail.status {
            return http:STATUS_NO_CONTENT;
        } else {
            orderStatuses[orderId] = orderDetail.status;
            return http:STATUS_CREATED;
        }
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [idempotent receiver sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/idempotent_receiver) on GitHub.
