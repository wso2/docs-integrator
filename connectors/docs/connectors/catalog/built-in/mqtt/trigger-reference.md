# Triggers

The `ballerina/mqtt` connector supports event-driven message consumption through the `mqtt:Listener`. When messages arrive on subscribed topics, the listener invokes your service callbacks automatically: ideal for building reactive IoT pipelines and message-driven integrations.

Three components work together:

| Component | Role |
|-----------|------|
| `mqtt:Listener` | Connects to an MQTT broker, subscribes to specified topics, and dispatches incoming messages to attached services. |
| `mqtt:Service` | Defines the `onMessage`, `onError`, and `onComplete` callbacks invoked when events occur. |
| `mqtt:Caller` | Provided to `onMessage` for manual acknowledgement (`complete`) and request-response (`respond`) patterns. |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `mqtt:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ListenerConfiguration` | Configuration for the MQTT listener, including connection settings and acknowledgement mode. |

**`ListenerConfiguration` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serverUri` | <code>string</code> | Required | The MQTT broker URL (e.g., `tcp://localhost:1883`). Passed as a constructor parameter. |
| `clientId` | <code>string</code> | Required | A unique client identifier. Passed as a constructor parameter. |
| `subscriptions` | <code>string&#124;string[]&#124;Subscription&#124;Subscription[]</code> | Required | The topic(s) to subscribe to. Passed as a constructor parameter. |
| `connectionConfig` | <code>ConnectionConfiguration</code> | `()` | Connection settings including authentication, TLS, reconnection, and keep-alive. |
| `manualAcks` | <code>boolean</code> | `false` | If `true`, messages must be explicitly acknowledged using `caller->complete()`. If `false`, messages are auto-acknowledged. |

### Initializing the listener

**Basic listener with auto-acknowledgement:**

```ballerina
import ballerina/mqtt;
import ballerina/uuid;

listener mqtt:Listener tempListener = new (
    mqtt:DEFAULT_URL,
    uuid:createType1AsString(),
    "sensors/temperature"
);
```

**Listener with manual acknowledgement and authentication:**

```ballerina
import ballerina/mqtt;
import ballerina/uuid;

configurable string username = ?;
configurable string password = ?;

listener mqtt:Listener tempListener = new (
    mqtt:DEFAULT_URL,
    uuid:createType1AsString(),
    [{topic: "sensors/temperature", qos: 2}],
    {
        connectionConfig: {
            username: username,
            password: password
        },
        manualAcks: true
    }
);
```

---

## Service

An `mqtt:Service` is a Ballerina service attached to an `mqtt:Listener`. It implements callbacks that are invoked when messages are received, errors occur, or message delivery completes.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onMessage` | <code>remote function onMessage(mqtt:Message message, mqtt:Caller caller) returns error?</code> | Invoked when a message is received on a subscribed topic. The `caller` parameter is optional and used for manual acknowledgement or response. |
| `onError` | <code>remote function onError(mqtt:Error err) returns error?</code> | Invoked when an error occurs during message processing. This callback is optional. |
| `onComplete` | <code>remote function onComplete(mqtt:DeliveryToken token) returns error?</code> | Invoked when a message delivery is completed (broker acknowledgement received). This callback is optional. |

The `onMessage` callback is required. The `onError` and `onComplete` callbacks are optional: implement only the ones you need.

### Full usage example

```ballerina
import ballerina/log;
import ballerina/mqtt;
import ballerina/uuid;

configurable string broker = mqtt:DEFAULT_URL;
const TOPIC = "sensors/temperature";

listener mqtt:Listener tempListener = new (
    broker,
    uuid:createType1AsString(),
    TOPIC,
    {manualAcks: true}
);

service on tempListener {
    remote function onMessage(mqtt:Message message, mqtt:Caller caller) returns error? {
        string payload = check string:fromBytes(message.payload);
        json sensorData = check payload.fromJsonString();
        float temperature = check sensorData.temperature;

        if temperature > 30.0 {
            log:printWarn("High temperature alert!", temp = temperature);
        } else {
            log:printInfo("Temperature normal", temp = temperature);
        }

        // Acknowledge the message
        check caller->complete();
    }

    remote function onError(mqtt:Error err) returns error? {
        log:printError("Error processing message", 'error = err);
    }
}
```

When `manualAcks` is set to `true` in the listener configuration, you must call `caller->complete()` in your `onMessage` callback to acknowledge each message. When `manualAcks` is `false` (default), messages are acknowledged automatically.

---

## Supporting types

### `Message`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | <code>byte[]</code> | The message payload as a byte array. |
| `qos` | <code>int</code> | Quality of Service level: `0` (at most once), `1` (at least once), `2` (exactly once). Default: `1`. |
| `retained` | <code>boolean</code> | Whether the message is retained by the broker. Default: `false`. |
| `duplicate` | <code>boolean</code> | Whether this is a duplicate delivery. Default: `false`. |
| `messageId` | <code>int?</code> | The message ID assigned by the broker. |
| `topic` | <code>string?</code> | The topic on which the message was received. |
| `properties` | <code>MessageProperties?</code> | MQTT v5 message properties (response topic, correlation data). |

### `DeliveryToken`

| Field | Type | Description |
|-------|------|-------------|
| `messageId` | <code>int</code> | The ID of the delivered message. |
| `topic` | <code>string</code> | The topic the message was delivered to. |

### `Subscription`

| Field | Type | Description |
|-------|------|-------------|
| `topic` | <code>string</code> | The topic filter string to subscribe to. |
| `qos` | <code>int</code> | Quality of Service level for the subscription. Default: `1`. |
