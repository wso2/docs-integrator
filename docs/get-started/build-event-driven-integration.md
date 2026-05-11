---
title: Build an Event-Driven Integration
---

# Build an Event-Driven integration

**Time:** Under 10 minutes | **What you'll build:** An event-driven integration that consumes messages from `Orders` queue in RabbitMQ broker and processes them.

Event integrations are designed for reactive workflows triggered by messages from a broker. This quick start demonstrates the complete flow: creating a RabbitMQ message listener, adding an event handler to process messages, and implementing the integration logic executed when a message is received.

:::info Prerequisites

- [WSO2 Integrator installed](install.md)
- A running RabbitMQ instance (or use Docker: `docker run -d -p 5672:5672 rabbitmq:management`)

## Step 1: Create a new integration project

1. Open WSO2 Integrator.
2. Select **Create**.
3. Set **Integration Name** to `OrderProcessor`.
4. Set **Project Name** to `event-integration`.
5. Select **Create Integration**.

<ThemedImage
    alt="Create a New Integration Project"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/create-project.png'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/create-project.png'),
    }}
/>

## Step 2: Add a RabbitMQ event listener

1. Select your integration from the project panel.
2. In the design view, select **Add Artifact**.
3. Select **RabbitMQ** under **Event Integration**.
4. Update **Host** and **Port** configuration to point to the RabbitMQ instance you are running locally.
5. Set **Queue Name** to `Orders`.
6. Select **Create**.

<ThemedImage
    alt="Add a RabbitMQ Event Integration Artifact"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/add-a-rabbitmq-listener.png'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-a-rabbitmq-listener.png'),
    }}
/>

## Step 3: Add `onMessage` event handler

1. In the RabbitMQ service design view, select **+ Add Handler**.
2. Select **onMessage**.
3. Select **Save**.

<ThemedImage
    alt="Add Message Processing Logic"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
    }}
/>

## Step 4: Add message processing logic

1. Select **+** inside the resource flow.
2. Select **Call Function**.
3. Select **printInfo**.
4. Set **Msg** to `Received order`.
5. Select **Save**.

<ThemedImage
    alt="Add Message Processing Logic"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/add-message-processing-logic-light.gif'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-message-processing-logic-dark.gif'),
    }}
/>

## Step 5: Run and test the integration

1. Select **Run**.
2. The integration starts and listens for messages on the `Orders` queue.
3. Publish a test message to the RabbitMQ `Orders` queue to see the log output.

<ThemedImage
    alt="Run and Test the Integration"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration-light.gif'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration-dark.gif'),
    }}
/>

The following complete, runnable Ballerina program produces the same integration shown in the visual designer steps.

```ballerina
import ballerina/log;
import ballerinax/rabbitmq;

listener rabbitmq:Listener rabbitmqListener = new ("localhost", 5672);

service "Orders" on rabbitmqListener {
    remote function onMessage(rabbitmq:AnydataMessage message, rabbitmq:Caller caller) returns error? {
        do {
            log:printInfo("Received order");
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }

}
```

Save this as `main.bal`, then run `bal run` from the project directory.

## Supported event sources

| Broker | Ballerina Package |
|---|---|
| **Apache Kafka** | `ballerinax/kafka` |
| **RabbitMQ** | `ballerinax/rabbitmq` |
| **MQTT** | `ballerinax/mqtt` |
| **Azure Service Bus** | `ballerinax/azure.servicebus` |
| **Salesforce** | `ballerinax/salesforce` |
| **GitHub Webhooks** | `ballerinax/github` |

## What's next

- [Automation](build-automation.md) -- Build a scheduled job
- [AI agent](build-ai-agent.md) -- Build an intelligent agent
- [Integration as API](build-api-integration.md) -- Build an HTTP service
- [File-driven integration](build-file-driven-integration.md) -- Process files from FTP or local directories
