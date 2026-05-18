---
title: Content Based Routing
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Content Based Routing

Use Content Based Routing to inspect each message and send it to the recipient that handles that message shape, value, or rule outcome. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html" label="Enterprise Integration Patterns Content-Based Router reference" />

The pattern is implemented at the decision point where the flow has enough message content to choose the next recipient. Use a match-based route for stable routing keys, and use predicate-based routing when the route depends on ranges, optional fields, or multiple content checks.

## Pattern-based content routing

Use pattern-based content routing with [match expressions](../../develop/understand-ide/editors/flow-diagram-editor/control.md#match) when each recipient maps to a known field value, such as a message type, region, product category, or event name. Keep an explicit default branch so unsupported content is handled in a dedicated fallback path for invalid recipients.

1. Create or open the [HTTP service resource](../../develop/integration-artifacts/service/http.md#creating-an-http-service) that receives the routed message.
2. Add HTTP client connections for each recipient. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) and the [HTTP client reference](../../connectors/catalog/built-in/http/action-reference.md#client).
3. Open the resource flow and [add a step](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor).
4. Add a [Match node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#match) and set the expression to the routing field, such as `order.itemType`.
5. Add one branch for each accepted value, such as `"standard"` and `"express"`, and add `_` as the default branch.
6. In each accepted branch, add the connector call for that recipient and return the route result.
7. In the default branch, return an error response for unsupported content.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

configurable string standardFulfillmentUrl = ?;
configurable string expressFulfillmentUrl = ?;

type OrderRequest record {|
    string orderId;
    string itemType;
    int quantity;
|};

type RouteResponse record {|
    string route;
    json result;
|};

final http:Client standardFulfillment = check new (standardFulfillmentUrl);
final http:Client expressFulfillment = check new (expressFulfillmentUrl);
// docs-fold-end

service /orders on new http:Listener(8080) {
    resource function post route(OrderRequest order)
            returns RouteResponse|http:BadRequest|error {
        match order.itemType {
            "standard" => {
                json result = check standardFulfillment->post("/orders", order);
                return {route: "standard-fulfillment", result};
            }
            "express" => {
                json result = check expressFulfillment->post("/orders", order);
                return {route: "express-fulfillment", result};
            }
            _ => {
                return <http:BadRequest>{
                    body: {message: "Unsupported item type"}
                };
            }
        }
    }
}
```

## Predicate-based content routing

Use predicate-based content routing with [if/else statements](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) when the route depends on content rules instead of one stable routing key.

1. Create or open the resource or function that contains the routing decision.
2. Add HTTP client connections for the possible recipients. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) and the [HTTP client reference](../../connectors/catalog/built-in/http/action-reference.md#client).
3. Add a [configurable variable](../../reference/config/configuration-management.md#configurable-variables) for any route rule that should change by environment, such as `bulkThreshold`.
4. Open the flow and add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) with a condition such as `order.quantity >= bulkThreshold`.
5. Add the bulk recipient call inside the **True** branch.
6. In the **False** branch, add another **If** node with a condition such as `order.priority`.
7. Add the priority recipient call inside the nested **True** branch and the default recipient call inside the nested **False** branch.
8. Return the selected route result from each branch.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

configurable int bulkThreshold = 100;
configurable string bulkFulfillmentUrl = ?;
configurable string priorityFulfillmentUrl = ?;
configurable string defaultFulfillmentUrl = ?;

type OrderRequest record {|
    string orderId;
    string itemType;
    int quantity;
    boolean priority = false;
|};

type RouteResponse record {|
    string route;
    json result;
|};

final http:Client bulkFulfillment = check new (bulkFulfillmentUrl);
final http:Client priorityFulfillment = check new (priorityFulfillmentUrl);
final http:Client defaultFulfillment = check new (defaultFulfillmentUrl);
// docs-fold-end

function routeByOrderRules(OrderRequest order) returns RouteResponse|error {
    if order.quantity >= bulkThreshold {
        json result = check bulkFulfillment->post("/orders", order);
        return {route: "bulk-fulfillment", result};
    } else if order.priority {
        json result = check priorityFulfillment->post("/orders", order);
        return {route: "priority-fulfillment", result};
    } else {
        json result = check defaultFulfillment->post("/orders", order);
        return {route: "default-fulfillment", result};
    }
}
```
