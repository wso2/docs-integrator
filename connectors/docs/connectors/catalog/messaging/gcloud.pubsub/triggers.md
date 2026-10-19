---
title: Triggers
---

# Triggers

The `ballerinax/gcloud.pubsub` connector supports event-driven message consumption through a streaming pull mechanism. When messages arrive on a Google Cloud Pub/Sub subscription, the listener receives them in real time and invokes your service's `onMessage` callback automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `pubsub:Listener` | Connects to Google Cloud Pub/Sub and opens streaming pull connections to receive messages from subscriptions. |
| `pubsub:Service` | Defines the `onMessage` callback invoked for each received message. |
| `pubsub:Caller` | Provided to the callback to acknowledge (`ack`) or reject (`nack`) the received message. |
| `pubsub:Message` | The message payload passed to the `onMessage` callback, containing data, attributes, and metadata. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `gcloud.pubsub:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the Pub/Sub listener. Authenticates using a GCP service account key file. |

`ListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `GcpCredentialConfig` | `()` | GCP service account credentials. Contains a `path` field pointing to the JSON key file. |

### Initializing the listener

**Initialize with service account credentials:**

```ballerina
import ballerinax/gcloud.pubsub;

configurable string project = ?;
configurable string gcpCredentialsFilePath = ?;

listener pubsub:Listener pubsubListener = check new (project,
    auth = {path: gcpCredentialsFilePath}
);
```

---

## Service

A `pubsub:Service` is a Ballerina service attached to a `pubsub:Listener`. It is annotated with `@pubsub:ServiceConfig` to bind it to a specific subscription, and implements the `onMessage` callback to process incoming messages.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | `remote function onMessage(pubsub:Message message, pubsub:Caller caller) returns error?` | Invoked when a message is received from the subscription. Use the `Caller` to acknowledge or reject the message. |

Use `caller->ack()` to acknowledge successful processing, or `caller->nack()` to reject the message and request re-delivery.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/gcloud.pubsub;

configurable string project = ?;
configurable string gcpCredentialsFilePath = ?;
configurable string subscription = ?;

listener pubsub:Listener pubsubListener = check new (project,
    auth = {path: gcpCredentialsFilePath}
);

@pubsub:ServiceConfig {subscription}
service on pubsubListener {
    remote function onMessage(pubsub:Message message, pubsub:Caller caller) returns error? {
        log:printInfo("Received message",
            messageId = message.messageId,
            data = message.data.toString(),
            attributes = message.attributes.toString()
        );
        // Acknowledge the message on successful processing
        check caller->ack();
    }
}
```

The `@pubsub:ServiceConfig` annotation supports additional fields for fine-tuning subscriber behavior: `maxAckExtensionPeriod`, `maxDurationPerAckExtension`, `minDurationPerAckExtension`, `parallelPullCount`, and `flowControlSettings`.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | `string?` | The unique ID assigned by Pub/Sub when the message is published. |
| `data` | `anydata` | The message payload. |
| `attributes` | `map<string>?` | Optional key-value attributes attached to the message. |
| `publishTime` | `time:Utc?` | The timestamp when the message was published by the server. |
| `orderingKey` | `string?` | The ordering key for message ordering, if set by the publisher. |

### `ServiceConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `subscription` | `string` | The name of the Pub/Sub subscription to pull messages from. |
| `maxAckExtensionPeriod` | `decimal` | Maximum total time (seconds) the ack deadline can be extended. Default: `3600`. |
| `maxDurationPerAckExtension` | `decimal` | Upper bound (seconds) for a single ack deadline extension. Default: `600`. |
| `minDurationPerAckExtension` | `decimal` | Minimum duration (seconds) for a single ack deadline extension. Default: `0.0`. |
| `parallelPullCount` | `int` | Number of parallel streaming pull connections. Default: `1`. |
| `flowControlSettings` | `FlowControlConfig?` | Flow control settings to limit outstanding messages and bytes. |

### `FlowControlConfig`

| Field | Type | Description |
|-------|------|-------------|
| `maxOutstandingMessageCount` | `int` | Maximum number of outstanding (unacknowledged) messages. Default: `1000`. |
| `maxOutstandingRequestBytes` | `int` | Maximum total bytes of outstanding messages. Default: `104857600` (100 MB). |

### `GcpCredentialConfig`

| Field | Type | Description |
|-------|------|-------------|
| `path` | `string` | File path to the GCP service account JSON key file. |
