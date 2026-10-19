---
title: Solace (JMS)
---

# Solace (JMS)

Solace (JMS) event integrations consume messages from a Solace PubSub+ queue or topic and trigger event handlers as each message arrives. The trigger is built on the standard Java Message Service (JMS) 2.0 API. Use it when you want portable, spec-compliant JMS session semantics — SQL-92 message selectors, standard JMS acknowledgement modes, and session-transacted messaging — instead of Solace's native JCSMP API used by the [Solace](solace.md) event integration.

## Creating a Solace (JMS) events service

1. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
2. In the **Artifacts** panel, select **Solace (JMS)** under **Event Integration**.
3. In the creation form, fill in the following fields:

   <ThemedImage
       alt="Create Solace (JMS) Event Integration form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/solace-jms/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/solace-jms/step-creation-form.png'),
       }}
   />

   | Field | Description | Default |
   |---|---|---|
   | **Listener Name** | Identifier for the listener created with this service. | `jmsListener` |
   | **Broker URL** | The Solace broker URL in the format `[protocol:]host[:port]`. Supported schemes: `smf` (plain-text) and `smfs` (TLS). | `smf://localhost:55555` |
   | **Message VPN** | The message VPN to connect to. | `default` |
   | **Authentication configuration** | How to authenticate with the broker. Select **Basic Authentication**, **Kerberos Authentication**, or **OAuth 2.0 Authentication**. | `Basic Authentication` |
   | **Destination** | Whether to consume from a **Queue** or a **Topic**. | `Queue` |
   | **Acknowledgement Mode** | The JMS session acknowledgement mode. Options: **Auto Acknowledge**, **Client Acknowledge**, **Duplicates OK Acknowledge**, **Session Transacted**. | **Auto Acknowledge** |

   **Basic Authentication fields:**

   | Field | Description |
   |---|---|
   | **Username** | Username for broker authentication. |
   | **Password** | Password for broker authentication. |

   **Kerberos Authentication fields:**

   | Field | Description | Default |
   |---|---|---|
   | **Service Name** | Kerberos service name. | `solace` |
   | **JAAS Login Context** | JAAS login context name. | `SolaceGSS` |
   | **Mutual Authentication** | Enable Kerberos mutual authentication. | Disabled |
   | **JAAS Config File Reload Enabled** | Enable automatic reload of the JAAS configuration file. | Disabled |

   **OAuth 2.0 Authentication fields:**

   | Field | Description |
   |---|---|
   | **Issuer** | OAuth 2.0 issuer identifier URI. |
   | **Access Token** | OAuth 2.0 access token. Provide this or an OIDC token. |
   | **OIDC Token** | OpenID Connect ID token. Provide this or an access token. |

   **When Destination is Queue:**

   | Field | Description |
   |---|---|
   | **Queue Name** | The durable queue to consume messages from. The queue must already exist on the broker unless **Enable Dynamic Durables** is on. |

   **When Destination is Topic:**

   | Field | Description | Default |
   |---|---|---|
   | **Topic Name** | The topic to subscribe to. | Required |
   | **Durability** | `Temporary` for a non-durable subscription, or `Durable` for a durable topic subscription. | `Temporary` |
   | **Subscriber Name** | The durable subscription name. Required when **Durability** is `Durable`. | — |

   Expand **Advanced Configurations** to set `secureSocket`, `clientName`, `clientDescription`, `enableDynamicDurables`, `directTransport`, `directOptimized`, `compressionLevel`, `localhost`, `connectTimeout`, `readTimeout`, `retryConfig`, `transportWindowSize`, `ackThreshold`, and `ackTimer`. The last three only apply when `directTransport` is off.

4. Click **Create**.

5. WSO2 Integrator opens the service in the **Service Designer**. The canvas shows the attached listener pill, the queue or topic name pill, and an empty **Event Handlers** section.

   <ThemedImage
       alt="Service Designer showing the Solace (JMS) Event Integration canvas"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/solace-jms/step-service-designer.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/solace-jms/step-service-designer.png'),
       }}
   />

6. Click **+ Add Handler** to add event handlers.

