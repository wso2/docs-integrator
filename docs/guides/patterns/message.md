---
title: Message
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Message

Use the Message pattern to package information into a structure that can move through a message channel without losing the distinction between system metadata and business data. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html" label="Enterprise Integration Patterns Message reference" />

The pattern is implemented by defining the message shape close to the integration logic and binding it to a transport only at the channel boundary. Use a typed envelope when the application needs a transport-independent message. Use native protocol or connector bindings when the message is already tied to HTTP headers, payloads, or a broker-specific record.

## Typed message envelope

Use a typed message envelope when the integration needs a stable application-level message shape before it sends data to a connector or returns it from a resource function. Model the envelope as a closed record with separate records for headers and body fields.

1. Create a new integration in WSO2 Integrator.
2. Add the header, body, and envelope records in [Types](../../develop/integration-artifacts/supporting/types.md).
3. Open the flow and [add a step](../../develop/understand-ide/editors/flow-diagram-editor/flow-diagram-editor.md#anatomy-of-the-editor).
4. Add a **Declare Variable** or **Map Data** step to construct the envelope.
5. Pass the envelope to the connector call, return it from the resource function, or map it into another boundary-specific message.

```ballerina
type OrderHeaders record {|
    string correlationId;
    string source;
    string messageType;
|};

type OrderBody record {|
    string orderId;
    decimal amount;
    string currency;
|};

type OrderMessage record {|
    OrderHeaders headers;
    OrderBody body;
|};

function buildOrderMessage(OrderBody order, string correlationId) returns OrderMessage {
    return {
        headers: {
            correlationId,
            source: "order-service",
            messageType: "OrderCreated"
        },
        body: order
    };
}
```

## Channel boundary binding

Use channel boundary binding when the message arrives through, or leaves through, a protocol that already provides metadata and payload locations. Keep the EIP Message shape explicit in the flow, then map HTTP headers, HTTP payloads, or broker records into that envelope at the boundary.

1. Add and configure the required connector under **Connections**. For brokered messages, select the relevant connector, such as the [NATS connector](../../connectors/catalog/messaging/nats/connector-overview.md), from the [messaging connector catalog](../../connectors/catalog/index.mdx).
2. Add the listener or entry point for the inbound channel. For HTTP, start by [creating an HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service).
3. Bind the request payload as the body and bind transport metadata, such as headers, as message headers.
4. Add a **Map Data** step to create the typed message envelope from the inbound payload and metadata.
5. Publish the envelope through the connector, forward it to another channel, or return it from the resource function.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerinax/nats;

final nats:Client orderEvents = check new (nats:DEFAULT_URL);

type OrderHeaders record {|
    string correlationId;
    string source;
    string messageType;
|};

type OrderBody record {|
    string orderId;
    decimal amount;
    string currency;
|};

type OrderMessage record {|
    OrderHeaders headers;
    OrderBody body;
|};
// docs-fold-end

service /orders on new http:Listener(8080) {

    resource function post .(
            @http:Header {name: "x-correlation-id"} string correlationId,
            OrderBody payload) returns OrderMessage|error {
        OrderMessage message = {
            headers: {
                correlationId,
                source: "http-api",
                messageType: "OrderCreated"
            },
            body: payload
        };
        check orderEvents->publishMessage({
            subject: "orders.created",
            content: message
        });
        return message;
    }
}
```
