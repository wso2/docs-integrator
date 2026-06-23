---
title: Kafka
description: Create event-driven integrations that consume messages from Apache Kafka topics using consumer groups, offset management, and typed message handling.
keywords: [wso2 integrator, kafka, event integration, kafka listener, kafka consumer, offset management, consumer group, message processing, dead letter]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Kafka

Kafka event integrations connect WSO2 Integrator to Apache Kafka topics as a consumer. Use them to build real-time data pipelines, route and distribute events across downstream systems, and trigger processing logic whenever messages arrive on a topic. This page covers how to create a Kafka service, configure the service and listener settings, define event handlers for message processing and error recovery, and apply error handling patterns.

## Creating a Kafka service

A Kafka service consists of a listener that connects to the broker and one or more event handlers that process incoming messages. 

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open your integration in WSO2 Integrator IDE. If you don't have an integration yet, see [Create a new integration](../../create-integrations/create-a-new-integration.md) to set one up first.
2. Click **+ Add Artifact** in the canvas or click **+** next to **Entry Points** in the sidebar.
3. In the **Artifacts** panel, select **Kafka** under **Event Integration**.
4. Fill in the creation form fields and select **Create**.

   <ThemedImage
       alt="Kafka service creation form"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-creation-form.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-creation-form.png'),
       }}
   />

   | Field | Description | Example |
   |---|---|---|
   | **Bootstrap Servers** | Comma-separated list of Kafka broker addresses in `host:port` format. The consumer uses these addresses to discover the full cluster topology. | `localhost:9092` |
   | **Topics** | One or more Kafka topic names the service subscribes to. Separate multiple topics with commas. The listener receives messages from all listed topics. | `orders` |
   | **Group ID** | Unique string that identifies the consumer. | `order-processor` |
   | **Listener Name** | Identifier for the Kafka listener created with this service. This name is used to reference the listener in the service declaration and in the configuration panel. | `orderListener` |


   WSO2 Integrator opens the empty service in the **Service Designer**.

   <ThemedImage
       alt="Kafka Service Designer showing the listener pill and Add Handler button"
       sources={{
           light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-kafka-listener-view.png'),
           dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/step-kafka-listener-view.png'),
       }}
   />

</TabItem>
<TabItem value="code" label="Ballerina Code">

`kafka:Service` connects to a Kafka server via a `kafka:Listener` and binds incoming messages directly to a typed record by declaring the expected payload type as the `onConsumerRecord` argument.

```ballerina
import ballerina/log;
import ballerinax/kafka;

type Order readonly & record {
    int orderId;
    string productName;
    decimal price;
    boolean isValid;
};

listener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {
    groupId: "order-group-id",
    topics: "order-topic"
});

service on orderListener {

    remote function onConsumerRecord(Order[] orders) {
        from Order 'order in orders
            where 'order.isValid
            do {
                log:printInfo(string `Received valid order for ${'order.productName}`);
            };
    }
}
```

</TabItem>
</Tabs>

## Listener configuration

The listener manages the connection to the Kafka broker and controls consumer behavior including polling intervals, offset management, concurrency, and security.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **Service Designer**, click the **Configure** icon in the header to open the **Kafka Event Integration Configuration** panel. Then select the listener name under **Attached Listeners** to open its settings.

<ThemedImage
    alt="Kafka Event Integration Configuration panel showing the listener under Attached Listeners"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/service-config-1.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/service-config-1.png'),
    }}
/>

See [Listener configuration fields](#listener-configuration-fields) below for the full list. After making edits, click **Save Changes** to apply them.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Declare a `kafka:Listener` with the broker address and a `kafka:ConsumerConfiguration` record containing only the required fields to get started.

```ballerina
import ballerina/log;
import ballerinax/kafka;

type Order readonly & record {
    int orderId;
    string productName;
    decimal price;
};

listener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {
    groupId: "order-processor",
    topics: "orders"
});

