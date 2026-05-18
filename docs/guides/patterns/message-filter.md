---
title: Message Filter
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
  PatternImage,
} from '@site/src/utils/eipPatternComponents';

# Message Filter

Use the Message Filter pattern to evaluate each incoming message and continue the flow only for messages that satisfy the selected condition. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html" label="Enterprise Integration Patterns Message Filter reference" />

The pattern is implemented by placing a filtering construct at the point where the integration has enough context to decide whether a message should continue. Use flow-level constructs when the decision depends on data the integration reads or derives. Use boundary or source-level constructs when the decision can be made from metadata or delivery rules before the main processing path starts.

## Predicate-based filtering

Use predicate-based filtering with [if/else statements](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) when each message carries the fields needed for a single boolean decision, such as priority, source, header, or status. The accepted path contains the forwarding or processing action. The rejected path does nothing or handles the rejection separately.

1. Open the flow and [add a step](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor).
2. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) at the point where the message has enough data for the decision.
3. Set the condition to `message.priority == HIGH_PRIORITY`.
4. Add the accepted action inside the matching branch.
5. Leave the other branch empty when unmatched messages should be discarded.

<PatternImage
  src="/img/tutorials/patterns/message-filter-visual-designer.png"
  alt="Message Filter flow"
  width={560}
/>

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

const HIGH_PRIORITY = 1;
const MEDIUM_PRIORITY = 2;
const LOW_PRIORITY = 3;

type Message record {|
    string id;
    string source;
    string subject;
    HIGH_PRIORITY|MEDIUM_PRIORITY|LOW_PRIORITY priority;
|};

final http:Client outboundChannel = check new ("http://api.outbound.channel.com.balmock.io");
// docs-fold-end

service /api/v1 on new http:Listener(8080) {
    resource function post message(Message message) returns error? {
        if message.priority == HIGH_PRIORITY {
            _ = check outboundChannel->/messages.post(message, targetType = http:Response);
        }
    }
}
```

## Collection-level filtering

Use collection-level filtering with [query expressions](../../reference/language/query-expressions.md) when the flow already has a group of messages or records and only a subset should continue. Keep the predicate in the `where` clause so the result is the accepted collection.

1. Open the flow and [add a step](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor).
2. Add a [Map Data or Declare Variable step](../../reference/language/query-expressions.md).
3. Set the output type to the accepted collection type, such as `Message[]`.
4. Enter a query expression with a `where` clause for the filter predicate.
5. Use the resulting collection in the next processing or forwarding step.

<PatternImage
  src="/img/tutorials/patterns/message-filter-collection-filter.png"
  alt="Collection-level Message Filter flow"
  width={720}
/>

```ballerina
// docs-fold-start: Supporting definitions
const HIGH_PRIORITY = 1;
const MEDIUM_PRIORITY = 2;
const LOW_PRIORITY = 3;

type Message record {|
    string id;
    string source;
    string subject;
    HIGH_PRIORITY|MEDIUM_PRIORITY|LOW_PRIORITY priority;
|};
// docs-fold-end

function filterHighPriorityMessages(Message[] messages) returns Message[] {
    return from Message message in messages
        where message.priority == HIGH_PRIORITY
        select message;
}
```

## Boundary-level filtering

Use boundary-level filtering when the input artifact can reject or route messages before custom flow logic runs. For HTTP-facing inputs, use a [request interceptor](../../connectors/catalog/built-in/http/trigger-reference.md#interceptors) when the decision can be made from request metadata before the resource executes. Other inputs can use their own handler, listener, or subscription selection points.

1. Add the source artifact, such as an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service).
2. Add a request interceptor for the service boundary.
3. Read the request metadata needed for the filter, such as a priority header.
4. Return a response for messages that should stop at the boundary.
5. Call the next service only for messages that should enter the resource flow.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type OrderCreated record {|
    string id;
    string priority;
|};

function processOrder(OrderCreated event) returns error? {
}
// docs-fold-end

listener http:Listener eventListener = new (8080,
    interceptors = [new HighPriorityFilter()]
);

service class HighPriorityFilter {
    *http:RequestInterceptor;

    resource function 'default [string... path](
            http:RequestContext ctx, http:Request req)
            returns http:NextService|http:Accepted|error? {
        if !req.hasHeader("x-priority") {
            return <http:Accepted>{body: {status: "filtered"}};
        }

        string priority = check req.getHeader("x-priority");
        if priority != "high" {
            return <http:Accepted>{body: {status: "filtered"}};
        }

        return ctx.next();
    }
}

service /events on eventListener {
    resource function post orders(OrderCreated event) returns error? {
        check processOrder(event);
    }
}
```

## Broker-side delivery filtering

Use broker-side delivery filtering when RabbitMQ can reduce what reaches the flow before consumption. Route matching messages into a dedicated queue with a direct exchange and binding key, then configure the RabbitMQ trigger to consume only that queue. Use [RabbitMQ exchange bindings](../../connectors/catalog/messaging/rabbitmq/actions.md#exchange-management) to bind the accepted-message queue to the exchange with the accepted routing key.

1. Add the [RabbitMQ event integration](../../develop/integration-artifacts/event/rabbitmq.md#creating-a-rabbitmq-service).
2. Configure the RabbitMQ trigger connection with the broker host and port.
3. Set **Queue Name** to the queue that receives accepted messages, such as `high-priority-orders`.
4. Create the RabbitMQ broker resources with connector actions or broker administration: declare a direct exchange, declare the accepted-message queue, and bind the queue to the exchange with the accepted routing key.
5. Publish messages to that exchange with the routing key that matches the accepted binding key, such as `orders.priority.high`.
6. Add processing steps only for messages delivered to the accepted-message queue.

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/rabbitmq;

configurable string rabbitmqHost = "localhost";
configurable int rabbitmqPort = 5672;
const ORDERS_EXCHANGE = "orders.events";
const ACCEPTED_ORDERS_QUEUE = "high-priority-orders";
const ACCEPTED_ORDERS_BINDING_KEY = "orders.priority.high";

listener rabbitmq:Listener rabbitmqListener = check new (rabbitmqHost, rabbitmqPort);
rabbitmq:Client rabbitmqClient = check new (rabbitmqHost, rabbitmqPort);

function configureBrokerDeliveryFilter() returns error? {
    check rabbitmqClient->exchangeDeclare(ORDERS_EXCHANGE, rabbitmq:DIRECT_EXCHANGE, config = {
        durable: true
    });
    check rabbitmqClient->queueDeclare(ACCEPTED_ORDERS_QUEUE, config = {
        durable: true
    });
    check rabbitmqClient->queueBind(ACCEPTED_ORDERS_QUEUE, ORDERS_EXCHANGE, ACCEPTED_ORDERS_BINDING_KEY);
}

function processOrder(rabbitmq:AnydataMessage message) returns error? {
}
// docs-fold-end

@rabbitmq:ServiceConfig {
    queueName: ACCEPTED_ORDERS_QUEUE
}
service rabbitmq:Service on rabbitmqListener {
    remote function onMessage(rabbitmq:AnydataMessage message) returns error? {
        check processOrder(message);
    }
}
```
