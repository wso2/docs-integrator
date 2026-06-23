---
title: RabbitMQ
description: Create event-driven integrations that consume messages from RabbitMQ queues using typed message handling, manual acknowledgment, and configurable listener settings.
keywords: [wso2 integrator, rabbitmq, event integration, rabbitmq listener, rabbitmq consumer, message queue, amqp, message processing]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# RabbitMQ

RabbitMQ event integrations connect WSO2 Integrator to a RabbitMQ broker as a message consumer. Use them for asynchronous task processing, event-driven workflows, and decoupled integrations where producers publish messages that must be reliably consumed and processed. This page covers how to create a RabbitMQ service, configure the service and listener settings, define event handlers for message processing, and apply error handling patterns.

## Creating a RabbitMQ service

A RabbitMQ service consists of a listener that connects to the broker and one or more event handlers that process incoming messages.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open your integration in WSO2 Integrator IDE. If you don't have an integration yet, see [Create a new integration](../../create-integrations/create-a-new-integration.md) to set one up first.
2. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
3. In the **Artifacts** panel, select **RabbitMQ** under **Event Integration**.
4. Fill in the creation form fields and select **Create**.

   <ThemedImage
       alt="RabbitMQ service creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-creation-form.png'),
       }}
   />

   | Field | Description | Example |
   |---|---|---|
   | **Listener Name** | Identifier for the listener created with this service. This name is used to reference the listener in the service declaration and in the configuration panel. | `rabbitmqListener` |
   | **Host** | Hostname or IP address of the RabbitMQ broker. | `localhost` |
   | **Port** | Port used to connect to the broker. | `5672` |
   | **Queue Name** | Name of the RabbitMQ queue the service subscribes to. | `orders` |

   WSO2 Integrator opens the empty service in the **Service Designer**.

   <ThemedImage
       alt="RabbitMQ Service Designer showing the listener pill and Add Handler button"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-service-designer.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

`rabbitmq:Service` connects to a RabbitMQ broker via a `rabbitmq:Listener` and processes incoming messages through the `onMessage` remote function. Annotate the service with `@rabbitmq:ServiceConfig` to set the target queue.

```ballerina
import ballerinax/rabbitmq;
import ballerina/log;

configurable string host = "localhost";
configurable int port = 5672;

listener rabbitmq:Listener rabbitmqListener = new (host, port);

@rabbitmq:ServiceConfig {
    queueName: "orders"
}
service on rabbitmqListener {

    remote function onMessage(rabbitmq:AnydataMessage message) returns error? {
        log:printInfo("Message received", content = message.content.toString());
    }
}
```

</TabItem>
</Tabs>

## Service configuration

Service configuration sets the queue the service subscribes to, controls message acknowledgment behavior, and defines queue declaration properties.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **RabbitMQ Event Integration Configuration** panel. Select **RabbitMQ Event Integration** in the left panel.

<ThemedImage
    alt="RabbitMQ Event Integration Configuration panel"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-service-config.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-service-config.png'),
    }}
/>

After making edits, click **Save Changes** to apply them.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Place the `@rabbitmq:ServiceConfig` annotation before the `service` declaration to set the queue and acknowledgment mode:

```ballerina
import ballerinax/rabbitmq;
import ballerina/log;

listener rabbitmq:Listener rabbitmqListener = new ("localhost", 5672);

@rabbitmq:ServiceConfig {
    queueName: "orders",
    autoAck: false,
    config: {
        durable: true,
        autoDelete: false
    }
}
service on rabbitmqListener {

    remote function onMessage(rabbitmq:AnydataMessage message,
                              rabbitmq:Caller caller) returns error? {
        log:printInfo("Message received", content = message.content.toString());
        check caller->basicAck();
    }
}
```

</TabItem>
</Tabs>

### Service configuration fields

| Field | Description |
|---|---|
| **Queue Name** | Name of the queue to subscribe to. Required. |
| **Auto Ack** | When enabled, messages are automatically acknowledged after the handler returns. When disabled, use `rabbitmq:Caller` in the handler to acknowledge or reject messages manually. Defaults to enabled. |
| **Config** | Optional. Additional settings for queue declaration. See queue configuration fields below. |

### Queue configuration fields

The `config` field accepts a `QueueConfig` record that controls how the queue is declared on the broker.

| Field | Description |
|---|---|
| **Durable** | When `true`, the queue survives broker restarts. Defaults to `true`. |
| **Exclusive** | When `true`, the queue is used by only one connection and is deleted when that connection closes. Defaults to `false`. |
| **Auto Delete** | When `true`, the queue is automatically deleted when the last consumer unsubscribes. Defaults to `false`. |
| **Arguments** | Optional. Additional construction arguments for the queue as key-value pairs. |

## Listener configuration