service on orderListener {
    remote function onConsumerRecord(Order[] orders) returns error? {
        from Order 'order in orders
            do {
                log:printInfo(string `Processing order ${'order.orderId}`);
            };
    }
}
```

See [Listener configuration fields](#listener-configuration-fields) below for the full list of `kafka:ConsumerConfiguration` fields.

</TabItem>
</Tabs>

### Listener configuration fields

| Field | Description |
|---|---|
| **Name** | Identifier for this listener, referenced in the service declaration. |
| **Bootstrap Servers** | Comma-separated list of Kafka broker addresses (`host:port`). Used by the consumer to discover the full cluster topology. |
| **Topics** | Optional. Topics to be subscribed by the consumer. |
| **Group Id** | Optional. Unique string that identifies the consumer. |
| **Offset Reset** | Optional. Offset reset strategy when no initial offset exists. `earliest` reads from the beginning. `latest` reads only new messages. `none` throws an error if no offset is found. |
| **Partition Assignment Strategy** | Optional. Strategy class for handling partition assignment among consumers. |
| **Metrics Recording Level** | Optional. Metrics recording level. |
| **Metrics Reporter Classes** | Optional. Metrics reporter classes. |
| **Client ID** | Optional. Identifier used for server-side logging. |
| **Interceptor Classes** | Optional. Interceptor classes applied before sending records. |
| **Isolation Level** | Optional. Transactional message reading method. `read_committed` returns only committed messages. `read_uncommitted` returns all messages including those from open transactions. |
| **Schema Registry URL** | Optional. Avro schema registry URL. Required when using the Avro serializer. |
| **Schema Registry Config** | Optional. Configurations to initialize a schema registry. |
| **Key Deserializer Type** | Deserialization type for the message key. Defaults to `DES_BYTE_ARRAY`. |
| **Value Deserializer Type** | Deserialization type for the message value. Defaults to `DES_BYTE_ARRAY`. |
| **Additional Properties** | Optional. Additional properties for fields not provided by the Ballerina `kafka` module. Use with caution as this can override other fields. |
| **Session Timeout** | Optional. Timeout in seconds to detect consumer failures when the heartbeat threshold is reached. |
| **Heartbeat Interval** | Optional. Expected time in seconds between heartbeats. |
| **Metadata Max Age** | Optional. Maximum time in seconds to force a refresh of metadata. |
| **Auto Commit Interval** | Optional. Auto-committing interval in seconds. Applies when **Auto Commit** is enabled. |
| **Max Partition Fetch Bytes** | Optional. Maximum amount of data the server returns per partition. |
| **Send Buffer** | Optional. Size of the TCP send buffer (`SO_SNDBUF`). |
| **Receive Buffer** | Optional. Size of the TCP receive buffer (`SO_RCVBUF`). |
| **Fetch Min Bytes** | Optional. Minimum amount of data the server should return for a fetch request. |
| **Fetch Max Bytes** | Optional. Maximum amount of data the server should return for a fetch request. |
| **Fetch Max Wait Time** | Optional. Maximum time in seconds the server will block before answering the fetch request. |
| **Reconnect Backoff Time Max** | Optional. Maximum time in seconds to wait when reconnecting. |
| **Retry Backoff** | Optional. Time in seconds to wait before retrying a failed request. |
| **Metrics Sample Window** | Optional. Window of time in seconds a metrics sample is computed over. |
| **Metrics Num Samples** | Optional. Number of samples maintained to compute metrics. |
| **Request Timeout** | Optional. Wait time in seconds for a response to a request. |
| **Connection Max Idle Time** | Optional. Closes idle connections after this number of seconds. |
| **Max Poll Records** | Optional. Maximum number of records returned in a single call to poll. |
| **Max Poll Interval** | Optional. Maximum delay in seconds between invocations of poll. |
| **Reconnect Backoff Time** | Optional. Time in seconds to wait before attempting to reconnect. |
| **Polling Timeout** | Optional. Timeout interval for polling in seconds. |
| **Polling Interval** | Optional. Polling interval for the consumer in seconds. |
| **Concurrent Consumers** | Optional. Number of concurrent consumers. |
| **Default API Timeout** | Optional. Default API timeout in seconds for APIs with duration. |
| **Auto Commit** | Enables auto-committing offsets. Defaults to `true`. |
| **Check CRCs** | Checks the CRC32 of consumed records to detect on-wire or on-disk corruption. Defaults to `true`. |
| **Exclude Internal Topics** | Whether records from internal topics are exposed to the consumer. Defaults to `true`. |
| **Decouple Processing** | Decouples processing from polling. Defaults to `false`. |
| **Validation** | Enables constraint validation on incoming records. Defaults to `true`. |
| **Auto Seek On Validation Failure** | Automatically seeks past erroneous records on data-binding or validation failure. Defaults to `true`. |
| **Secure Socket** | Optional. SSL/TLS encryption configuration. |
| **Auth** | Optional. Authentication-related configurations for the Kafka consumer. |
| **Security Protocol** | Type of security protocol used for the broker connection. Defaults to `PROTOCOL_PLAINTEXT`. |

## Event handlers

Kafka event trigger supports two remote methods.

| Handler | Triggered when |
|---|---|
| `onConsumerRecord` | New messages arrive from the subscribed topics |
| `onError` | The listener triggers an error before `onConsumerRecord` is invoked |

To add a handler in the **Service Designer**, click **+ Add Handler** and select the handler type in the **Select Handler to Add** panel. WSO2 Integrator opens the **Flow Designer** for that handler.

### onConsumerRecord

`onConsumerRecord` is the primary event handler for message processing. When a `kafka:Service` is attached to a `kafka:Listener`, the listener uses the built-in bytes deserializer to bind incoming Kafka messages directly to the declared payload type. This handler is invoked once per poll cycle with the full batch of records retrieved from Kafka.

If the incoming payload cannot be deserialized into the declared type, a `kafka:PayloadBindingError` is logged to the console and the listener automatically seeks past the erroneous record to fetch the next one. To disable this automatic seek behavior and route payload errors to the `onError` handler instead, set `autoSeekOnValidationFailure: false` on the listener. Errors returned from `onConsumerRecord` are logged to the console and the next polling cycle continues.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Select **onConsumerRecord** in the **Select Handler to Add** panel and click **Save**. The **Flow Designer** opens showing the handler with the Kafka record batch as its input.

<ThemedImage
    alt="Message Handler Configuration panel showing the Define Value button and Caller checkbox"
    sources={{
        light: useBaseUrl('/img/develop/integration-artifacts/event/kafka/handler-config.png'),
        dark: useBaseUrl('/img/develop/integration-artifacts/event/kafka/handler-config.png'),
    }}
/>

To configure how incoming messages are bound, click **+ Define Value** next to the **Message Configuration** field. Paste a sample JSON to let WSO2 Integrator infer the message shape, or select the JSON type to work with a generic JSON value. The handler receives an array of records. Access the `value` field of each element to read the Kafka message content.

If you skip **+ Define Value**, the handler receives a raw `kafka:AnydataConsumerRecord[]` array where the `value` field is `anydata`, requiring a manual type cast to access the message content.

Under **Advanced Parameters**, enable **Caller** to include the `kafka:Caller` parameter in the handler signature. This is required when **Auto Commit** is disabled on the listener and you need to commit offsets manually.

Use the flow canvas to add processing steps such as database writes, HTTP calls, data transformations, and conditional logic. To process each message individually, add a [**Foreach**](../../understand-ide/editors/flow-diagram-editor/control.md#foreach) node to iterate over the record batch.

| Parameter | Description |
|---|---|
| **records** | Batch of messages polled in this cycle. |
| **caller** | Optional. Enables manual offset commits. Enable **Caller** under **Advanced Parameters** when **Auto Commit** is disabled on the listener, then use a **Commit** action after processing to acknowledge the batch. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

**Typed payload binding**

Declare the expected message type directly as the `onConsumerRecord` parameter. The listener uses the built-in bytes deserializer to bind each incoming Kafka message to that type. You receive a typed array and access fields directly without any `.value` wrapper. If the payload does not match the declared type, a `kafka:PayloadBindingError` is logged and the listener seeks past that record to fetch the next one:

```ballerina
import ballerina/log;
import ballerinax/kafka;

