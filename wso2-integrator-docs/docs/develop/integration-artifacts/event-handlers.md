---
sidebar_position: 2
title: Event Handlers
description: Build reactive integrations triggered by Kafka, RabbitMQ, MQTT, Azure Service Bus, Salesforce, Twilio, GitHub, Solace, and CDC events.
---

# Event Handlers

Event handlers are reactive integrations that process messages and events as they arrive from external systems. They connect to message brokers, SaaS platforms, and change data capture streams, enabling real-time event-driven architectures.

## Kafka Consumer

Consume messages from Apache Kafka topics with consumer group management, offset control, and schema-aware deserialization.

```ballerina
import ballerinax/kafka;

configurable string bootstrapServers = "localhost:9092";
configurable string groupId = "order-processor";

type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
    string timestamp;
|};

listener kafka:Listener orderListener = new ({
    bootstrapServers: bootstrapServers,
    groupId: groupId,
    topics: ["orders"],
    pollingInterval: 1,
    autoCommit: false
});

service on orderListener {

    remote function onConsumerRecord(kafka:Caller caller, OrderEvent[] orders) returns error? {
        foreach OrderEvent order in orders {
            log:printInfo("Processing order", orderId = order.orderId, amount = order.amount);
            check processOrder(order);
        }
        // Manual commit after successful processing
        check caller->commit();
    }

    remote function onError(kafka:Error err) {
        log:printError("Kafka consumer error", 'error = err);
    }
}
```

### Offset Management Strategies

| Strategy | Configuration | Behavior |
|---|---|---|
| **Auto-commit** | `autoCommit: true` | Offsets committed automatically at the polling interval |
| **Manual commit** | `autoCommit: false` | Call `caller->commit()` after processing |
| **Seek to beginning** | `autoOffsetReset: "earliest"` | Reprocess from the beginning of the topic |
| **Seek to end** | `autoOffsetReset: "latest"` | Skip to the latest messages only |

## RabbitMQ Consumer

Consume messages from RabbitMQ with exchange binding, queue configuration, and acknowledgment control.

```ballerina
import ballerinax/rabbitmq;

configurable string rmqHost = "localhost";
configurable int rmqPort = 5672;

type NotificationEvent record {|
    string userId;
    string 'type;
    string message;
|};

listener rabbitmq:Listener rmqListener = new (rmqHost, rmqPort);

@rabbitmq:ServiceConfig {
    queueName: "notifications",
    autoAck: false
}
service on rmqListener {

    remote function onMessage(rabbitmq:AnydataMessage message,
                              rabbitmq:Caller caller) returns error? {
        NotificationEvent event = check message.content.ensureType();
        log:printInfo("Notification received", userId = event.userId, type = event.'type);

        check sendNotification(event);
        check caller->basicAck();
    }

    remote function onError(rabbitmq:AnydataMessage message,
                            rabbitmq:Error err) returns error? {
        log:printError("RabbitMQ processing error", 'error = err);
        // Message will be redelivered or sent to DLQ
    }
}
```

## MQTT Subscriber

Subscribe to MQTT topics for IoT data collection and lightweight messaging.

```ballerina
import ballerinax/mqtt;

configurable string mqttBroker = "tcp://localhost:1883";

type SensorReading record {|
    string sensorId;
    float temperature;
    float humidity;
    string timestamp;
|};

listener mqtt:Listener mqttListener = new (mqttBroker, "sensor-collector", {
    connectionConfig: {
        username: "device",
        password: "secret"
    }
});

@mqtt:ServiceConfig {
    topics: ["sensors/+/readings"],
    qualityOfService: mqtt:EXACTLY_ONCE
}
service on mqttListener {

    remote function onMessage(mqtt:Message message) returns error? {
        SensorReading reading = check (check message.content.ensureType(json)).fromJsonWithType();
        log:printInfo("Sensor reading", sensorId = reading.sensorId,
                      temperature = reading.temperature);
        check storeSensorReading(reading);
    }

    remote function onError(mqtt:Error err) {
        log:printError("MQTT subscriber error", 'error = err);
    }
}
```

### MQTT QoS Levels

| Level | Name | Guarantee |
|---|---|---|
| `0` | At most once | Fire and forget, no acknowledgment |
| `1` | At least once | Acknowledged delivery, possible duplicates |
| `2` | Exactly once | Four-step handshake, no duplicates |

## Azure Service Bus Consumer

Consume messages from Azure Service Bus queues and topic subscriptions.

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

type InvoiceMessage record {|
    string invoiceId;
    string vendorId;
    decimal amount;
    string currency;
|};

listener asb:Listener asbListener = new ({
    connectionString: connectionString,
    entityConfig: {
        queueName: "invoices"
    },
    receiveMode: asb:PEEK_LOCK,
    maxConcurrency: 5
});

