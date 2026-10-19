# Actions

The `ballerina/mqtt` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Publish messages to MQTT topics, subscribe to topics, and receive messages. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

Publish messages to MQTT topics, subscribe to topics, and receive messages.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serverUri` | <code>string</code> | Required | The MQTT broker URL (e.g., `tcp://localhost:1883` or `ssl://broker.example.com:8883`). Passed as a constructor parameter. |
| `clientId` | <code>string</code> | Required | A unique client identifier for the MQTT session. Passed as a constructor parameter. |
| `connectionConfig` | <code>ConnectionConfiguration</code> | `()` | Connection settings including authentication, TLS, reconnection, and keep-alive. |
| `connectionConfig.username` | <code>string</code> | `()` | Username for broker authentication. |
| `connectionConfig.password` | <code>string</code> | `()` | Password for broker authentication. |
| `connectionConfig.secureSocket` | <code>SecureSocket</code> | `()` | SSL/TLS configuration for secure connections. |
| `connectionConfig.maxReconnectDelay` | <code>int</code> | `()` | Maximum delay (in milliseconds) between reconnection attempts. |
| `connectionConfig.keepAliveInterval` | <code>int</code> | `()` | Keep-alive interval in seconds. |
| `connectionConfig.connectionTimeout` | <code>int</code> | `()` | Connection timeout in seconds. |
| `connectionConfig.cleanStart` | <code>boolean</code> | `()` | Whether to start a clean session (discard previous session state). |
| `connectionConfig.serverUris` | <code>string[]</code> | `()` | Fallback server URIs for high availability. |
| `connectionConfig.automaticReconnect` | <code>boolean</code> | `()` | Whether to automatically reconnect on connection loss. |
| `willDetails` | <code>WillDetails</code> | `()` | Last Will and Testament message configuration, sent by the broker if the client disconnects unexpectedly. |

### Initializing the client

```ballerina
import ballerina/mqtt;
import ballerina/uuid;

mqtt:Client mqttClient = check new (mqtt:DEFAULT_URL, uuid:createType1AsString());
```

### Operations

#### Publishing

<details>
<summary>publish</summary>

Publishes a message to the specified MQTT topic.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `topic` | <code>string</code> | Yes | The MQTT topic to publish to. |
| `message` | <code>mqtt:Message</code> | Yes | The message to publish, including payload, QoS level, and retention flag. |

**Returns:** `mqtt:DeliveryToken|error`

**Sample code:**

```ballerina
mqtt:DeliveryToken token = check mqttClient->publish("sensors/temperature", {
    payload: "25.5".toBytes(),
    qos: 2,
    retained: true
});
```

**Sample response:**

```ballerina
{"messageId": 1, "topic": "sensors/temperature"}
```

</details>

#### Subscribing

<details>
<summary>subscribe</summary>

Subscribes to one or more MQTT topics. Accepts a topic string, string array, Subscription record, or Subscription array.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `subscriptions` | <code>string&#124;string[]&#124;Subscription&#124;Subscription[]</code> | Yes | The topic(s) to subscribe to, optionally with QoS settings. |

**Returns:** `error?`

**Sample code:**

```ballerina
check mqttClient->subscribe([
    {topic: "sensors/temperature", qos: 2},
    {topic: "sensors/humidity", qos: 1}
]);
```

</details>

<details>
<summary>receive</summary>

Returns a stream of messages from subscribed topics. Use this for pull-based message consumption.

**Returns:** `stream<mqtt:Message, error?>|error`

**Sample code:**

```ballerina
stream<mqtt:Message, error?> messages = check mqttClient->receive();
check from mqtt:Message msg in messages
    do {
        string payload = check string:fromBytes(msg.payload);
        // process message
    };
```

**Sample response:**

```ballerina
{"payload": [50, 53, 46, 53], "qos": 2, "retained": false, "duplicate": false, "messageId": 1, "topic": "sensors/temperature"}
```

</details>

#### Connection management

<details>
<summary>isConnected</summary>

Checks whether the client is currently connected to the MQTT broker.

**Returns:** `boolean|error`

**Sample code:**

```ballerina
boolean connected = check mqttClient->isConnected();
```

**Sample response:**

```ballerina
true
```

</details>

<details>
<summary>disconnect</summary>

Disconnects the client from the MQTT broker gracefully.

**Returns:** `error?`

**Sample code:**

```ballerina
check mqttClient->disconnect();
```

</details>

<details>
<summary>reconnect</summary>

Reconnects the client to the MQTT broker after a disconnect.

**Returns:** `error?`

**Sample code:**

```ballerina
check mqttClient->reconnect();
```

</details>

<details>
<summary>close</summary>

Closes the client connection and releases all resources.

**Returns:** `error?`

**Sample code:**

```ballerina
check mqttClient->close();
```

</details>
