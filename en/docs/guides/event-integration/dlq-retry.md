---
title: Dead-Letter Queue and Retry with Azure Service Bus
description: "Handle transient and permanent message failures using dead-letter queues and retry with Azure Service Bus in WSO2 Integrator."
---

# Dead-Letter Queue and Retry with Azure Service Bus

## Problem

A notification service sends messages over SMS, push, and email. Some failures are transient — the provider is temporarily down — and should be retried automatically. Other failures are permanent — the recipient address is invalid — and retrying is pointless. A dead-lettering strategy must distinguish the two: transient failures return to the queue for retry, permanent failures move to a dead-letter queue (DLQ) for investigation, and successfully delivered messages are acknowledged so they are never reprocessed.

## Pattern

![Dead-Letter Queue and Retry pattern diagram](/img/guides/event-integration/dlq-retry.png)

Azure Service Bus supports this distinction natively via PEEK_LOCK receive mode. Instead of auto-acknowledging a message on receipt, the consumer locks it. After processing, the consumer calls one of three settlement methods:

- `complete()` — removes the message from the queue. Use this on successful delivery.
- `abandon()` — releases the lock and increments the delivery count. Azure automatically dead-letters the message when `maxDeliveryCount` is exceeded (default 10, configurable).
- `deadLetter(reason, description)` — immediately moves the message to the DLQ. Use this for permanent failures that will never succeed on retry.

The dead-letter queue is a sub-queue (`{queue}/$deadLetterQueue`) that can be read independently for alerting, investigation, or manual reprocessing.

## Implementation

The HTTP endpoint enqueues a notification as a text message. The sender converts the job to JSON before sending so the consumer can deserialize it.

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;
import ballerina/log;
import ballerinax/asb;

configurable string connectionString = ?;
configurable string queueName = "notifications";

type NotificationJob record {|
    string channel;
    string recipient;
    string message;
|};

final asb:MessageSender notificationSender = check new ({
    connectionString: connectionString,
    entityType: asb:QUEUE,
    topicOrQueueName: queueName
});
// docs-fold-end

service /notifications on new http:Listener(8090) {
    resource function post send(NotificationJob job) returns error? {
        check notificationSender->send({body: job.toJsonString(), contentType: asb:TEXT});
        log:printInfo("Notification queued", channel = job.channel, recipient = job.recipient);
    }
}
```

The listener uses PEEK_LOCK with `autoComplete: false`, giving the consumer explicit control over settlement. The `Caller` parameter provides `complete()`, `abandon()`, and `deadLetter()`.

```ballerina
listener asb:Listener asbListener = new ({
    connectionString: connectionString,
    entityConfig: {queueName: queueName},
    receiveMode: asb:PEEK_LOCK,
    autoComplete: false
});

service asb:Service on asbListener {
    remote function onMessage(asb:Message message, asb:Caller caller) returns error? {
        byte[] raw = check message.body.ensureType();
        string text = check string:fromBytes(raw);
        NotificationJob job = check text.fromJsonStringWithType();
        if job.recipient == "invalid" {
            check caller->deadLetter(
                deadLetterReason = "InvalidRecipient",
                deadLetterErrorDescription = "Recipient address is not deliverable");
            log:printInfo("Message dead-lettered", recipient = job.recipient);
        } else if job.recipient == "down" {
            check caller->abandon();
            log:printInfo("Message abandoned (provider down), will retry", recipient = job.recipient);
        } else {
            log:printInfo("Notification delivered", channel = job.channel, recipient = job.recipient);
            check caller->complete();
        }
    }
}
```

In this sample, `recipient == "invalid"` triggers an immediate dead-letter, and `recipient == "down"` simulates a transient failure that is abandoned and requeued. Azure Service Bus redelivers abandoned messages up to `maxDeliveryCount` times (configured to 5 in the sample queue), then moves them to the DLQ automatically.

## Try it yourself

Try this sample in WSO2 Integration Cloud.

[![Deploy to WSO2 Cloud](https://openindevant.choreoapps.dev/images/DeployDevant-White.svg)](https://console.devant.dev/new?gh=wso2/integration-samples/tree/main/integrator-default-profile/event-integration/dlq_asb)

[View source on GitHub](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/event-integration/dlq_asb)
