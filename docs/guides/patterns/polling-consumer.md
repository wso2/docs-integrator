---
title: Polling Consumer
---

import {
  EipReferenceLink,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Polling Consumer

Use the Polling Consumer pattern when an integration must decide when it is ready to read from a channel instead of receiving pushed messages automatically. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/PollingConsumer.html" label="Enterprise Integration Patterns Polling Consumer reference" />

The pattern is implemented at the point where the flow controls the receive call. Use a loop when the integration must keep asking until a message or terminal state is available. Use a scheduled automation when each execution should perform one explicit pull operation.

## Loop-driven polling

Use loop-driven polling with [while loops](../../develop/understand-ide/editors/flow-diagram-editor/control.md#while) when the integration should keep checking a channel or endpoint while it controls the maximum attempts and wait interval. The receive or status-check call stays inside the loop, and the flow exits when it receives a message that is ready to process.

1. Create or open the [HTTP service resource](../../develop/integration-artifacts/service/http.md#creating-an-http-service) that starts the polling flow.
2. Add an HTTP client connection for the source that the flow must poll. See [adding a connection](../../develop/integration-artifacts/supporting/connections.md#adding-a-connection) and the [HTTP client reference](../../connectors/catalog/built-in/http/action-reference.md#client).
3. Add [configurable variables](../../reference/config/configuration-management.md#configurable-variables) for values such as `maxAttempts` and `pollDelaySeconds`.
4. Add a [While node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#while) that runs while the attempt count is less than `maxAttempts`.
5. Inside the loop, add the HTTP client operation that asks for the current message or status.
6. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) that returns the message when it is ready. Otherwise, wait for the configured delay and continue the loop.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/lang.runtime;

configurable int maxAttempts = 10;
configurable decimal pollDelaySeconds = 5.0d;
configurable string statusServiceUrl = ?;

type StatusMessage record {|
    string id;
    string status;
    json payload;
|};

final http:Client statusClient = check new (statusServiceUrl);
// docs-fold-end

service /messages on new http:Listener(8080) {
    resource function get [string messageId]() returns StatusMessage|error {
        int attempt = 0;

        while attempt < maxAttempts {
            StatusMessage message = check statusClient->/[messageId]();
            if message.status == "READY" {
                return message;
            }

            attempt += 1;
            runtime:sleep(pollDelaySeconds);
        }

        return error("Message was not ready before the polling limit");
    }
}
```

## Scheduled broker polling

Use scheduled broker polling when each automation run should pull at most one message from a broker and then stop. This keeps the schedule outside the receive logic while the flow still controls when it asks the broker for the next message. For JMS-backed channels, use the [JMS Message Consumer actions](../../connectors/catalog/messaging/java.jms/actions.md#message-consumer) with `receive` or `receiveNoWait`.

1. Create a [scheduled automation](../../develop/integration-artifacts/automation.md#creating-an-automation) for the polling interval.
2. Add the `java.jms` **JMS MessageConsumer** connection and bind the broker settings to configurable variables. See the [JMS consumer example](../../connectors/catalog/messaging/java.jms/example.md#adding-the-javajms-connector).
3. Add the **Receive** operation from the JMS consumer connection and set the timeout value for the polling window.
4. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) that checks whether the received value is a message.
5. Add the processing steps inside the branch that received a message.
6. Acknowledge the message only after the processing steps finish successfully.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/log;
import ballerinax/activemq.driver as _;
import ballerinax/java.jms as jms;

configurable string providerUrl = ?;
configurable string queueName = "Orders";
configurable int pollTimeoutMillis = 3000;

function createConsumer() returns jms:MessageConsumer|error {
    jms:Connection connection = check new (
        initialContextFactory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory",
        providerUrl = providerUrl
    );
    jms:Session session = check connection->createSession(jms:CLIENT_ACKNOWLEDGE);
    return session.createConsumer(destination = {
        'type: jms:QUEUE,
        name: queueName
    });
}

function processMessage(string payload) returns error? {
    log:printInfo("Processing message", payload = payload);
}
// docs-fold-end

public function main() returns error? {
    jms:MessageConsumer consumer = check createConsumer();
    jms:Message? message = check consumer->receive(pollTimeoutMillis);

    if message is jms:TextMessage {
        check processMessage(message.content);
        check consumer->acknowledge(message);
    } else if message is jms:Message {
        log:printInfo("Received a non-text JMS message");
        check consumer->acknowledge(message);
    } else {
        log:printInfo("No message was available in this polling window");
    }
}
```
