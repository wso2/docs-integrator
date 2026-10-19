---
title: AWS SQS
---

# AWS SQS

AWS SQS event integrations poll an Amazon SQS queue and trigger a handler function for every message the queue delivers, with a separate handler for listener-level errors. Use them to process jobs from a queue-based pipeline, decouple producer and consumer services, or react to asynchronous work items without writing your own polling loop.

## Creating an AWS SQS service

```ballerina
import ballerina/log;
import ballerinax/aws;
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string queueUrl = ?;

// Connection details: target AWS region and static credentials.
sqs:ConnectionConfig connectionConfig = {
    region: aws:US_EAST_1,
    auth: {
        accessKeyId,
        secretAccessKey
    }
};

// Polling behavior: how often, and how long, the listener waits for messages.
sqs:PollingConfig pollingConfig = {
    pollInterval: 1,
    waitTime: 20
};

listener sqs:Listener sqsListener = new (connectionConfig, pollingConfig);

// Scopes this service to a single queue and deletes each message
// automatically once its handler returns without an error.
@sqs:ServiceConfig {
    queueUrl,
    autoDelete: true
}
service on sqsListener {

    // Fires once for every message the listener receives from the queue.
    remote function onMessage(sqs:Message message) returns error? {
        log:printInfo("Received message", body = message.body ?: "");
    }

    // Fires when the listener fails while polling or processing a message.
    remote function onError(sqs:Error err) returns error? {
        log:printError("SQS listener error", err);
    }
}
```

## Listener configuration

`sqs:Listener` accepts a `sqs:ConnectionConfig` and an optional `sqs:PollingConfig`:

```ballerina
listener sqs:Listener sqsListener = new (connectionConfig, pollingConfig);
```

**`sqs:ConnectionConfig`**

| Field | Type | Default | Description |
|---|---|---|---|
| `auth` | `aws:AuthConfig` | Required | AWS credential source. Accepts static access key/secret credentials, an AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default credential provider chain |
| `region` | `aws:Region\|string` | Required | AWS region the queue belongs to, for example `aws:US_EAST_1` or `"us-east-1"` |
| `endpoint` | `aws:EndpointConfig?` | — | Custom AWS endpoint configuration, for example a FIPS or dual-stack endpoint |

**`sqs:PollingConfig`**

| Field | Type | Default | Description |
|---|---|---|---|
| `pollInterval` | `decimal` | `1` | Seconds to wait between polling attempts |
| `waitTime` | `int` | `20` | Long-polling wait time, in seconds, for each receive request |
| `visibilityTimeout` | `int` | `30` | Seconds a received message stays invisible to other consumers while its handler runs |

Each service attached to the listener targets a specific queue through the `@sqs:ServiceConfig` annotation:

| Field | Type | Default | Description |
|---|---|---|---|
| `queueUrl` | `string` | Required | URL of the SQS queue this service consumes messages from |
| `config` | `sqs:PollingConfig?` | — | Per-service polling overrides |
| `autoDelete` | `boolean` | `true` | Automatically deletes a message from the queue once `onMessage` returns without an error. Set to `false` to delete messages manually with a `sqs:Caller` |

## Event handling

An AWS SQS service implements two remote functions:

| Function | Triggered when | Parameters |
|---|---|---|
| `onMessage` | A message is received from the queue | `sqs:Message message`, plus an optional `sqs:Caller caller` when manual deletion is needed |
| `onError` | The listener fails while polling the queue or processing a message | `sqs:Error err` |

The `sqs:Message` value passed to `onMessage` carries the message content and metadata:

| Field | Type | Description |
|---|---|---|
| `messageId` | `string?` | Unique identifier assigned to the message |
| `body` | `string?` | Message content |
| `receiptHandle` | `string?` | Token used to delete the message or change its visibility timeout |
| `messageAttributes` | `map<sqs:MessageAttributeValue>?` | Custom attributes sent with the message |
| `messageSystemAttributes` | `sqs:MessageAttributes?` | AWS system attributes, such as sender ID, sent timestamp, and approximate receive count |
| `md5OfBody` | `string?` | MD5 checksum of the message body |
| `md5OfMessageAttributes` | `string?` | MD5 checksum of the message attributes |

When `autoDelete` is set to `false` on the `@sqs:ServiceConfig` annotation, add a `sqs:Caller` parameter to `onMessage` and call `caller->delete()` once processing succeeds, so the message is only removed from the queue after your logic completes:

```ballerina
remote function onMessage(sqs:Message message, sqs:Caller caller) returns error? {
    log:printInfo("Processing message", body = message.body ?: "");
    check caller->delete();
}
```

If `onMessage` returns without deleting the message, the message becomes visible again once `visibilityTimeout` elapses and is redelivered to the listener.

## What's next

- [Kafka](kafka.md) — consume messages from Apache Kafka topics
- [RabbitMQ](rabbitmq.md) — consume messages from RabbitMQ queues
- [Connections](../supportive-artifacts/connections.md) — reuse credentials across services
