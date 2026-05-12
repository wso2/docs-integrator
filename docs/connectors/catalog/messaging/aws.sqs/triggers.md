---
title: Triggers
---

# Triggers

The `ballerinax/aws.sqs` connector supports event-driven message consumption through a built-in polling Listener. The Listener periodically retrieves messages from an SQS queue and dispatches them to your service callbacks, eliminating the need for manual polling loops.

Three components work together:

| Component | Role |
|-----------|------|
| `sqs:Listener` | Polls the SQS queue at a configurable interval and dispatches messages to attached services. |
| `sqs:Service` | Defines `onMessage` and `onError` callbacks invoked when messages arrive or errors occur. |
| `sqs:Caller` | Provides a `delete()` method to manually acknowledge and delete a message within the callback. |
| `sqs:Message` | The message payload passed to the `onMessage` callback. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `aws.sqs:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ConnectionConfig` | AWS connection configuration for authenticating with SQS. |
| `PollingConfig` | Controls how the Listener polls the SQS queue for messages. |

`ConnectionConfig` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `region` | `Region` | Required | AWS region where the SQS queue is located. |
| `auth` | `StaticAuthConfig\|ProfileAuthConfig\|DEFAULT_CREDENTIALS` | Required | Authentication configuration: static credentials, AWS profile, or default credential chain. |

`PollingConfig` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pollInterval` | `decimal` | `1` | Interval in seconds between poll requests. |
| `waitTime` | `int` | `20` | Long poll wait time in seconds (0–20). |
| `visibilityTimeout` | `int` | `30` | Visibility timeout in seconds for received messages. |

### Initializing the listener

**Using static credentials:**

```ballerina
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

listener sqs:Listener sqsListener = new ({
    region: sqs:US_EAST_1,
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});
```

**With custom polling configuration:**

```ballerina
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

listener sqs:Listener sqsListener = new (
    {
        region: sqs:US_EAST_1,
        auth: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        }
    },
    pollingConfig = {
        pollInterval: 5,
        waitTime: 10,
        visibilityTimeout: 60
    }
);
```

---

## Service

An `sqs:Service` is a Ballerina service attached to an `sqs:Listener`. It is annotated with `@sqs:ServiceConfig` to specify the queue URL and optional settings, and implements callback functions for message processing and error handling.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(sqs:Message message, sqs:Caller caller) returns error?` | Invoked for each message received from the queue. |
| `onError` | `remote function onError(sqs:Error err) returns error?` | Invoked when an error occurs during polling or message processing. |

The `sqs:Caller` parameter in `onMessage` is optional. If `autoDelete` is set to `true` (default) in `@sqs:ServiceConfig`, messages are automatically deleted after `onMessage` returns successfully.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string queueUrl = ?;

listener sqs:Listener sqsListener = new ({
    region: sqs:US_EAST_1,
    auth: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    }
});

@sqs:ServiceConfig {
    queueUrl: queueUrl
}
service sqs:Service on sqsListener {

    remote function onMessage(sqs:Message message, sqs:Caller caller) returns error? {
        log:printInfo("Message received",
            messageId = message.messageId,
            body = message.body
        );
        // Manually delete the message after processing
        check caller->delete();
    }

    remote function onError(sqs:Error err) returns error? {
        log:printError("Error occurred while polling", 'error = err);
    }
}
```

You can set `autoDelete: false` in `@sqs:ServiceConfig` to manually control message deletion using `caller->delete()`, which is useful for implementing custom acknowledgment logic.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | `string?` | The unique identifier for the message. |
| `body` | `string?` | The message body content. |
| `receiptHandle` | `string?` | The receipt handle used to delete or change visibility of the message. |
| `md5OfBody` | `string?` | MD5 digest of the message body for integrity verification. |
| `messageAttributes` | `map?` | Custom message attributes as key-value pairs. |
| `md5OfMessageAttributes` | `string?` | MD5 digest of the message attributes. |
| `messageSystemAttributes` | `MessageAttributes?` | System-level attributes (sender ID, timestamp, etc.). |

### `ServiceConfig`

| Field | Type | Description |
|-------|------|-------------|
| `queueUrl` | `string` | The URL of the SQS queue to consume messages from. |
| `config` | `PollingConfig?` | Optional per-service polling configuration that overrides the listener-level config. |
| `autoDelete` | `boolean` | Whether to automatically delete messages after successful processing (default `true`). |
