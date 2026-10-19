---
title: Actions
---

# Actions

The `ballerinax/asb` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Message Sender`](#message-sender) | Send individual, batch, and scheduled messages to Azure Service Bus queues and topics. |
| [`Message Receiver`](#message-receiver) | Receive messages from queues and subscriptions, settle messages, and manage locks. |
| [`Administrator`](#administrator) | Manage Azure Service Bus entities: create, get, update, delete, and list queues, topics, subscriptions, and rules. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Message sender

Send individual, batch, and scheduled messages to Azure Service Bus queues and topics.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionString` | `string` | Required | The Azure Service Bus connection string. |
| `entityType` | `QUEUE|TOPIC` | Required | The type of entity to send to: `QUEUE` or `TOPIC`. |
| `topicOrQueueName` | `string` | Required | The name of the queue or topic. |
| `amqpRetryOptions` | `AmqpRetryOptions` | `()` | Retry options for AMQP operations (maxRetries, delay, maxDelay, tryTimeout, retryMode). |

### Initializing the client

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

asb:MessageSender sender = check new ({
    connectionString: connectionString,
    entityType: asb:QUEUE,
    topicOrQueueName: "my-queue"
});
```

### Operations

#### Send messages

<details>
<summary>send</summary>

Sends a single message to the configured queue or topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message to send, including `body`, optional `contentType`, `messageId`, `sessionId`, `timeToLive`, and application properties. |

Returns: `error?`

Sample code:

```ballerina
check sender->send({
    body: "Hello from Ballerina",
    contentType: asb:TEXT,
    applicationProperties: {"source": "ballerina"}
});
```

</details>

<details>
<summary>sendPayload</summary>

Sends a message with just the payload content to the configured queue or topic. The payload is stored in the message as a byte stream.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `anydata` | Yes | The payload to send as the message body. |

Returns: `error?`

Sample code:

```ballerina
check sender->sendPayload("Order processed successfully");
```

</details>

<details>
<summary>sendBatch</summary>

Sends a batch of messages to the configured queue or topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageBatch` | `asb:MessageBatch` | Yes | A batch of messages to send, containing an array of `asb:Message` records. |

Returns: `error?`

Sample code:

```ballerina
check sender->sendBatch({
    messages: [
        {body: "Message 1", contentType: asb:TEXT},
        {body: "Message 2", contentType: asb:TEXT}
    ]
});
```

</details>

#### Scheduling

<details>
<summary>schedule</summary>

Schedules a message for future delivery at the specified time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message to schedule. |
| `scheduledEnqueueTime` | `time:Civil` | Yes | The UTC time at which the message should become available. |

Returns: `int|error`

Sample code:

```ballerina
int sequenceNumber = check sender->schedule(
    {body: "Scheduled message", contentType: asb:TEXT},
    {year: 2026, month: 3, day: 13, hour: 10, minute: 0}
);
```

</details>

<details>
<summary>cancel</summary>

Cancels a previously scheduled message using its sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNumber` | `int` | Yes | The sequence number returned by the `schedule` operation. |

Returns: `error?`

Sample code:

```ballerina
check sender->cancel(sequenceNumber);
```

</details>

#### Connection

<details>
<summary>close</summary>

Closes the sender connection and releases resources.

No parameters.

Returns: `error?`

Sample code:

```ballerina
check sender->close();
```

</details>

---

## Message receiver

Receive messages from queues and subscriptions, settle messages, and manage locks.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionString` | `string` | Required | The Azure Service Bus connection string. |
| `entityConfig` | `QueueConfig\|TopicSubsConfig` | Required | Entity configuration: either `{queueName: "..."}` for queues or `{topicName: "...", subscriptionName: "..."}` for topic subscriptions. |
| `receiveMode` | `PEEK_LOCK|RECEIVE_AND_DELETE` | `PEEK_LOCK` | The receive mode. `PEEK_LOCK` requires explicit settlement; `RECEIVE_AND_DELETE` auto-removes on receive. |
| `maxAutoLockRenewDuration` | `int` | `300` | Maximum duration (in seconds) to automatically renew the message lock. |
| `amqpRetryOptions` | `AmqpRetryOptions` | `()` | Retry options for AMQP operations. |

### Initializing the client

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