service on asbListener {

    remote function onMessage(asb:Message message,
                              asb:Caller caller) returns error? {
        InvoiceMessage invoice = check message.body.ensureType();
        log:printInfo("Invoice received", invoiceId = invoice.invoiceId);

        check processInvoice(invoice);
        check caller->complete(message);
    }

    remote function onError(asb:MessageRetrievalError err) {
        log:printError("Azure Service Bus error", 'error = err);
    }
}
```

## Salesforce Event Listener

Listen to Salesforce platform events, Change Data Capture (CDC) events, and PushTopic events in real time.

```ballerina
import ballerinax/salesforce;

configurable string sfBaseUrl = ?;
configurable string sfToken = ?;

type OpportunityChangeEvent record {|
    string Id;
    string Name;
    string StageName;
    decimal Amount;
    string CloseDate;
|};

listener salesforce:Listener sfListener = new ({
    baseUrl: sfBaseUrl,
    auth: {token: sfToken}
});

@salesforce:ServiceConfig {
    channelName: "/data/OpportunityChangeEvent"
}
service on sfListener {

    remote function onEvent(OpportunityChangeEvent event) returns error? {
        log:printInfo("Opportunity changed",
                      name = event.Name,
                      stage = event.StageName,
                      amount = event.Amount);
        check syncOpportunityToCRM(event);
    }
}
```

## Twilio Event Handler

React to Twilio webhook events such as incoming SMS, call status changes, and voice events.

```ballerina
import ballerina/http;

type TwilioSmsEvent record {|
    string MessageSid;
    string From;
    string To;
    string Body;
    string NumMedia;
|};

// Twilio sends webhooks as HTTP POST requests
service /twilio on new http:Listener(8090) {

    resource function post sms(TwilioSmsEvent event) returns xml {
        log:printInfo("SMS received", from = event.From, body = event.Body);

        // Process the incoming SMS
        string response = processIncomingSms(event.From, event.Body);

        // Return TwiML response
        return xml `<Response><Message>${response}</Message></Response>`;
    }

    resource function post call\-status(http:Request req) returns http:Ok {
        // Handle call status callback
        log:printInfo("Call status update received");
        return http:OK;
    }
}
```

## GitHub Webhook Handler

React to GitHub repository events such as push, pull request, and issue events.

```ballerina
import ballerina/http;
import ballerina/crypto;

configurable string githubWebhookSecret = ?;

type GitHubPushEvent record {|
    string ref;
    record {|string id; string message; string timestamp;|}[] commits;
    record {|string full_name;|} repository;
|};

service /github on new http:Listener(8090) {

    resource function post webhook(
        @http:Header string x\-hub\-signature\-256,
        @http:Payload byte[] payload
    ) returns http:Ok|http:Unauthorized|error {
        // Verify webhook signature
        byte[] hmac = check crypto:hmacSha256(payload, githubWebhookSecret.toBytes());
        string expectedSig = "sha256=" + hmac.toBase16();
        if x\-hub\-signature\-256 != expectedSig {
            return http:UNAUTHORIZED;
        }

        json jsonPayload = check (check string:fromBytes(payload)).fromJsonString();
        GitHubPushEvent event = check jsonPayload.fromJsonWithType();
        log:printInfo("Push to " + event.repository.full_name,
                      ref = event.ref,
                      commits = event.commits.length());
        check triggerCIPipeline(event);
        return http:OK;
    }
}
```

## Solace Consumer

Consume messages from Solace PubSub+ event broker.

```ballerina
import ballerinax/solace;

configurable string solaceUrl = "tcp://localhost:55555";
configurable string vpnName = "default";

type TradeEvent record {|
    string tradeId;
    string symbol;
    decimal price;
    int quantity;
    string side;
|};

listener solace:Listener solaceListener = new ({
    url: solaceUrl,
    msgVpn: vpnName,
    clientName: "trade-processor",
    auth: {
        username: "admin",
        password: "admin"
    }
});

@solace:ServiceConfig {
    topics: ["trades/>"]
}
service on solaceListener {

    remote function onMessage(solace:Message message) returns error? {
        TradeEvent trade = check message.content.ensureType();
        log:printInfo("Trade event", tradeId = trade.tradeId, symbol = trade.symbol);
        check executeTrade(trade);
    }
}
```

## Change Data Capture (CDC)

Capture database changes in real time using CDC connectors. React to INSERT, UPDATE, and DELETE events from your database without polling.

```ballerina
import ballerinax/mysql.cdc;

configurable string dbHost = "localhost";
configurable int dbPort = 3306;

type CustomerChange record {|
    int id;
    string name;
    string email;
    string operation; // INSERT, UPDATE, DELETE
|};

listener cdc:Listener cdcListener = new ({
    host: dbHost,
    port: dbPort,
    user: "cdc_user",
    password: "cdc_password",
    database: "customers_db",
    serverId: 1001
});

@cdc:ServiceConfig {
    tables: ["customers_db.customers"]
}
service on cdcListener {

    remote function onCreate(cdc:ChangeRecord change) returns error? {
        log:printInfo("Customer created", data = change.data.toString());
        check syncToExternalCRM("CREATE", change.data);
    }

    remote function onUpdate(cdc:ChangeRecord change) returns error? {
        log:printInfo("Customer updated",
                      before = change.dataBefore.toString(),
                      after = change.data.toString());
        check syncToExternalCRM("UPDATE", change.data);
    }

    remote function onDelete(cdc:ChangeRecord change) returns error? {
        log:printInfo("Customer deleted", data = change.dataBefore.toString());
        check syncToExternalCRM("DELETE", change.dataBefore);
    }
}
```

## Common Patterns

### Dead Letter Queue (DLQ)

Route failed messages to a dead letter queue for manual inspection or retry.

```ballerina
function processWithDLQ(kafka:Caller caller, OrderEvent order) returns error? {
    do {
        check processOrder(order);
        check caller->commit();
    } on fail error e {
        log:printError("Processing failed, sending to DLQ", orderId = order.orderId);
        check sendToDLQ(order, e.message());
        check caller->commit(); // Acknowledge so it does not reprocess
    }
}
```

### Acknowledgment Strategies

| Strategy | Guarantee | Use Case |
|---|---|---|
| Auto-acknowledge | At most once | Low-value events, metrics |
| Manual acknowledge | At least once | Business-critical events |
| Transactional | Exactly once | Financial transactions |

## What's Next

- [File Handlers](file-handlers.md) -- Process files from FTP, SFTP, and local directories
- [Error Handling](/docs/develop/design-logic/error-handling) -- Handle failures in event processing
- [Connections](/docs/develop/design-logic/connections) -- Configure broker connections
