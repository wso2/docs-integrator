---
title: Actions
---

# Actions

The `ballerinax/ibm.ibmmq` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Queue Manager`](#queue-manager) | Connects to an IBM MQ queue manager and provides access to queues and topics. |
| [`Queue`](#queue) | Provides operations to put messages onto and get messages from an IBM MQ queue. |
| [`Topic`](#topic) | Provides operations to publish messages to and receive messages from an IBM MQ topic. |

For event-driven integration, see the [Trigger Reference](triggers.md).

---

## Queue manager

Connects to an IBM MQ queue manager and provides access to queues and topics.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | Required | Name of the IBM MQ queue manager. |
| `host` | `string` | Required | Hostname of the IBM MQ server. |
| `port` | `int` | `1414` | Port number of the IBM MQ server. |
| `channel` | `string` | Required | Server connection channel name. |
| `userID` | `string` | `()` | User ID for authentication. |
| `password` | `string` | `()` | Password for authentication. |
| `sslCipherSuite` | `SslCipherSuite` | `()` | SSL cipher suite (e.g., `TLS12ORHIGHER`). |
| `secureSocket` | `SecureSocket` | `()` | SSL/TLS trust store and key store configuration. |

### Initializing the client

```ballerina
import ballerinax/ibm.ibmmq;

configurable string queueManagerName = ?;
configurable string host = ?;
configurable int port = ?;
configurable string channel = ?;
configurable string userID = ?;
configurable string password = ?;

ibmmq:QueueManager queueManager = check new (
    name = queueManagerName,
    host = host,
    port = port,
    channel = channel,
    userID = userID,
    password = password
);
```

### Operations

#### Queue and topic access

<details>
<summary>accessQueue</summary>

Opens and returns a queue object for the specified queue name with the given access options.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queueName` | `string` | Yes | Name of the queue to access (e.g., `"DEV.QUEUE.1"`). |
| `options` | `int` | Yes | Queue open options (e.g., `ibmmq:MQOO_OUTPUT` for producing, `ibmmq:MQOO_INPUT_AS_Q_DEF` for consuming). |

Returns: `ibmmq:Queue|ibmmq:Error`

Sample code:

```ballerina
ibmmq:Queue queue = check queueManager.accessQueue("DEV.QUEUE.1", ibmmq:MQOO_OUTPUT);
```

Sample response:

```ballerina
ibmmq:Queue object
```

</details>

<details>
<summary>accessTopic</summary>

Opens and returns a topic object for the specified topic name and topic string.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topicName` | `string` | Yes | Name of the topic object (e.g., `"dev"`). |
| `topicString` | `string` | Yes | Topic string for the subscription (e.g., `"DEV.BASE.TOPIC"`). |
| `openTopicOption` | `OPEN_TOPIC_OPTION` | Yes | Whether to open as a subscription (`OPEN_AS_SUBSCRIPTION`) or publication (`OPEN_AS_PUBLICATION`). |
| `options` | `int` | Yes | Additional open options (e.g., `ibmmq:MQOO_OUTPUT`). |

Returns: `ibmmq:Topic|ibmmq:Error`

Sample code:

```ballerina
ibmmq:Topic topic = check queueManager.accessTopic(
    "dev", "DEV.BASE.TOPIC", ibmmq:OPEN_AS_PUBLICATION, ibmmq:MQOO_OUTPUT
);
```

Sample response:

```ballerina
ibmmq:Topic object
```

</details>

#### Connection management

<details>
<summary>disconnect</summary>

Disconnects from the IBM MQ queue manager and releases all associated resources.

Returns: `ibmmq:Error?`

Sample code:

```ballerina
check queueManager.disconnect();
```

</details>

---

## Queue

Provides operations to put messages onto and get messages from an IBM MQ queue.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | Required | Name of the IBM MQ queue manager. |
| `host` | `string` | Required | Hostname of the IBM MQ server. |
| `port` | `int` | `1414` | Port number of the IBM MQ server. |
| `channel` | `string` | Required | Server connection channel name. |
| `userID` | `string` | `()` | User ID for authentication. |
| `password` | `string` | `()` | Password for authentication. |

### Initializing the client

```ballerina
import ballerinax/ibm.ibmmq;

configurable string queueManagerName = ?;
configurable string host = ?;
configurable int port = ?;
configurable string channel = ?;
configurable string userID = ?;
configurable string password = ?;