The listener manages the connection to the RabbitMQ broker and controls consumer behavior including authentication, heartbeats, and security.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **RabbitMQ Event Integration Configuration** panel, select the listener name under **Attached Listeners** to open its settings.

<ThemedImage
    alt="Listener configuration showing connection and authentication fields"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-listener-config-1.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-listener-config-1.png'),
    }}
/>

After making edits, click **Save Changes** to apply them.

| Field | Description |
|---|---|
| **Name** | Identifier for this listener, referenced in the service declaration. |
| **Host** | Hostname or IP address of the RabbitMQ broker. |
| **Port** | Port used to connect to the broker. Defaults to `5672`. |
| **Qos Settings** | Consumer prefetch settings. Controls how many unacknowledged messages can be in flight at once. |
| **Username** | Username for broker authentication. |
| **Password** | Password for broker authentication. |
| **Virtual Host** | Virtual host to use when connecting to the broker. |
| **Connection Timeout** | TCP connection establishment timeout in seconds. Set to `0` for no timeout. |
| **Handshake Timeout** | AMQP 0-9-1 protocol handshake timeout in seconds. |
| **Shutdown Timeout** | Time in seconds to wait for consumers to finish before shutting down. Set to `0` for no timeout. Defaults to `10`. |
| **Heartbeat** | Heartbeat interval in seconds. Set to `0` to disable heartbeats. |
| **Validation** | Enables constraint validation on incoming message content. |
| **Secure Socket** | SSL/TLS configuration for secure connections. |
| **Auth** | Authentication record with `username` and `password` fields. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Declare a `rabbitmq:Listener` with the broker address and connection configuration:

```ballerina
import ballerinax/rabbitmq;

listener rabbitmq:Listener rabbitmqListener = new ("localhost", 5672, {
    auth: {
        username: "guest",
        password: "guest"
    },
    heartbeat: 60
});
```

| Field | Description |
|---|---|
| `host` | RabbitMQ broker hostname. Defaults to `"localhost"`. |
| `port` | Broker port. Defaults to `5672`. |
| `username` | Broker username. |
| `password` | Broker password. |
| `virtualHost` | Virtual host for the connection. |
| `connectionTimeout` | TCP connection timeout in seconds. Set to `0` for no timeout. |
| `handshakeTimeout` | AMQP handshake timeout in seconds. |
| `shutdownTimeout` | Shutdown timeout in seconds. Set to `0` for no timeout. Defaults to `10`. |
| `heartbeat` | Heartbeat interval in seconds. Set to `0` to disable. |
| `secureSocket` | TLS/SSL configuration. |
| `validation` | Enables constraint validation on incoming messages. |

</TabItem>
</Tabs>

## Event handlers

RabbitMQ event trigger supports three remote methods.

| Handler | Triggered when |
|---|---|
| `onMessage` | A new message arrives on the subscribed queue |
| `onRequest` | An RPC request message arrives with a `replyTo` property set |
| `onError` | Message processing fails or a handler returns an error |

To add a handler in the **Service Designer**, click **+ Add Handler** and select the handler type in the **Select Handler to Add** panel. WSO2 Integrator opens the **Flow Designer** for that handler.

### onMessage

`onMessage` is the primary event handler for message processing. It is called once for each message delivered from the queue. By default, messages are automatically acknowledged after the handler returns. Set `autoAck: false` in the service configuration and include `rabbitmq:Caller` to acknowledge or reject messages manually.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Select **onMessage** in the **Select Handler to Add** panel and click **Save**. The **Flow Designer** opens with the handler configuration.

<ThemedImage
    alt="onMessage handler configuration panel showing Define Content and Caller options"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-add-handler.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/rabbitmq/step-add-handler.png'),
    }}
/>

To bind the incoming message content to a specific type, click **+ Define Content** next to the **Message** configuration field. Paste a sample JSON to let WSO2 Integrator infer the message shape. If you skip **+ Define Content**, the handler receives a `rabbitmq:AnydataMessage` where `content` is `anydata`, requiring a manual type cast to access the message payload.

Under **Advanced Parameters**, enable **Caller** to include the `rabbitmq:Caller` parameter in the handler signature. This is required when **Auto Ack** is disabled on the service and you need to acknowledge messages manually.

Use the flow canvas to add processing steps such as database writes, HTTP calls, data transformations, and conditional logic.

| Parameter | Description |
|---|---|
| **message** | The incoming RabbitMQ message. Access the `content` field to read the message payload and `properties` for AMQP metadata. |
| **caller** | Optional. Enables manual message acknowledgment. Enable **Caller** under **Advanced Parameters** when **Auto Ack** is disabled on the service. Use a **BasicAck** action to acknowledge or a **BasicNack** action to reject the message. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Cast `message.content` to the expected type and use `rabbitmq:Caller` to acknowledge the message after processing:

