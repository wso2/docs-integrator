---
title: Service Activator
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Service Activator

Use a Service Activator to expose the same application operation through a message channel and a direct service interface. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingAdapter.html" label="Enterprise Integration Patterns Service Activator reference" />

The pattern is implemented by keeping the business operation in a reusable function and placing thin protocol-specific adapters around it. A service resource handles non-messaging callers, while a broker listener activates the same function when a message arrives.

## Request-reply service activation

Use request-reply service activation when a message sender expects the activated service to return a result. Define typed request and response records, implement the operation as a reusable function, and call that function from both the direct resource function and the broker request handler.

1. Define the request and response records in [Types](../../develop/integration-artifacts/supporting/types.md).
2. Add the reusable operation as a [Function](../../develop/integration-artifacts/supporting/functions.md) and select **Make visible across the project** when the function must be called from multiple artifacts.
3. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) for non-messaging callers.
4. Add a resource function with the typed request payload and add a **Call Function** step that invokes the reusable operation.
5. Add a [RabbitMQ event integration](../../develop/integration-artifacts/event/rabbitmq.md#creating-a-rabbitmq-service) for message-based callers.
6. Configure the RabbitMQ queue and listener values with [configurable variables](../../reference/config/configuration-management.md#configurable-variables).
7. Add the `onRequest` handler from [RabbitMQ event handlers](../../develop/integration-artifacts/event/rabbitmq.md#event-handlers), define the expected message content, add a **Call Function** step, and return the function result.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerinax/rabbitmq;

configurable string rabbitmqHost = "localhost";
configurable int rabbitmqPort = 5672;

type ActivationRequest record {|
    string requestId;
    string customerId;
    decimal amount;
|};

type ActivationResult record {|
    string requestId;
    string status;
|};

listener rabbitmq:Listener activatorListener = new (rabbitmqHost, rabbitmqPort);
// docs-fold-end

function activateService(ActivationRequest request) returns ActivationResult|error {
    return {
        requestId: request.requestId,
        status: "accepted"
    };
}

service /requests on new http:Listener(8080) {
    resource function post activate(ActivationRequest request)
            returns ActivationResult|error {
        return activateService(request);
    }
}

@rabbitmq:ServiceConfig {
    queueName: "service-requests"
}
service rabbitmq:Service on activatorListener {
    remote function onRequest(rabbitmq:AnydataMessage message)
            returns ActivationResult|error {
        ActivationRequest request = check message.content.ensureType();
        return activateService(request);
    }
}
```

## One-way command activation

Use one-way command activation when the message channel only needs to trigger the operation and does not need a service result in the reply path. The broker handler validates the message content, calls the shared function, and lets the handler return successfully after the command is accepted.

1. Reuse the request and response records from [Types](../../develop/integration-artifacts/supporting/types.md).
2. Reuse the same [Function](../../develop/integration-artifacts/supporting/functions.md) that contains the application operation.
3. Add a [RabbitMQ event integration](../../develop/integration-artifacts/event/rabbitmq.md#creating-a-rabbitmq-service) for the command queue.
4. Configure the listener, queue, and authentication fields with [configurable variables](../../reference/config/configuration-management.md#configurable-variables).
5. Add the `onMessage` handler from [RabbitMQ event handlers](../../develop/integration-artifacts/event/rabbitmq.md#event-handlers) and define the expected message content.
6. In the handler flow, add a **Call Function** step for the shared operation and add any flow-level error handling required by the command contract.

```ballerina
// docs-fold-start: Supporting definitions
import ballerinax/rabbitmq;

configurable string rabbitmqHost = "localhost";
configurable int rabbitmqPort = 5672;

type ActivationRequest record {|
    string requestId;
    string customerId;
    decimal amount;
|};

type ActivationResult record {|
    string requestId;
    string status;
|};

listener rabbitmq:Listener commandListener = new (rabbitmqHost, rabbitmqPort);

function activateService(ActivationRequest request) returns ActivationResult|error {
    return {
        requestId: request.requestId,
        status: "accepted"
    };
}
// docs-fold-end

@rabbitmq:ServiceConfig {
    queueName: "service-commands"
}
service rabbitmq:Service on commandListener {
    remote function onMessage(rabbitmq:AnydataMessage message) returns error? {
        ActivationRequest request = check message.content.ensureType();
        _ = check activateService(request);
    }
}
```