ibmmq:QueueManager queueManager = check new (
    name = queueManagerName,
    host = host,
    port = port,
    channel = channel,
    userID = userID,
    password = password
);
ibmmq:Queue queue = check queueManager.accessQueue("DEV.QUEUE.1", ibmmq:MQOO_OUTPUT);
```

### Operations

#### Message operations

<details>
<summary>put</summary>

Puts a message onto the queue.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `ibmmq:Message` | Yes | The message to put on the queue. Must include a `payload` field with the message content as `byte[]`. |
| `options` | `int` | No | Put message options (default: `MQPMO_NO_SYNCPOINT`). |

Returns: `ibmmq:Error?`

Sample code:

```ballerina
check queue->put({
    payload: "Hello World".toBytes()
});
```

</details>

<details>
<summary>get</summary>

Gets a message from the queue. Returns `nil` if no message is available within the wait interval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | `int` | No | Get message options (default: `MQGMO_NO_WAIT`). |
| `waitInterval` | `int` | No | Maximum time to wait for a message in seconds (default: `10`). |
| `matchOptions` | `MatchOptions` | No | Message selection criteria (match by message ID or correlation ID). |

Returns: `ibmmq:Message|ibmmq:Error?`

Sample code:

```ballerina
ibmmq:Message? message = check queue->get(options = ibmmq:MQGMO_WAIT, waitInterval = 5);
```

Sample response:

```ballerina
{
  "payload": [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
  "messageId": [65, 77, 81, 32, 81, 77, 49],
  "format": "MQSTR",
  "persistence": 0,
  "priority": 4,
  "messageType": 8,
  "expiry": -1
}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the queue and releases associated resources.

Returns: `ibmmq:Error?`

Sample code:

```ballerina
check queue->close();
```

</details>

---

## Topic

Provides operations to publish messages to and receive messages from an IBM MQ topic.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string` | Required | Name of the IBM MQ queue manager. |
| `host` | `string` | Required | Hostname of the IBM MQ server. |
| `port` | `int` | `1414` | Port number of the IBM MQ server. |
| `channel` | `string` | Required | Server connection channel name. |
| `userID` | `string` | `()` | User ID for authentication. |
| `password` | `string` | `()` | Password for authentication. |

### Initializing the client

```ballerina
import ballerinax/ibm.ibmmq;

configurable string queueManagerName = ?;
configurable string host = ?;
configurable int port = ?;
configurable string channel = ?;
configurable string userID = ?;
configurable string password = ?;

ibmmq:QueueManager queueManager = check new (
    name = queueManagerName,
    host = host,
    port = port,
    channel = channel,
    userID = userID,
    password = password
);
ibmmq:Topic topic = check queueManager.accessTopic(
    "dev", "DEV.BASE.TOPIC", ibmmq:OPEN_AS_PUBLICATION, ibmmq:MQOO_OUTPUT
);
```

### Operations

#### Message operations

<details>
<summary>put</summary>

Puts a message to the topic using the native MQ API.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `ibmmq:Message` | Yes | The message to publish. Must include a `payload` field with the message content as `byte[]`. |
| `options` | `int` | No | Put message options (default: `MQPMO_NO_SYNCPOINT`). |

Returns: `ibmmq:Error?`

Sample code:

```ballerina
check topic->put({
    payload: "Hello Topic".toBytes()
});
```

</details>

<details>
<summary>send</summary>

Sends a message to the topic using the JMS API. Recommended for use with durable subscriptions and JMS consumers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `ibmmq:Message` | Yes | The message to send. Must include a `payload` field with the message content as `byte[]`. |

Returns: `ibmmq:Error?`

Sample code:

```ballerina
check topic->send({
    payload: "Hello JMS Topic".toBytes()
});
```

</details>

<details>
<summary>get</summary>

Gets a message from the topic subscription. Returns `nil` if no message is available within the wait interval.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `options` | `int` | No | Get message options (default: `MQGMO_NO_WAIT`). |
| `waitInterval` | `int` | No | Maximum time to wait for a message in seconds (default: `10`). |
| `matchOptions` | `MatchOptions` | No | Message selection criteria (match by message ID or correlation ID). |

Returns: `ibmmq:Message|ibmmq:Error?`

Sample code:

```ballerina
ibmmq:Message? message = check topic->get(options = ibmmq:MQGMO_WAIT, waitInterval = 5);
```

Sample response:

```ballerina
{
  "payload": [72, 101, 108, 108, 111, 32, 84, 111, 112, 105, 99],
  "messageId": [65, 77, 81, 32, 81, 77, 49],
  "format": "MQSTR",
  "persistence": 0,
  "priority": 4,
  "messageType": 8,
  "expiry": -1
}
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the topic and releases associated resources.

Returns: `ibmmq:Error?`

Sample code:

```ballerina
check topic->close();
```

</details>
