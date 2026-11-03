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

<div style={{gridColumn: '1 / -1', minWidth: 0}}>

You'll also need access to a RabbitMQ instance that is reachable over the internet. Have the following details ready:

- The instance's host and port.
- A username and password for the instance.
- The instance's virtual host.

:::tip Get a free RabbitMQ instance
If you don't have a RabbitMQ instance, create a free one on [CloudAMQP](https://www.cloudamqp.com/) using the **Little Lemur** plan. Then open the instance and find its connection details under **AMQP details**. Use port `5672`, and use the **User & Vhost** value as both the username and the virtual host.
:::

:::info Note
The cloud editor runs in WSO2 Cloud and cannot connect to a RabbitMQ instance running on `localhost` on your computer.
:::

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

2. The WSO2 Integrator cloud editor opens in your browser.

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

3. Set **Host** to your RabbitMQ instance's host, and **Port** to its port. The default RabbitMQ port is `5672`.

4. Set **Queue Name** to `Orders`.

5. Click **Create**.

   <ThemedImage
       alt="Create RabbitMQ Event Integration form with Host, Port, and Queue Name set"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/add-a-rabbitmq-listener.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/add-a-rabbitmq-listener.png'),
       }}
   />

6. Under **Listeners** in the project explorer, select **rabbitmqListener** to open the **Rabbitmq Listener Configuration** page.

7. Set **Username** and **Password** to your RabbitMQ instance's username and password.

8. Set **Virtual Host** to your instance's virtual host. For CloudAMQP, this is the same as the username.

   <ThemedImage
       alt="Rabbitmq Listener Configuration page with Username, Password, and Virtual Host set"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/set-listener-credentials.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/set-listener-credentials.png'),
       }}
   />

9. Scroll to the bottom of the page, and click **Save**.

   <ThemedImage
       alt="Bottom of the Rabbitmq Listener Configuration page with the Save button highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/save-listener.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/save-listener.png'),
       }}
   />

## Step 3: Add `onMessage` event handler

1. Under **Entry Points** in the project explorer, select **RabbitMQ Event Integration** to open the service design view.

2. Click **+ Add Handler**.

3. In the **Select Handler to Add** panel, select **On Message**.

   <ThemedImage
       alt="Select Handler to Add panel with On Message highlighted"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/select-on-message.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/select-on-message.png'),
       }}
   />

4. Click **Save**.

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

2. In CloudAMQP, open your instance and click **RabbitMQ Manager**. The RabbitMQ management UI opens in a new tab, already signed in.

3. Click the **Queues and Streams** tab, and then click **Orders** in the **Name** column.

4. On the **Orders** queue page, scroll down and click the **Publish message** section heading to open it.

5. In **Payload**, enter any text, for example `order 1`.

6. Click the **Publish message** button below the **Payload** box.

7. Confirm the **Debug Console** shows a log line that ends with `message="Received order"`.

   <ThemedImage
       alt="Debug Console showing the Received order log line after a message is published"
       sources={{
           light: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test.png'),
           dark: useBaseUrl('/img/get-started/build-event-driven-integration/run-and-test.png'),
       }}
   />

## Step 6: Deploy to WSO2 Cloud

To deploy your integration to WSO2 Cloud from the cloud editor, see [Save and deploy](/deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor#save-and-deploy).

</Steps>

## Source code

<details>
<summary>View the generated Ballerina code</summary>

The steps above generate the following complete, runnable Ballerina program:

```ballerina
import ballerina/log;
import ballerinax/rabbitmq;

listener rabbitmq:Listener rabbitmqListener = new (host = "<your-rabbitmq-host>", port = 5672, username = "<your-username>", password = "<your-password>", virtualHost = "<your-vhost>");

@rabbitmq:ServiceConfig {queueName: "Orders"}
service rabbitmq:Service on rabbitmqListener {
    remote function onMessage(rabbitmq:AnydataMessage message) returns error? {
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