```ballerina
import ballerinax/solace.jms;
import ballerina/log;

configurable string brokerUrl = "smf://localhost:55555";
configurable string msgVpn = "default";
configurable string username = "admin";
configurable string password = "admin";

listener jms:Listener jmsListener = check new (
    brokerUrl,
    messageVpn = msgVpn,
    auth = {
        username: username,
        password: password
    }
);

type OrderMessage record {|
    string orderId;
|};

type Message record {|
    *jms:Message;
    OrderMessage payload;
|};

@jms:ServiceConfig {
    queueName: "test-queue",
    ackMode: jms:AUTO_ACKNOWLEDGE
}
service jms:Service on jmsListener {

    remote function onMessage(Message message, jms:Caller caller) returns jms:Error? {
        log:printInfo("Message received", orderId = message.payload.orderId);
    }

    remote function onError(jms:Error err) returns jms:Error? {
        log:printError("Solace JMS error", 'error = err);
    }
}
```

## Service configuration

In the **Service Designer**, click the **Configure** icon in the header to open the **Solace (JMS) Event Integration Configuration** panel. Select **Solace (JMS) Event Integration** in the left panel.

The **ServiceConfig** field accepts a record expression that sets the destination and message handling options.

**Queue service configuration fields:**

| Field | Description | Default |
|---|---|---|
| **queueName** | Name of the queue to consume from. | Required |
| **ackMode** | JMS session acknowledgement mode: `AUTO_ACKNOWLEDGE`, `CLIENT_ACKNOWLEDGE`, `DUPS_OK_ACKNOWLEDGE`, or `SESSION_TRANSACTED`. | `AUTO_ACKNOWLEDGE` |
| **messageSelector** | JMS SQL-92 message selector expression. | — |

**Topic service configuration fields:**

| Field | Description | Default |
|---|---|---|
| **topicName** | Name of the topic to subscribe to. | Required |
| **durability** | `TEMPORARY` for a non-durable subscription, or `DURABLE` for a durable topic subscription. | `TEMPORARY` |
| **subscriberName** | Durable subscription name. Required when **durability** is `DURABLE`. | — |
| **ackMode** | JMS session acknowledgement mode: `AUTO_ACKNOWLEDGE`, `CLIENT_ACKNOWLEDGE`, `DUPS_OK_ACKNOWLEDGE`, or `SESSION_TRANSACTED`. | `AUTO_ACKNOWLEDGE` |
| **messageSelector** | JMS SQL-92 message selector expression. Not supported on a direct (non-`directTransport: false`) topic subscription. | — |

```ballerina
// Queue subscription
@jms:ServiceConfig {
    queueName: "orders",
    ackMode: jms:CLIENT_ACKNOWLEDGE
}
service jms:Service on jmsListener {
    remote function onMessage(jms:Message message, jms:Caller caller) returns jms:Error? {
        check caller->ack(message);
    }
}

// Topic subscription
@jms:ServiceConfig {
    topicName: "trades",
    durability: jms:TEMPORARY,
    ackMode: jms:AUTO_ACKNOWLEDGE
}
service jms:Service on jmsListener {
    remote function onMessage(jms:Message message) returns jms:Error? {
    }
}
```

## Listener configuration

In the **Solace (JMS) Event Integration Configuration** panel, select **jmsListener** under **Attached Listeners** to configure the listener.

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `jmsListener` |
| **Url** | The Solace broker URL in the format `[protocol:]host[:port]`. Supported schemes: `smf` (plain-text) and `smfs` (TLS). | `smf://localhost:55555` |
| **Message Vpn** | The name of the message VPN to connect to. | `default` |
| **Auth** | Authentication configuration. Supports basic authentication, Kerberos, and OAuth 2.0. | Required |
| **Secure Socket** | TLS/SSL configuration for secure connections. | — |
| **Client Name** | Client identifier reported to the broker. A unique name is generated when omitted. | — |
| **Client Description** | Human-readable description of the client connection. | `Ballerina Solace JMS Connector` |
| **Enable Dynamic Durables** | Automatically provision durable destinations that don't already exist on the broker. | Disabled |
| **Direct Transport** | Consume over direct (at-most-once) transport. Turn off for session-transacted services or flow-control tuning. | Enabled |
| **Direct Optimized** | Optimize the session for direct messaging throughput. | Enabled |
| **Compression Level** | ZLIB compression level. Valid range is 0–9, where `0` disables compression. | `0` |
| **Localhost** | Local interface IP address to bind for outbound connections. | — |
| **Connect Timeout** | Connection timeout, in seconds. | `30.0` |
| **Read Timeout** | Read timeout, in seconds. | `10.0` |
| **Retry Config** | Reconnection retry configuration. | — |
| **Transport Window Size** | Maximum number of guaranteed messages in flight, unacknowledged (1–255). Only applies when **Direct Transport** is off. | — |
| **Ack Threshold** | Percentage of **Transport Window Size** consumed before an automatic acknowledgement is sent (1–75). Only applies when **Direct Transport** is off. | `60` |
| **Ack Timer** | Maximum time in seconds to hold an unacknowledged message before sending an automatic acknowledgement (0.02–1.5). Only applies when **Direct Transport** is off. | — |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