asb:MessageReceiver receiver = check new ({
    connectionString: connectionString,
    entityConfig: {
        queueName: "my-queue"
    },
    receiveMode: asb:PEEK_LOCK
});
```

### Operations

#### Receive messages

<details>
<summary>receive</summary>

Receives a single message from the queue or subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serverWaitTime` | `int?` | No | Maximum wait time in seconds for a message to arrive. Defaults to `60`. |
| `deadLettered` | `boolean` | No | When `true`, receives from the dead-letter sub-queue instead of the main queue or subscription. Defaults to `false`. |

Returns: `asb:Message|error?`

Returns `()` if no message arrives within `serverWaitTime`. Always assign to a nilable type.

Sample code:

```ballerina
asb:Message? message = check receiver->receive(serverWaitTime = 60);
if message is () {
    // No message available
    return;
}
```

</details>

<details>
<summary>receivePayload</summary>

Receives the message from the configured queue or subscription directly bound to the expected payload type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `serverWaitTime` | `int?` | No | Maximum wait time in seconds for a message to arrive. Defaults to `60`. |
| `T` | `typedesc<anydata>` | No | The expected payload type. |
| `deadLettered` | `boolean` | No | When `true`, receives from the dead-letter sub-queue instead of the main queue or subscription. Defaults to `false`. |

Returns: `T|error`

Sample code:

```ballerina
string payload = check receiver->receivePayload(serverWaitTime = 60);
```

</details>

<details>
<summary>receiveBatch</summary>

Receives a batch of messages from the queue or subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `maxMessageCount` | `int` | Yes | Maximum number of messages to receive in the batch. |
| `serverWaitTime` | `int?` | No | Maximum wait time in seconds. Defaults to `()` (no wait). |
| `deadLettered` | `boolean` | No | When `true`, receives from the dead-letter sub-queue instead of the main queue or subscription. Defaults to `false`. |

Returns: `asb:MessageBatch|error?`

Returns `()` if no messages are available. Always assign to a nilable type.

Sample code:

```ballerina
asb:MessageBatch? batch = check receiver->receiveBatch(maxMessageCount = 10);
if batch is () {
    // No messages available
    return;
}
```

</details>

#### Message settlement

<details>
<summary>complete</summary>

Completes a message, removing it from the queue. Used in `PEEK_LOCK` mode.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message to complete. |

Returns: `error?`

Sample code:

```ballerina
asb:Message? message = check receiver->receive(serverWaitTime = 60);
if message is () {
    return;
}
check receiver->complete(message);
```

</details>

<details>
<summary>abandon</summary>

Abandons a message, releasing the lock so it can be received again.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message to abandon. |

Returns: `error?`

Sample code:

```ballerina
check receiver->abandon(message);
```

</details>

<details>
<summary>deadLetter</summary>

Moves a message to the dead-letter sub-queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message to dead-letter. |
| `deadLetterReason` | `string?` | No | The reason for dead-lettering. |
| `deadLetterErrorDescription` | `string?` | No | A description of the error that caused dead-lettering. |

Returns: `error?`

Sample code:

```ballerina
check receiver->deadLetter(message,
    deadLetterReason = "ProcessingFailure",
    deadLetterErrorDescription = "Unable to parse message body"
);
```

</details>

<details>
<summary>defer</summary>

Defers a message so it can only be received by its sequence number later.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message to defer. |

Returns: `int|error`

The returned `int` is the sequence number of the deferred message. Pass it to `receiveDeferred` to retrieve the message later.

Sample code:

```ballerina
int sequenceNumber = check receiver->defer(message);
// Later, retrieve the deferred message:
asb:Message? deferred = check receiver->receiveDeferred(sequenceNumber);
```

</details>

<details>
<summary>receiveDeferred</summary>

Receives a previously deferred message by its sequence number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNumber` | `int` | Yes | The sequence number of the deferred message. |

Returns: `asb:Message|error?`

Sample code:

```ballerina
asb:Message? deferredMsg = check receiver->receiveDeferred(sequenceNumber);
```

</details>

#### Lock management

<details>
<summary>renewLock</summary>

Renews the lock on a message in `PEEK_LOCK` mode to extend processing time.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `asb:Message` | Yes | The message whose lock should be renewed. |

Returns: `error?`

Sample code:

```ballerina
check receiver->renewLock(message);
```

</details>

#### Connection

<details>
<summary>close</summary>

Closes the receiver connection and releases resources.

No parameters.

Returns: `error?`

Sample code:

```ballerina
check receiver->closeReceiver();
```

</details>

---

## Administrator

Manage Azure Service Bus entities: create, get, update, delete, and list queues, topics, subscriptions, and rules.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionString` | `string` | Required | The Azure Service Bus connection string with Manage rights. |