type Order readonly & record {
    int orderId;
    string productName;
    decimal price;
    boolean isValid;
};

listener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {
    groupId: "order-processor",
    topics: "orders"
});

service on orderListener {

    remote function onConsumerRecord(Order[] orders) returns error? {
        from Order 'order in orders
            where 'order.isValid
            do {
                log:printInfo(string `Received valid order for ${'order.productName}`);
            };
    }
}
```

**Accessing record metadata**

Use `kafka:AnydataConsumerRecord[]` when you need Kafka record metadata alongside the message content. Each element exposes the message via its `value` field (as `anydata`), which you cast to the expected type, along with `offset`, `timestamp`, and `headers`. Include `kafka:Caller` when **Auto Commit** is disabled on the listener to commit offsets manually:

```ballerina
import ballerina/log;
import ballerinax/kafka;

type OrderEvent record {|
    string orderId;
    string customerId;
    decimal amount;
|};

listener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {
    groupId: "order-processor",
    topics: "orders",
    autoCommit: false
});

service on orderListener {

    remote function onConsumerRecord(kafka:AnydataConsumerRecord[] records,
                                     kafka:Caller caller) returns error? {
        foreach kafka:AnydataConsumerRecord record in records {
            byte[] rawBytes = check record.value.ensureType();
            string jsonStr = check string:fromBytes(rawBytes);
            OrderEvent order = check jsonStr.fromJsonStringWithType();
            log:printInfo("Processed order",
                          orderId = order.orderId,
                          partition = record.offset.partition.partition,
                          offset = record.offset.offset);
        }
        check caller->commit();
    }
}
```

</TabItem>
</Tabs>

The type generated by WSO2 Integrator extends `kafka:AnydataConsumerRecord` and contains the following fields:

| Field | Type | Description |
|---|---|---|
| `key` | `anydata` | Optional. Key included with the record. |
| `value` | `json` | The Kafka message content. Access this field on each array element to read the message. |
| `timestamp` | `int` | Timestamp of the record in milliseconds since epoch. |
| `offset` | `kafka:PartitionOffset` | Topic partition position where the record is stored. |
| `headers` | `map<byte[]\|byte[][]\|string\|string[]>` | Map of headers included with the record. |

### onError

`onError` is invoked when the `kafka:Listener` triggers an error before `onConsumerRecord` is called. These errors include `kafka:PayloadBindingError` when the incoming payload cannot be deserialized into the declared type, and `kafka:PayloadValidationError` when constraint validation fails.

By default, both error types are logged to the console and the listener automatically seeks past the erroneous record to fetch the next one. Set `autoSeekOnValidationFailure: false` on the listener to disable this and route these errors to `onError` instead, where you can handle them as needed. If `onError` is not defined in the service, these errors are logged to the console with the full stack trace.

Errors returned from `onConsumerRecord` are also logged to the console. The next polling cycle continues regardless.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Select **onError** in the **Select Handler to Add** panel and click **Save**. The **Flow Designer** opens with the handler signature.

To receive payload binding or validation errors in this handler instead of having them auto-logged, open the listener's **Configuration** panel and set **Auto Seek On Validation Failure** to disabled. With this setting off, the listener stops advancing past erroneous records automatically and passes the error to `onError` for manual handling. If `onError` is not added to the service, these errors are logged to the console with the full stack trace.

Use the flow canvas to add a conditional branch on the error type, log the failure, seek past the erroneous record using a Kafka **Caller** action, or forward the raw record to a dead letter topic.

<!-- TODO: Add screenshot of onError Flow Designer canvas -->

| Parameter | Description |
|---|---|
| **kafkaError** | Error raised by the listener. Cast to `kafka:PayloadBindingError` or `kafka:PayloadValidationError` to access the erroneous record's partition and offset via the error detail. |
| **caller** | Optional. Enables manual offset management. Use a **Seek** action with the partition and offset from the error detail to advance past the failed record. |

</TabItem>
<TabItem value="code" label="Ballerina Code">

Set `autoSeekOnValidationFailure: false` on the listener to route `kafka:PayloadBindingError` and `kafka:PayloadValidationError` to `onError`. Check the error type and use `kafka:Caller` to seek past the erroneous record using the partition offset provided in the error detail:

```ballerina
import ballerina/log;
import ballerinax/kafka;

