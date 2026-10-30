---
sidebar_position: 4
title: "Build an Event-Driven Integration"
description: Build an event-driven integration in WSO2 Integrator that consumes messages from a message broker.
keywords: [wso2 integrator, rabbitmq service, event integration, quick start, ballerina, amqp]
slug: /get-started/quickstarts/build-event-driven-integration
---
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Build an Event-Driven Integration

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An event-driven integration that consumes messages from <code>Orders</code> queue in RabbitMQ broker and processes them.</>}
/>

Event integrations are designed for reactive workflows triggered by messages from a broker. This quick start demonstrates the complete flow: creating a RabbitMQ message listener, adding an event handler to process messages, and implementing the integration logic executed when a message is received.

<Prerequisites>

## Prerequisites

A working WSO2 Integrator environment.

<div style={{gridColumn: '1 / -1', minWidth: 0}}>
<PrereqCard icon="cloud" title="WSO2 Cloud setup" href="/get-started/setup">Sign up and launch WSO2 Integrator in the browser-based cloud editor.</PrereqCard>
</div>

You'll also need a running RabbitMQ instance. Start one with Docker:

<div style={{gridColumn: '1 / -1', minWidth: 0}}>

```bash
docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:4.2-management
```

</div>

</Prerequisites>

<Steps>

## Step 1: Create the integration

1. On the project home page, click **Create on Cloud**.

   <ThemedImage
       alt="WSO2 Cloud project home showing the Create on Cloud option"
       sources={{
           light: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
           dark: useBaseUrl('/img/deploy/cloud/deploy-from-cloud-editor/project-home.png'),
       }}
   />

2. The WSO2 Integrator cloud editor opens in your browser. Add an artifact to your integration, then deploy it to WSO2 Cloud from the Deploy to WSO2 Cloud panel on the right.

   <ThemedImage
    alt="WSO2 Integrator cloud editor landing page showing an empty integration and the Deploy to WSO2 Cloud panel"
    sources={{
        light: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
        dark: useBaseUrl('/img/get-started/setup/cloud-editor-landing.png'),
    }}
    />

:::info Note
The cloud editor creates a default integration for you, so you don't need to name it now. You can change its name when you deploy it. For more information, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).
:::

## Step 2: Add a RabbitMQ event listener

1. In the design view, click **Add Artifact manually**.

   <ThemedImage
       alt="Integration design view with the Add Artifact manually button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
           dark: useBaseUrl('/img/get-started/build-api-integration/add-artifact.png'),
       }}
   />

2. Select **RabbitMQ** under **Event Integration**.

   <ThemedImage
       alt="Artifacts page with RabbitMQ highlighted under Event Integration"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/select-rabbitmq.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-rabbitmq.png'),
       }}
   />

3. Set **Host** to `localhost` and **Port** to `5672`. If your RabbitMQ instance runs elsewhere, use its host and port instead.

4. Set **Queue Name** to `Orders`.

5. Click **Create**.

   <ThemedImage
       alt="Create RabbitMQ Event Integration form with Host, Port, and Queue Name set"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/add-a-rabbitmq-listener.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-a-rabbitmq-listener.png'),
       }}
   />

## Step 3: Add `onMessage` event handler

1. In the RabbitMQ service design view, click **+ Add Handler**.

2. In the **Select Handler to Add** panel, select **On Message**.

   <ThemedImage
       alt="Select Handler to Add panel with On Message highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/select-on-message.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-on-message.png'),
       }}
   />

3. Click **Save**.

   <ThemedImage
       alt="Configure On Message Handler panel with Format set to On Message and the Save button"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
       }}
   />

## Step 4: Add message processing logic

1. Click **+** inside the `onMessage` flow.

   <ThemedImage
       alt="onMessage flow with the add node button highlighted below the Start node"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/select-plus.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-plus.png'),
       }}
   />

2. Select **Call Function** under **Statement**.

   <ThemedImage
       alt="Node panel with Call Function highlighted under Statement"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/select-call-function.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-call-function.png'),
       }}
   />

3. Search for `printInfo` in the functions panel.

4. In the search results, go to the **Standard Library** section and select the **printInfo** function under **log**.

   <ThemedImage
       alt="Functions panel search results with printInfo highlighted under log in the Standard Library section"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/select-printinfo.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-printinfo.png'),
       }}
   />

5. Set **Msg** to `Received order`.

6. Click **Save**.

   <ThemedImage
       alt="log:printInfo panel with Msg set to Received order"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/add-message-processing-logic.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-message-processing-logic.png'),
       }}
   />

## Step 5: Run and test the integration

1. Click **Run**. The integration starts and listens for messages on the `Orders` queue.

2. Open the RabbitMQ Management UI at `http://localhost:15672`. The default username and password are both `guest`.

3. Go to **Queues and Streams** > **Orders** > **Publish message**.

4. Enter any text as the payload, and click **Publish message**.

5. Confirm the integration log displays `Received order`.

   <ThemedImage
       alt="Running the integration and the Received order log in the terminal"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration.gif'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration.gif'),
       }}
   />

## Step 6: Deploy to WSO2 Cloud

To deploy your integration to WSO2 Cloud from the cloud editor, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

<div class="skip-ahead-card">

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the OrderProcessor sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/orderprocessor" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>
  </div>
</PaletteCard>

</div>

</Steps>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program:

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

</details>

## Supported event sources

| Broker | Ballerina Package |
|---|---|
| **Apache Kafka** | `ballerinax/kafka` |
| **RabbitMQ** | `ballerinax/rabbitmq` |
| **MQTT** | `ballerinax/mqtt` |
| **Azure Service Bus** | `ballerinax/azure.servicebus` |
| **Salesforce** | `ballerinax/salesforce` |
| **GitHub Webhooks** | `ballerinax/github` |

## Learn more

- [Kafka](../../develop-and-test/integration-artifacts/event-driven-integration/kafka.md) — Consume and produce Kafka messages
- [Azure Service Bus](../../develop-and-test/integration-artifacts/event-driven-integration/azure-service-bus.md) — Integrate with Azure Service Bus queues and topics
- [RabbitMQ](../../develop-and-test/integration-artifacts/event-driven-integration/rabbitmq.md) — Full RabbitMQ listener and publisher reference
- [MQTT](../../develop-and-test/integration-artifacts/event-driven-integration/mqtt.md) — Handle MQTT messages from IoT and messaging devices
- [CDC for PostgreSQL](../../develop-and-test/integration-artifacts/event-driven-integration/cdc-postgresql.md) — React to database changes with change data capture