```ballerina
import ballerinax/rabbitmq;
import ballerina/log;

type Order readonly & record {
    int orderId;
    string productName;
    decimal price;
};

listener rabbitmq:Listener rabbitmqListener = new ("localhost", 5672);

@rabbitmq:ServiceConfig {
    queueName: "orders",
    autoAck: false
}
service on rabbitmqListener {

    remote function onMessage(rabbitmq:AnydataMessage message,
                              rabbitmq:Caller caller) returns error? {
        Order order = check message.content.ensureType();
        log:printInfo(string `Processing order ${order.orderId}`);
        check caller->basicAck();
    }
}
```

</TabItem>
</Tabs>

### onRequest

`onRequest` handles RPC-style messaging where the message producer expects a reply. It is called when a message is published with a `replyTo` property set. The value returned from `onRequest` is automatically published to the reply queue.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Select **onRequest** in the **Select Handler to Add** panel and click **Save**. The **Flow Designer** opens with the handler. Use the flow canvas to process the request and return a response value.

| Parameter | Description |
|---|---|
| **message** | The incoming RPC request. Access `message.content` for the request payload and `message.properties.replyTo` for the reply queue name. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Return a value from `onRequest`. The listener automatically publishes it to the `replyTo` queue specified in the message properties:

```ballerina
import ballerinax/rabbitmq;
import ballerina/log;

type PriceRequest record {|
    string productId;
|};

listener rabbitmq:Listener rabbitmqListener = new ("localhost", 5672);

@rabbitmq:ServiceConfig {
    queueName: "price-requests"
}
service on rabbitmqListener {

    remote function onRequest(rabbitmq:AnydataMessage message) returns decimal|error {
        PriceRequest request = check message.content.ensureType();
        log:printInfo(string `Price request for ${request.productId}`);
        return 99.99d;
    }
}
```

</TabItem>
</Tabs>

The `rabbitmq:AnydataMessage` type is common to all handlers and contains the following fields:

| Field | Type | Description |
|---|---|---|
| `content` | `anydata` | Message payload. Cast using `message.content.ensureType()` to access as a typed record. |
| `routingKey` | `string` | Routing key used when the message was published. |
| `exchange` | `string` | Exchange the message was published to. Empty string for the default exchange. |
| `deliveryTag` | `int` | Unique delivery identifier. Used with `caller->basicAck()` or `caller->basicNack()` for manual acknowledgment. |
| `properties` | `rabbitmq:BasicProperties?` | AMQP message properties including `replyTo`, `correlationId`, `contentType`, and `headers`. |

## Error handling

The `onError` handler is invoked when `onMessage` or `onRequest` returns an error. Use it to log failures, route messages to a dead-letter queue, or trigger alerting. If `onError` is not defined in the service, processing failures are logged to the console with the full stack trace.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Select **onError** in the **Select Handler to Add** panel and click **Save**. The **Flow Designer** opens with the handler signature. Use the flow canvas to add logging, dead-letter forwarding, or alerting steps.

| Parameter | Description |
|---|---|
| **message** | The original RabbitMQ message that caused the failure. Access `message.content` to inspect the payload. |
| **err** | The error returned from the failed handler. Use `err.message()` for the failure description and `err.cause()` for the underlying cause. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Add `onError` to the service to handle processing failures. The handler receives the original message and the error returned by the failed handler:

```ballerina
import ballerinax/rabbitmq;
import ballerina/log;

type Order readonly & record {
    int orderId;
    string productName;
    decimal price;
};

listener rabbitmq:Listener rabbitmqListener = new ("localhost", 5672);

@rabbitmq:ServiceConfig {
    queueName: "orders"
}
service on rabbitmqListener {

    remote function onMessage(rabbitmq:AnydataMessage message) returns error? {
        Order order = check message.content.ensureType();
        log:printInfo(string `Processing order ${order.orderId}`);
    }

    remote function onError(rabbitmq:AnydataMessage message,
                            rabbitmq:Error err) returns error? {
        log:printError("Message processing failed",
                       err,
                       content = message.content.toString());
    }
}
```

</TabItem>
</Tabs>

## What's next

- [RabbitMQ connector overview](../../../connectors/catalog/messaging/rabbitmq/connector-overview.md) — publish messages and manage queues using the RabbitMQ producer client
- [RabbitMQ connector example](../../../connectors/catalog/messaging/rabbitmq/example.md) — end-to-end example combining a RabbitMQ consumer and producer
- [RabbitMQ trigger reference](../../../connectors/catalog/messaging/rabbitmq/triggers.md) — full listener and service callback API reference
- [Data mapper](../../integration-artifacts/supporting/data-mapper/data-mapper.md) — transform RabbitMQ message payloads between formats using the visual data mapper
- [Connections](../supporting/connections.md) — store RabbitMQ credentials as reusable named connections
