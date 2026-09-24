---
title: Message Endpoint
description: "Implement the Message Endpoint pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message Endpoint

A Message Endpoint connects an application to a messaging channel so it can send and receive messages, keeping the application code separate from the mechanics of the channel. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageEndpoint.html" label="Enterprise Integration Patterns Message Endpoint reference" />

In WSO2 Integrator, a service and its listener form the receiving endpoint: the listener handles the channel mechanics, and the typed resource signature delivers only the message data to the application logic. Client connections form the sending endpoint.

## Example: Currency conversion endpoint

This example exposes a currency conversion application through an HTTP endpoint. The listener and resource function isolate the conversion logic from the transport, so the application works with typed `Currency` values and a `decimal` amount, not with raw protocol details.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) on a listener. This is the message endpoint that connects the application to the channel.
2. Add a `get` resource that accepts the base currency, target currency, and amount as typed query parameters.
3. In the flow, look up the exchange rates and compute the converted amount.
4. Return the converted value from the resource.

The flow receives the typed request, looks up the exchange rates, and returns the converted amount. The listener and resource isolate this logic from the transport:

<PatternImage src="/img/eip-patterns/message_endpoint_flow.png" alt="Message Endpoint flow in the WSO2 Integrator visual designer" width={400} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type Currency "AUD"|"INR"|"GBP";
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1/rates on httpListener {
    isolated resource function get convert(Currency base, Currency target, decimal amount = 1.00) returns decimal {
        map<decimal> rates = {
            "AUD": 1.59,
            "INR": 83.24,
            "GBP": 0.83
        };
        decimal baseUsdValue = rates.get(base);
        decimal targetUsdValue = rates.get(target);
        return (targetUsdValue / baseUsdValue) * amount;
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [message endpoint sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/message_endpoint) on GitHub.
