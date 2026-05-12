---
title: Triggers
---

# Triggers

The `ballerinax/asb` connector supports event-driven integration through the `asb:Listener`. When messages arrive on Azure Service Bus queues or topic subscriptions, the listener receives them and dispatches to your service callbacks automatically. You can settle messages using the `asb:Caller` provided to the `onMessage` callback.

Three components work together:

| Component | Role |
|-----------|------|
| `asb:Listener` | Connects to Azure Service Bus and continuously receives messages from a queue or subscription, dispatching them to service callbacks. |
| `asb:Service` | Defines the `onMessage` and `onError` callbacks invoked when messages are received or retrieval errors occur. |
| `asb:Caller` | Provided in the `onMessage` callback for settling messages (complete, abandon, dead-letter, defer). |
| `asb:Message` | The message payload passed to the `onMessage` callback. |
| `asb:MessageRetrievalError` | The error record passed to the `onError` callback when message retrieval fails. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `asb:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the ASB Listener. Extends `ASBServiceReceiverConfig` with additional listener-specific settings. |

`ListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionString` | `string` | Required | The Azure Service Bus connection string. |
| `entityConfig` | `QueueConfig\|TopicSubsConfig` | Required | Entity configuration: either `{queueName: "..."}` for queues or `{topicName: "...", subscriptionName: "..."}` for topic subscriptions. |
| `receiveMode` | `PEEK_LOCK\|RECEIVE_AND_DELETE` | `PEEK_LOCK` | The receive mode. `PEEK_LOCK` requires explicit settlement; `RECEIVE_AND_DELETE` auto-removes on receive. |
| `maxAutoLockRenewDuration` | `int` | `300` | Maximum duration (in seconds) to automatically renew the message lock. |
| `amqpRetryOptions` | `AmqpRetryOptions` | `()` | Retry options for AMQP operations. |
| `autoComplete` | `boolean` | `true` | Whether to automatically complete messages after the `onMessage` callback returns successfully. Set to `false` to use manual settlement via the `Caller`. |
| `prefetchCount` | `int` | `0` | Number of messages to prefetch from the broker. `0` disables prefetching. |
| `maxConcurrency` | `int` | `1` | Maximum number of concurrent message processing threads. |

### Initializing the listener

**Listening on a queue:**

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

listener asb:Listener asbListener = new ({
    connectionString: connectionString,
    entityConfig: {
        queueName: "my-queue"
    },
    receiveMode: asb:PEEK_LOCK,
    autoComplete: false
});
```

**Listening on a topic subscription:**

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

listener asb:Listener asbListener = new ({
    connectionString: connectionString,
    entityConfig: {
        topicName: "my-topic",
        subscriptionName: "my-subscription"
    },
    receiveMode: asb:PEEK_LOCK,
    autoComplete: true,
    maxConcurrency: 5
});
```

---

## Service

An `asb:Service` is a Ballerina service attached to an `asb:Listener`. It implements callbacks for processing messages and handling retrieval errors from Azure Service Bus.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(asb:Message message) returns error?` or `remote function onMessage(asb:Message message, asb:Caller caller) returns error?` | Invoked when a message is received. Include `asb:Caller` only when using `autoComplete: false` for manual settlement. When `autoComplete: true` (default), omit `caller`: messages are completed automatically. |
| `onError` | `remote function onError(asb:MessageRetrievalError 'error) returns error?` | Invoked when an error occurs during message retrieval. Optional: if not implemented, retrieval errors are logged but not surfaced to your code. |

When `autoComplete` is `true` (the default), messages are automatically completed after `onMessage` returns successfully. Set it to `false` for manual settlement.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/asb;

configurable string connectionString = ?;

listener asb:Listener asbListener = new ({
    connectionString: connectionString,
    entityConfig: {
        queueName: "my-queue"
    },
    receiveMode: asb:PEEK_LOCK,
    autoComplete: false
});