```ballerina
listener jms:Listener jmsListener = check new (
    "smf://localhost:55555",
    messageVpn = "default",
    auth = {
        username: username,
        password: password
    },
    clientName = "my-client",
    directTransport = true,
    compressionLevel = 0
);
```

`jms:ListenerConfiguration` fields:

| Field | Type | Default | Description |
|---|---|---|---|
| **url** (constructor parameter) | `string` | Required | Solace broker URL |
| **messageVpn** | `string` | `"default"` | Message VPN name |
| **auth** | `jms:BasicAuthConfiguration\|jms:KerberosConfiguration\|jms:OAuth2Configuration` | Required | Authentication configuration |
| **secureSocket** | `jms:SecureSocket?` | — | TLS/SSL configuration |
| **clientName** | `string?` | — | Client identifier |
| **clientDescription** | `string` | `"Ballerina Solace JMS Connector"` | Client description |
| **enableDynamicDurables** | `boolean` | `false` | Automatically provision durable destinations that don't already exist |
| **directTransport** | `boolean` | `true` | Consume over direct (at-most-once) transport |
| **directOptimized** | `boolean` | `true` | Optimize the session for direct messaging throughput |
| **compressionLevel** | `int` | `0` | ZLIB compression level (0–9) |
| **localhost** | `string?` | — | Local interface IP address |
| **connectTimeout** | `decimal` | `30.0` | Connection timeout in seconds |
| **readTimeout** | `decimal` | `10.0` | Read timeout in seconds |
| **retryConfig** | `jms:RetryConfiguration?` | — | Reconnection retry configuration |
| **transportWindowSize** | `int?` | — | Maximum in-flight unacknowledged messages (1–255); only when `directTransport` is `false` |
| **ackThreshold** | `int` | `60` | Percentage of `transportWindowSize` before an automatic ack (1–75); only when `directTransport` is `false` |
| **ackTimer** | `decimal?` | — | Maximum time to hold an unacknowledged message (0.02–1.5s); only when `directTransport` is `false` |

## Event handlers

### Adding an event handler

In the **Service Designer**, click **+ Add Handler**. The **Select Handler to Add** panel lists `onMessage` and `onError`.

**onMessage** — opens a configuration panel before saving:

| Option | Description |
|---|---|
| **Define Value** | Define the expected payload type of the incoming message, either by creating a new type schema or reusing an existing one. |

Click **Save** to add the handler.

**onError** — added directly without additional configuration.

**onMessage handler** — called for each message received:

```ballerina
type TradeEvent record {|
    string tradeId;
    string symbol;
    decimal price;
    int quantity;
|};

type TradeMessage record {|
    *jms:Message;
    TradeEvent payload;
|};

function executeTrade(TradeEvent trade) returns error? {}

@jms:ServiceConfig {
    queueName: "trades",
    ackMode: jms:CLIENT_ACKNOWLEDGE
}
service jms:Service on jmsListener {

    remote function onMessage(TradeMessage message, jms:Caller caller) returns jms:Error? {
        do {
            log:printInfo("Trade received",
                          tradeId = message.payload.tradeId,
                          symbol = message.payload.symbol);
            check executeTrade(message.payload);
            check caller->ack(message);
        } on fail error e {
            return error("unhandled error", e);
        }
    }
}
```

**onError handler** — called when message receipt or data binding fails:

```ballerina
@jms:ServiceConfig {
    queueName: "trades"
}
service jms:Service on jmsListener {

    remote function onMessage(jms:Message message) returns error? {
    }

    remote function onError(jms:Error err) returns jms:Error? {
        log:printError("Solace JMS error", 'error = err);
    }
}
```

### Handler types

| Handler | Triggered when | Use when |
|---|---|---|
| `onMessage` | A new message arrives from the queue or topic | Processing incoming messages |
| `onError` | A message receipt or data-binding error occurs | Logging failures and triggering alerts |

## What's next

- [Solace](solace.md) — consume messages from Solace PubSub+ using the native JCSMP API
- [Kafka](kafka.md) — consume messages from Apache Kafka topics
- [RabbitMQ](rabbitmq.md) — consume messages from RabbitMQ queues
- [Connections](../supportive-artifacts/connections.md) — reuse Solace connection credentials across services