### Initializing the client

```ballerina
import ballerinax/asb;

configurable string connectionString = ?;

asb:Administrator admin = check new ({
    connectionString: connectionString
});
```

### Operations

#### Queue management

<details>
<summary>createQueue</summary>

Creates a new queue in the Azure Service Bus namespace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue to create. |
| `queueProperties` | `CreateQueueOptions?` | No | Optional properties such as max size, TTL, lock duration, and dead-lettering settings. |

Returns: `QueueProperties|error`

Sample code:

```ballerina
asb:QueueProperties queue = check admin->createQueue("my-new-queue");
```

Sample response:

```ballerina
{"name": "my-new-queue", "status": "Active", "maxSizeInMegabytes": 1024}
```

</details>

<details>
<summary>getQueue</summary>

Retrieves the properties of an existing queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue. |

Returns: `QueueProperties|error`

Sample code:

```ballerina
asb:QueueProperties queue = check admin->getQueue("my-queue");
```

</details>

<details>
<summary>updateQueue</summary>

Updates the properties of an existing queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueProperties` | `QueueProperties` | Yes | The updated queue properties. |

Returns: `QueueProperties|error`

Sample code:

```ballerina
asb:QueueProperties queue = check admin->getQueue("my-queue");
asb:QueueProperties updated = check admin->updateQueue({
    ...queue,
    maxDeliveryCount: 15
});
```

</details>

<details>
<summary>deleteQueue</summary>

Deletes a queue from the namespace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue to delete. |

Returns: `error?`

Sample code:

```ballerina
check admin->deleteQueue("my-old-queue");
```

</details>

<details>
<summary>listQueues</summary>

Lists all queues in the Azure Service Bus namespace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `QueueProperties[]|error`

Sample code:

```ballerina
asb:QueueProperties[] queues = check admin->listQueues();
```

</details>

<details>
<summary>queueExists</summary>

Checks whether a queue with the given name exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | The name of the queue to check. |

Returns: `boolean|error`

Sample code:

```ballerina
boolean exists = check admin->queueExists("my-queue");
```

</details>

#### Topic management

<details>
<summary>createTopic</summary>

Creates a new topic in the Azure Service Bus namespace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the topic to create. |
| `topicProperties` | `CreateTopicOptions?` | No | Optional properties such as max size, TTL, and duplicate detection. |

Returns: `TopicProperties|error`

Sample code:

```ballerina
asb:TopicProperties topic = check admin->createTopic("my-new-topic");
```

Sample response:

```ballerina
{"name": "my-new-topic", "status": "Active", "maxSizeInMegabytes": 1024}
```

</details>

<details>
<summary>getTopic</summary>

Retrieves the properties of an existing topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the topic. |

Returns: `TopicProperties|error`

Sample code:

```ballerina
asb:TopicProperties topic = check admin->getTopic("my-topic");
```

</details>

<details>
<summary>updateTopic</summary>

Updates the properties of an existing topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicProperties` | `TopicProperties` | Yes | The updated topic properties. |

Returns: `TopicProperties|error`

Sample code:

```ballerina
asb:TopicProperties topic = check admin->getTopic("my-topic");
asb:TopicProperties updated = check admin->updateTopic({
    ...topic,
    defaultMessageTimeToLive: 3600
});
```

</details>

<details>
<summary>deleteTopic</summary>

Deletes a topic from the namespace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the topic to delete. |

Returns: `error?`

Sample code:

```ballerina
check admin->deleteTopic("my-old-topic");
```

</details>

<details>
<summary>listTopics</summary>

Lists all topics in the Azure Service Bus namespace.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|

Returns: `TopicProperties[]|error`

Sample code:

```ballerina
asb:TopicProperties[] topics = check admin->listTopics();
```

</details>

<details>
<summary>topicExists</summary>

Checks whether a topic with the given name exists.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the topic to check. |

Returns: `boolean|error`