service asb:Service on asbListener {
    remote function onMessage(asb:Message message, asb:Caller caller) returns error? {
        // Process the message
        log:printInfo("Received message",
            messageId = message.messageId,
            body = message.body.toString()
        );

        // Settle the message manually
        check caller->complete();
    }

    remote function onError(asb:MessageRetrievalError 'error) returns error? {
        log:printError("Error receiving message", 'error);
    }
}
```

The `onError` callback is optional. If not implemented, retrieval errors are logged but not handled by your code.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `body` | `anydata` | The message body content. |
| `contentType` | `string?` | The MIME content type of the message body. Use the connector constants `asb:TEXT` (`"text/plain"`), `asb:JSON` (`"application/json"`), `asb:XML` (`"application/xml"`), or `asb:BYTE_ARRAY` (`"application/octet-stream"`). |
| `messageId` | `string?` | A unique identifier for the message. |
| `to` | `string?` | The destination address of the message. |
| `replyTo` | `string?` | The address to reply to. |
| `replyToSessionId` | `string?` | The session ID to reply to. |
| `label` | `string?` | An application-specific label for the message. |
| `sessionId` | `string?` | The session identifier for session-aware entities. |
| `correlationId` | `string?` | A correlation identifier for request-reply patterns. |
| `partitionKey` | `string?` | The partition key for partitioned entities. |
| `timeToLive` | `int?` | The message time-to-live in seconds. |
| `sequenceNumber` | `int?` | The unique sequence number assigned by Service Bus. |
| `lockToken` | `string?` | The lock token for the message (used in `PEEK_LOCK` mode). |
| `applicationProperties` | `ApplicationProperties?` | Custom application properties attached to the message. Access values via `message.applicationProperties?.properties`. |
| `deliveryCount` | `int?` | The number of times delivery has been attempted. |
| `enqueuedTime` | `string?` | The UTC time when the message was enqueued. |
| `enqueuedSequenceNumber` | `int?` | The enqueued sequence number. |
| `deadLetterSource` | `string?` | The name of the entity where the message was dead-lettered. |
| `state` | `string?` | The state of the message (`Active`, `Deferred`, `Scheduled`). |

### `Caller`

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `complete` | `-` | `error?` | Completes the message, removing it from the queue. |
| `abandon` | `*propertiesToModify`: optional rest-record of `anydata` key-value pairs to set on the message before releasing the lock | `error?` | Abandons the message, releasing its lock for redelivery. |
| `deadLetter` | `*DeadLetterOptions`: optional `deadLetterReason: string`, `deadLetterErrorDescription: string`, `propertiesToModify: map<anydata>` | `error?` | Moves the message to the dead-letter sub-queue. |
| `defer` | `*propertiesToModify`: optional rest-record of `anydata` key-value pairs | `error?` | Defers the message. Unlike `MessageReceiver.defer()`, this does not return the sequence number: read `message.sequenceNumber` before calling if you need it. Retrieve the deferred message via `receiver->receiveDeferred(sequenceNumber)`. |

### `MessageRetrievalError`

`asb:MessageRetrievalError` is a `distinct Error` carrying an `ErrorContext` detail record. Access the detail via `err.detail()`.

| Field | Type | Description |
|-------|------|-------------|
| `entityPath` | `string` | The entity path (queue or subscription) where the error occurred. |
| `className` | `string` | The name of the class that originated the error. |
| `namespace` | `string` | The Service Bus namespace associated with the error. |
| `errorSource` | `string` | The function or action that was the source of the error. |
| `reason` | `string` | A description of the reason for the error. |

```ballerina
remote function onError(asb:MessageRetrievalError err) returns error? {
    asb:ErrorContext detail = err.detail();
    log:printError("Message retrieval failed",
        entityPath = detail.entityPath,
        reason = detail.reason
    );
}
```

## What's next

- [Action Reference](actions.md); use `MessageReceiver` for polling-based message consumption
- [Setup Guide](setup-guide.md): obtain the connection string required for the listener
- [Example](example.md): complete worked example for event-driven trigger setup
