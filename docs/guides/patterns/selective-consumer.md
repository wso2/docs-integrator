---
title: Selective Consumer
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Selective Consumer

Use the Selective Consumer pattern when a service reads from a shared channel but should receive or process only the messages that match its criteria. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSelector.html" label="Enterprise Integration Patterns Selective Consumer reference" />

The pattern is implemented at the consumer boundary or immediately inside the consumer flow. Use broker-side selection when the channel supports selectors based on message metadata. Use flow-level selection when the decision depends on payload content or rules that must run after delivery.

## Broker-side selection

Use broker-side selection when the broker can evaluate the criteria before the message reaches the service. For JMS-backed channels, configure a [JMS listener service](../../connectors/catalog/messaging/java.jms/triggers.md#service) with `messageSelector` so the service receives only messages whose headers or properties match the selector expression.

1. Create the JMS-backed event service with the [JMS listener](../../connectors/catalog/messaging/java.jms/triggers.md#listener).
2. Configure the listener connection with the broker endpoint and credentials through [configurable variables](../../reference/config/configuration-management.md#configurable-variables).
3. Set the service queue or topic in `@jms:ServiceConfig`.
4. Set `messageSelector` to the selector expression, such as `eventType = 'OrderCreated' AND priority = 'high'`.
5. Add processing steps in the `onMessage` flow. The broker delivers only messages that match the selector.
6. Ensure producers set the message properties used by the selector before publishing to the shared channel.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/log;
import ballerinax/java.jms;

configurable string providerUrl = ?;

listener jms:Listener orderListener = check new ({
    initialContextFactory: "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
    providerUrl: providerUrl
});

function processPriorityOrder(jms:Message message) returns error? {
    log:printInfo("Processing selected order", id = message.messageId);
}
// docs-fold-end

@jms:ServiceConfig {
    queueName: "orders",
    messageSelector: "eventType = 'OrderCreated' AND priority = 'high'"
}
service "priority-order-consumer" on orderListener {
    remote function onMessage(jms:Message message) returns error? {
        check processPriorityOrder(message);
    }
}
```

## Flow-level selection

Use flow-level selection with [if/else statements](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) when the consumer must inspect the delivered payload, call another system, or apply rules that cannot be expressed as a broker selector. The service still reads from the shared channel, but the accepted branch contains the processing logic and the unmatched branch is ignored or handled separately.

1. Create or open the consumer service that receives messages from the shared channel.
2. Open the message handler flow and [add a step](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor).
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) at the point where the flow has the payload fields needed for selection.
4. Set the condition to the consumer criteria, such as `order.priority == "high" && order.region == "west"`.
5. Add the processing steps inside the **True** branch.
6. Leave the **False** branch empty when unmatched messages should be ignored, or add separate handling for rejected messages.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/log;

type OrderEvent record {|
    string orderId;
    string priority;
    string region;
|};

function processWestPriorityOrder(OrderEvent order) returns error? {
    log:printInfo("Processing selected order", orderId = order.orderId);
}
// docs-fold-end

function consumeOrder(OrderEvent order) returns error? {
    if order.priority == "high" && order.region == "west" {
        check processWestPriorityOrder(order);
    }
}
```
