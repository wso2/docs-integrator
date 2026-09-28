---
title: Point-to-Point Channel
description: "Implement the Point-to-Point Channel pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Point-to-Point Channel

Use a Point-to-Point Channel when exactly one receiver should consume each message the sender puts on the channel. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html" label="Enterprise Integration Patterns Point-to-Point Channel reference" />

In WSO2 Integrator, a client connection to a single receiver is a point-to-point channel: each message sent over the connection is delivered to and consumed by that one receiver.

## Example: Creating a product in a billing system

This example sends a product creation message to the Zuora billing API over a dedicated client connection. Only the Zuora endpoint consumes the message, and the response confirms that the single receiver processed it.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

The design view shows the channel: a single automation connected to one Zuora connection, so the message has exactly one sender and one receiver:

<PatternImage src="/img/eip-patterns/point_to_point_channel_design.png" alt="Point-to-Point Channel integration design view in WSO2 Integrator" width={646} />

1. Create an [automation](../../develop/integration-artifacts/automation.md#creating-an-automation) to run the flow.
2. Add an HTTP client connection that points to the Zuora API. This connection is the point-to-point channel. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection).
3. In the flow, declare a variable holding the product details.
4. Add the HTTP `post` action on the connection to send the product to the single receiver and capture the `ProductCreationResponse`.

The flow sends the product to the single Zuora receiver, so exactly one consumer handles the message:

<PatternImage src="/img/eip-patterns/point_to_point_channel_flow.png" alt="Point-to-Point Channel flow in the WSO2 Integrator visual designer" width={530} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type ProductCreationResponse record {|
    boolean success;
    string id;
|};

final http:Client zuora = check new ("http://rest.zuora.com.balmock.io");
// docs-fold-end

public function main() returns error? {
    var product = {
        "Description": "Cell phone service for call center operators",
        "EffectiveEndDate": "2025-10-01",
        "EffectiveStartDate": "2023-10-01",
        "Name": "Cell Phone Service",
        "SKU": "API-SKU09723199712"
    };
    ProductCreationResponse productCreationResponse = check zuora->/v1/'object/product.post(product, targetType = ProductCreationResponse);
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [point-to-point channel sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/point_to_point_channel) on GitHub.
