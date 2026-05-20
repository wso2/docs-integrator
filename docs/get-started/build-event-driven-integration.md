---
title: Build an Event-Driven Integration
---

# Build an Event-Driven Integration

**Time:** Under 10 minutes | **What you'll build:** An event-driven integration that consumes messages from `Orders` queue in RabbitMQ broker and processes them.

Event integrations are designed for reactive workflows triggered by messages from a broker. This quick start demonstrates the complete flow: creating a RabbitMQ message listener, adding an event handler to process messages, and implementing the integration logic executed when a message is received.

:::info Prerequisites

- A working WSO2 Integrator environment. Choose the path that fits how you want to work:
    - [Cloud setup](setup/cloud-setup.md) — launch WSO2 Integrator in a browser-based cloud editor.
    - [Local setup](setup/local-setup.md) — install and launch the WSO2 Integrator IDE on your machine.
- A running RabbitMQ instance (or use Docker: `docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:4.2-management`)

## Step 1: Create the integration

:::info Note

In the cloud editor, you're already inside a project. Skip to Step 2.

1. Open WSO2 Integrator.
2. Select the **Create New Integration** card.
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

1. Select your integration from the project overview canvas.
2. Select **+ Add Artifact** in the design canvas.
3. Select **RabbitMQ** under **Event Integration**.
4. Set **Host** to `localhost` and **Port** to `5672` (update these if your RabbitMQ instance runs elsewhere).
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
    alt="Add onMessage Event Handler"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
    }}
/>

## Step 4: Add message processing logic

1. Select **+** inside the resource flow.
2. Select **Call Function**.
3. Select **printInfo** under **log**.
4. Set **Msg** to `Received order`.
5. Select **Save**.

<ThemedImage
    alt="Add Message Processing Logic"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/add-message-processing-logic.png'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-message-processing-logic.png'),
    }}
/>

## Step 5: Run and test the integration

1. Select **Run**.
2. The integration starts and listens for messages on the `Orders` queue.
3. Open the RabbitMQ Management UI at `http://localhost:15672` (default credentials: guest/guest).
   - Go to **Queues → Orders → Publish message**, enter any text as the payload, and select **Publish message**.
   - Confirm the integration log displays `Received order`.

<ThemedImage
    alt="Run and Test the Integration"
    sources={{
        light: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration.gif'),
        dark: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration.gif'),
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

Save this as `main.bal`, then click the **Run** button in the top toolbar. Once running, open `http://localhost:15672` (default credentials: guest/guest), navigate to **Queues → Orders → Publish message**, and publish any message. The terminal log should display `Received order`.

## Step 6: Deploy to WSO2 Cloud

Deploy your integration to WSO2 Cloud - Integration Platform in any of the following ways:

- If you're using the cloud editor, see [Save and deploy](/deploy/cloud/deploy-from-cloud-editor/#save-and-deploy).
- If you're using the WSO2 Integrator IDE, see [Deploy from the IDE](/deploy/cloud/push-from-ide).
- If you'd rather skip the build and try a ready-made sample, one-click deploy it:

    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/orderprocessor" target="_blank">
        <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" />
    </a>

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

- [Kafka](../develop/integration-artifacts/event/kafka.md) — Consume and produce Kafka messages
- [Azure Service Bus](../develop/integration-artifacts/event/azure-service-bus.md) — Integrate with Azure Service Bus queues and topics
- [RabbitMQ](../develop/integration-artifacts/event/rabbitmq.md) — Full RabbitMQ listener and publisher reference
- [MQTT](../develop/integration-artifacts/event/mqtt.md) — Handle MQTT messages from IoT and messaging devices
- [CDC for PostgreSQL](../develop/integration-artifacts/event/cdc-postgresql.md) — React to database changes with change data capture