Sample code:

```ballerina
boolean exists = check admin->topicExists("my-topic");
```

</details>

#### Subscription management

<details>
<summary>createSubscription</summary>

Creates a new subscription under a topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription to create. |
| `subscriptionProperties` | `CreateSubscriptionOptions?` | No | Optional subscription properties. |

Returns: `SubscriptionProperties|error`

Sample code:

```ballerina
asb:SubscriptionProperties sub = check admin->createSubscription("my-topic", "my-subscription");
```

Sample response:

```ballerina
{"subscriptionName": "my-subscription", "topicName": "my-topic", "status": "Active"}
```

</details>

<details>
<summary>getSubscription</summary>

Retrieves the properties of an existing subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription. |

Returns: `SubscriptionProperties|error`

Sample code:

```ballerina
asb:SubscriptionProperties sub = check admin->getSubscription("my-topic", "my-subscription");
```

</details>

<details>
<summary>updateSubscription</summary>

Updates the properties of an existing subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionProperties` | `SubscriptionProperties` | Yes | The updated subscription properties. |

Returns: `SubscriptionProperties|error`

Sample code:

```ballerina
asb:SubscriptionProperties sub = check admin->getSubscription("my-topic", "my-sub");
asb:SubscriptionProperties updated = check admin->updateSubscription("my-topic", {
    ...sub,
    maxDeliveryCount: 20
});
```

</details>

<details>
<summary>deleteSubscription</summary>

Deletes a subscription from a topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription to delete. |

Returns: `error?`

Sample code:

```ballerina
check admin->deleteSubscription("my-topic", "my-old-subscription");
```

</details>

<details>
<summary>listSubscriptions</summary>

Lists all subscriptions under a topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |

Returns: `SubscriptionProperties[]|error`

Sample code:

```ballerina
asb:SubscriptionProperties[] subs = check admin->listSubscriptions("my-topic");
```

</details>

<details>
<summary>subscriptionExists</summary>

Checks whether a subscription exists under a topic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription to check. |

Returns: `boolean|error`

Sample code:

```ballerina
boolean exists = check admin->subscriptionExists("my-topic", "my-subscription");
```

</details>

#### Rule management

<details>
<summary>createRule</summary>

Creates a new rule under a topic subscription for message filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription. |
| `ruleName` | `string` | Yes | The name of the rule to create. |
| `ruleProperties` | `CreateRuleOptions?` | No | Optional rule options including filter and action. |

Returns: `RuleProperties|error`

Sample code:

```ballerina
asb:RuleProperties rule = check admin->createRule("my-topic", "my-sub", "high-priority-filter");
```

</details>

<details>
<summary>getRule</summary>

Retrieves the properties of a rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription. |
| `ruleName` | `string` | Yes | The name of the rule. |

Returns: `RuleProperties|error`

Sample code:

```ballerina
asb:RuleProperties rule = check admin->getRule("my-topic", "my-sub", "my-rule");
```

</details>

<details>
<summary>updateRule</summary>

Updates the properties of an existing rule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription. |
| `ruleProperties` | `RuleProperties` | Yes | The updated rule properties. |

Returns: `RuleProperties|error`

Sample code:

```ballerina
asb:RuleProperties rule = check admin->getRule("my-topic", "my-sub", "my-rule");
asb:RuleProperties updated = check admin->updateRule("my-topic", "my-sub", rule);
```

</details>

<details>
<summary>deleteRule</summary>

Deletes a rule from a subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription. |
| `ruleName` | `string` | Yes | The name of the rule to delete. |

Returns: `error?`

Sample code:

```ballerina
check admin->deleteRule("my-topic", "my-sub", "old-rule");
```

</details>

<details>
<summary>listRules</summary>

Lists all rules under a topic subscription.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | The name of the parent topic. |
| `subscriptionName` | `string` | Yes | The name of the subscription. |

Returns: `RuleProperties[]|error`

Sample code:

```ballerina
asb:RuleProperties[] rules = check admin->listRules("my-topic", "my-sub");
```

</details>

## What's next

- [Trigger Reference](triggers.md): event-driven integration using `asb:Listener`
- [Setup Guide](setup-guide.md): obtain the connection string required for all clients
- [Example](example.md): complete worked examples for sender, receiver, and trigger