type Order readonly & record {
    int orderId;
    string productName;
    decimal price;
    boolean isValid;
    int quantity;
};

listener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {
    groupId: "order-group-id",
    topics: "order-topic",
    autoSeekOnValidationFailure: false
});

service on orderListener {

    remote function onConsumerRecord(Order[] orders) {
        from Order 'order in orders
            where 'order.isValid
            do {
                log:printInfo(string `Received valid order for ${'order.productName}`);
            };
    }

    remote function onError(kafka:Error 'error, kafka:Caller caller) returns error? {
        if 'error is kafka:PayloadBindingError || 'error is kafka:PayloadValidationError {
            log:printError("Payload error", 'error);
            // offset + 1 advances past the erroneous record to the next one
            check caller->seek({
                partition: 'error.detail().partition,
                offset: 'error.detail().offset + 1
            });
        } else {
            log:printError("Listener error", 'error);
        }
    }
}
```

</TabItem>
</Tabs>


## What's next

- [Kafka connector overview](../../../connectors/catalog/messaging/kafka/connector-overview.md) — produce messages and manage topics using the Kafka producer client
- [Kafka trigger reference](../../../connectors/catalog/messaging/kafka/triggers.md) — full listener and service callback API reference
- [Kafka connector example](../../../connectors/catalog/messaging/kafka/example.md) — end-to-end example combining a Kafka consumer and producer
- [Data mapper](../../integration-artifacts/supporting/data-mapper/data-mapper.md) — transform Kafka message payloads between formats using the visual data mapper
- [Connections](../supporting/connections.md) — store Kafka credentials as reusable named connections
- [RabbitMQ](rabbitmq.md) — consume messages from RabbitMQ queues as an alternative messaging system
