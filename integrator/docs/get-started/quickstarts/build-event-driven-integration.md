---
title: Build an Event-Driven Integration
---

# Build an Event-Driven Integration

<QuickstartHeader
  time="Under 10 minutes"
  build={<>An event-driven integration that consumes messages from <code>Orders</code> queue in RabbitMQ broker and processes them.</>}
/>

<p style={{textAlign: 'justify'}}>
Event integrations are designed for reactive workflows triggered by messages from a broker. This quick start demonstrates the complete flow: creating a RabbitMQ message listener, adding an event handler to process messages, and implementing the integration logic executed when a message is received.
</p>

## Prerequisites

A working WSO2 Integrator environment.

<PrereqCard icon="local" title="Local setup" href="/get-started/setup">
  Install and launch WSO2 Integrator on your machine.

<PrereqCard icon="cloud" title="WSO2 Cloud Account" href="/get-started/setup" cloud>
  For AI assisted development and WSO2 Cloud deployments.

Also required, a running RabbitMQ instance. To start one with Docker, run:

```bash
docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:4.2-management
```

## Step 1: Create the integration

:::info Note
If you're using the cloud editor, a project is already open, so you can skip this step and go directly to [Step 2: Add a RabbitMQ event listener](#step-2-add-a-rabbitmq-event-listener).

1. Open WSO2 Integrator.

2. Click **Create** in the **Create a Project** card.

   <ThemedImage
      alt="WSO2 Integrator home screen with the Create a Project card"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/wso2-integrator.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/wso2-integrator.png'),
      }}
   />

3. Set **Project name** to `event-integration`.

4. Set **Integration name** to `OrderProcessor`.

5. Click **Create**.

   <ThemedImage
      alt="Create a Project form with Project name set to event-integration and Integration name set to OrderProcessor"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/create-project.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/create-project.png'),
      }}
   />

## Step 2: Add a RabbitMQ event listener

1. Select your integration from the project overview canvas.

2. In the design view, click **Add Artifact manually**.

   <ThemedImage
      alt="Integration design view with the Add Artifact manually button highlighted"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/add-artifact.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-artifact.png'),
      }}
   />

3. Select **RabbitMQ** under **Event Integration**.

   <ThemedImage
      alt="Artifacts page with RabbitMQ highlighted under Event Integration"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/select-rabbitmq.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-rabbitmq.png'),
      }}
   />

4. Set **Host** to `localhost` and **Port** to `5672` (update these if your RabbitMQ instance runs elsewhere).

5. Set **Queue Name** to `Orders`.

6. Click **Create**.

   <ThemedImage
      alt="Create RabbitMQ Event Integration form with Host, Port, and Queue Name set"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/add-rabbitmq.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-rabbitmq.png'),
      }}
   />

## Step 3: Add `onMessage` event handler

1. In the RabbitMQ service design view, click **+ Add Handler**.

2. Set **Format** to **On Message**.

3. Click **Save**.

   <ThemedImage
      alt="Configure On Message Handler panel with Format set to On Message"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-event-handler.png'),
      }}
   />

## Step 4: Add message processing logic

1. Click **+** inside the `onMessage` flow.

2. Select **Call Function** under **Statement**.

   <ThemedImage
      alt="Node panel with Call Function highlighted under Statement"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/select-call-function.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-call-function.png'),
      }}
   />

3. Select **printInfo** under **log**.

   <ThemedImage
      alt="Functions list with printInfo highlighted under log"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/select-printinfo.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-printinfo.png'),
      }}
   />

4. Set **Msg** to `Received order`.

5. Click **Save**.

   <ThemedImage
      alt="log:printInfo panel with Msg set to Received order"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/set-msg.png'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/set-msg.png'),
      }}
   />

## Step 5: Run and test the integration

1. Click **Run**.

2. The integration starts and listens for messages on the `Orders` queue.

3. Open the RabbitMQ Management UI at `http://localhost:15672` (default credentials: guest/guest).
   - Go to **Queues and Streams → Orders → Publish message**, enter any text as the payload, and click **Publish message**.
   - Confirm the integration log displays `Received order`.

   <ThemedImage
      alt="Running the integration and the Received order log in the terminal"
      sources={{
         light: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration.gif'),
         dark: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test-the-integration.gif'),
      }}
   />

## Step 6: Deploy to WSO2 Cloud

Before you deploy, set **Host** and **Port** to a RabbitMQ broker that WSO2 Cloud can reach; `localhost` doesn't resolve to your local broker there.

Deploy your integration to WSO2 Cloud - Integration Platform in any of the following ways:

- If you're using the cloud editor, see [Save and deploy](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md#save-and-deploy).
- If you're using WSO2 Integrator on your machine, see [Deploy from WSO2 Integrator](../../deploy-and-run/deploy-to-wso2-cloud/push-from-ide.md).

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">Skip ahead: deploy a ready-made sample</h3>
  <p class="palette-card-desc">Rather not build it yourself? One-click deploy the OrderProcessor sample straight to WSO2 Cloud.</p>
  <div class="palette-chip-row" style={{justifyContent: 'center'}}>
    <a href="https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/quickstart/orderprocessor" target="_blank" rel="noopener noreferrer">
      <img src="https://openindevant.choreoapps.dev/images/DeployDevant.svg" alt="Deploy to WSO2 Cloud" style={{display: 'block', margin: '0', border: 'none', boxShadow: 'none'}} />
    </a>


</div>

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
| **MQTT** | `ballerina/mqtt` |
| **Azure Service Bus** | `ballerinax/asb` |
| **Salesforce** | `ballerinax/salesforce` |
| **GitHub Webhooks** | `ballerinax/trigger.github` |

## What's next

- [Kafka](../../develop-and-test/integration-artifacts/event-driven-integration/kafka.md) — Consume and produce Kafka messages
- [Azure Service Bus](../../develop-and-test/integration-artifacts/event-driven-integration/azure-service-bus.md) — Integrate with Azure Service Bus queues and topics
- [RabbitMQ](../../develop-and-test/integration-artifacts/event-driven-integration/rabbitmq.md) — Full RabbitMQ listener and publisher reference
- [MQTT](../../develop-and-test/integration-artifacts/event-driven-integration/mqtt.md) — Handle MQTT messages from IoT and messaging devices
- [CDC for PostgreSQL](../../develop-and-test/integration-artifacts/event-driven-integration/cdc-postgresql.md) — React to database changes with change data capture
