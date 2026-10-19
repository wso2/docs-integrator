---
title: Triggers
---

# Triggers

The AWS SQS connector provides an event-driven integration model that automatically polls an SQS queue and invokes service callbacks as messages arrive. This removes the need to manually manage polling loops in your application code.

Three components work together:

| Component | Role |
|-----------|------|
| `aws.sqs:Listener` | Establishes the AWS SQS connection, manages polling, and dispatches messages to attached services |
| `aws.sqs:Service` | Defines the callback methods (`onMessage`, `onError`) that handle incoming messages and errors |
| `aws.sqs:Caller` | Provides explicit control over message deletion from the queue when `autoDelete` is set to `false` |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `aws.sqs:Listener` establishes the connection to AWS SQS and manages the polling lifecycle for all attached services.

### Configuration

| Config Type | Description |
|-------------|-------------|
| `ConnectionConfig` | AWS connection settings (authentication, region, optional endpoint override) |
| `PollingConfig` | Default polling behavior applied to all attached services unless overridden per service |

**`ConnectionConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>auth:AuthConfig</code> | Required | Authentication configuration: static credentials, AWS profile, STS assume-role, web identity (OIDC), IAM Identity Center (SSO), an external credential process, or the default credential provider chain |
| `region` | <code>aws:Region&#124;string</code> | Required | AWS region where the SQS queues are hosted (e.g., `aws:US_EAST_1` or `"us-east-1"`) |
| `endpoint` | <code>aws:EndpointConfig</code> | <code>()</code> | Optional endpoint override for FIPS/dualstack variants or custom endpoints such as LocalStack |

**`PollingConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pollInterval` | <code>decimal</code> | <code>1</code> | Interval in seconds between polling attempts. Set to `0` for back-to-back polling (use with caution — may cause high CPU usage) |
| `waitTime` | <code>int</code> | <code>20</code> | Duration in seconds for which each poll waits for messages (SQS long polling) |
| `visibilityTimeout` | <code>int</code> | <code>30</code> | Duration in seconds for which received messages remain invisible to other consumers |

### Initializing the listener

**Basic listener with static credentials:**

```ballerina
import ballerinax/aws;
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;

sqs:ConnectionConfig connectionConfig = {
    region: aws:US_EAST_1,
    auth: {
        accessKeyId,
        secretAccessKey
    }
};

sqs:PollingConfig pollingConfig = {
    pollInterval: 1.0,
    waitTime: 20
};

listener sqs:Listener sqsListener = new (connectionConfig, pollingConfig);
```

---

## Service

The `aws.sqs:Service` is attached to a listener and defines the callbacks invoked as messages are polled from an SQS queue. Each service instance is associated with a single queue via the `@sqs:ServiceConfig` annotation.

### Service annotation

Use the `@sqs:ServiceConfig` annotation to configure which queue the service listens to and how messages are handled.

**`ServiceConfigType` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `queueUrl` | <code>string</code> | Required | URL of the SQS queue to consume messages from |
| `config` | <code>PollingConfig</code> | <code>()</code> | Optional per-service polling behavior that overrides the listener-level `PollingConfig` |
| `autoDelete` | <code>boolean</code> | <code>true</code> | When `true`, messages are automatically deleted from the queue after `onMessage` returns without error. Set to `false` to control deletion manually using `sqs:Caller` |

### Callbacks

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(sqs:Message message) returns error?` | Required. Invoked for each message polled from the queue. When `autoDelete = false`, a `sqs:Caller` can be added as the first parameter for explicit deletion control |
| `onError` | `remote function onError(sqs:Error err) returns error?` | Optional. Invoked when a polling error occurs |

`sqs:Caller` cannot be combined with `autoDelete: true`. Use `autoDelete: false` to enable manual deletion via `caller->delete()`.

### Full example — auto-delete mode

Messages are deleted automatically after `onMessage` completes successfully.

```ballerina
import ballerina/log;
import ballerinax/aws;
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string queueUrl = ?;

sqs:ConnectionConfig connectionConfig = {
    region: aws:US_EAST_1,
    auth: {
        accessKeyId,
        secretAccessKey
    }
};

sqs:PollingConfig pollingConfig = {
    pollInterval: 1.0,
    waitTime: 20
};

listener sqs:Listener sqsListener = new (connectionConfig, pollingConfig);

@sqs:ServiceConfig {
    queueUrl: queueUrl,
    autoDelete: true
}
service on sqsListener {
    remote function onMessage(sqs:Message message) returns error? {
        log:printInfo("Received message: ", body = message.body.toString());
    }

    remote function onError(sqs:Error err) returns error? {
        log:printError("Listener error", err);
    }
}
```

### Full example — manual-delete mode

When `autoDelete` is `false`, use `sqs:Caller` to delete the message only after processing succeeds.

```ballerina
import ballerina/log;
import ballerinax/aws;
import ballerinax/aws.sqs;

configurable string accessKeyId = ?;
configurable string secretAccessKey = ?;
configurable string queueUrl = ?;

sqs:ConnectionConfig connectionConfig = {
    region: aws:US_EAST_1,
    auth: {
        accessKeyId,
        secretAccessKey
    }
};

listener sqs:Listener sqsListener = new (connectionConfig);

@sqs:ServiceConfig {
    queueUrl: queueUrl,
    autoDelete: false
}
service on sqsListener {
    remote function onMessage(sqs:Caller caller, sqs:Message message) returns error? {
        log:printInfo("Processing message: ", body = message.body.toString());
        // Process the message, then explicitly delete it
        check caller->delete();
    }

    remote function onError(sqs:Error err) returns error? {
        log:printError("Listener error", err);
    }
}
```

---

## Supporting Types

### Message

Represents a message received from an SQS queue.

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | <code>string</code> | Unique ID assigned to the message |
| `body` | <code>string</code> | Content of the message |
| `receiptHandle` | <code>string</code> | Token required to delete or change visibility of the message |
| `md5OfBody` | <code>string</code> | MD5 digest of the non-URL-encoded message body |
| `md5OfMessageAttributes` | <code>string</code> | MD5 digest of the non-URL-encoded message attribute string |
| `messageAttributes` | <code>map\<MessageAttributeValue\></code> | User-defined attributes attached to the message |
| `messageSystemAttributes` | <code>MessageAttributes</code> | System-defined attributes such as sender ID, timestamps, and FIFO metadata |
