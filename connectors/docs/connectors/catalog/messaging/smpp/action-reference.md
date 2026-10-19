---
title: Actions
---

# Actions

The SMPP connector exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Submits, queries, cancels, and replaces messages against an SMSC |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

An SMPP client bound to an SMSC as `TRANSMITTER`, `RECEIVER`, or `TRANSCEIVER`, for issuing the submit-family operations as an active outbound session. The client binds once at initialization and stays bound for its lifetime.

### Configuration

The `host`, `systemId`, and `password` used to bind are required parameters of the client's initialization, ahead of the rest of the configuration below.

**`ClientConfig`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | <code>int</code> | <code>2775</code> | SMSC port |
| `systemType` | <code>string</code> | <code>""</code> | The optional SMPP `system_type` |
| `bindType` | <code>TRANSMITTER&#124;RECEIVER&#124;TRANSCEIVER</code> | <code>TRANSCEIVER</code> | The bind mode. `TRANSMITTER` and `TRANSCEIVER` can submit; `RECEIVER` cannot |
| `bindTimeout` | <code>decimal</code> | <code>60</code> | Maximum time, in seconds, the connect-and-bind handshake may take |
| `transactionTimeout` | <code>decimal</code> | <code>30</code> | How long a submit-family operation waits for the SMSC's response, in seconds |
| `enquireLinkInterval` | <code>decimal</code> | <code>60</code> | How often the client sends a keepalive `enquire_link` when the session is otherwise idle, in seconds |
| `secureSocket` | <code>SecureSocket&#124;InsecureSocket?</code> | <code>()</code> | Transport security. Absent means plaintext TCP |

### Initializing the client

```ballerina
import ballerina/smpp;

smpp:Client smppClient = check new ("smsc.example.com", systemId, password,
        port = 2775, bindType = smpp:TRANSMITTER);
```

With TLS:

```ballerina
smpp:Client smppClient = check new ("smsc.example.com", systemId, password,
        port = 3550,
        secureSocket = {
            cert: {path: "./truststore.p12", password: trustStorePass}
        });
```

### Operations

#### Submit

<details>
<summary>submit</summary>

Submits a message to the SMSC (`submit_sm`) and waits for the response. Requires `bindType: TRANSMITTER` or `TRANSCEIVER`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sms` | <code>TextSms&#124;BinarySms</code> | Yes | The message to send: a `TextSms` (the client encodes it) or a `BinarySms` (pre-encoded octets) |

**Returns:** `SubmitResult|Error`

**Sample code:**

```ballerina
smpp:SubmitResult|smpp:Error result = smppClient->submit({
    destinationAddress: "94771234567",
    shortMessage: "Hello from Ballerina!",
    registeredDelivery: smpp:ON_SUCCESS_OR_FAILURE
});
if result is smpp:SubmitResult {
    // Correlate later delivery receipts against result.messageId.
}
```

</details>

<details>
<summary>submitMulti</summary>

Submits one message to several destinations in a single `submit_multi` request. Requires `bindType: TRANSMITTER` or `TRANSCEIVER`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sms` | <code>TextSms&#124;BinarySms</code> | Yes | The message to send; `sms.destinationAddress` is not used |
| `destinationAddresses` | <code>string[]</code> | Yes | The recipient addresses for this batch; must contain at least one |

**Returns:** `MultiSubmitResult|Error`

**Sample code:**

```ballerina
smpp:MultiSubmitResult result = check smppClient->submitMulti(
    {destinationAddress: "", shortMessage: "Flash sale ends tonight!"},
    ["94771234567", "94777654321"]
);
```

</details>

<details>
<summary>submitData</summary>

Submits a message via `data_sm` instead of `submit_sm`, the alternative MT transfer PDU some SMSCs prefer for binary/WAP-push payloads. Requires `bindType: TRANSMITTER` or `TRANSCEIVER`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `data` | <code>TextSms&#124;BinarySms</code> | Yes | The message to send |

**Returns:** `SubmitResult|Error`

**Sample code:**

```ballerina
smpp:SubmitResult result = check smppClient->submitData({
    destinationAddress: "94771234567",
    shortMessageBytes: payloadBytes,
    dataCoding: 0
});
```

</details>

#### Query, cancel, and replace

<details>
<summary>queryStatus</summary>

Queries the SMSC's current view of a previously submitted message's delivery state (`query_sm`). Requires `bindType: TRANSMITTER` or `TRANSCEIVER`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The SMSC's `message_id` for the message, as returned by `submit`/`submitMulti`/`submitData` |
| `sourceAddress` | <code>string</code> | Yes | The message's original source address |

**Returns:** `QueryResult|Error`

**Sample code:**

```ballerina
smpp:QueryResult status = check smppClient->queryStatus(messageId, "94771234567");
```

</details>

<details>
<summary>cancel</summary>

Cancels a previously submitted, not-yet-delivered message (`cancel_sm`). Requires `bindType: TRANSMITTER` or `TRANSCEIVER`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The SMSC's `message_id` for the message to cancel |
| `sourceAddress` | <code>string</code> | Yes | The message's original source address |
| `destinationAddress` | <code>string</code> | Yes | The message's original destination address |

**Returns:** `Error?`

**Sample code:**

```ballerina
check smppClient->cancel(messageId, "94771234567", "94771234567");
```

</details>

<details>
<summary>replace</summary>

Replaces the text/attributes of a previously submitted, not-yet-delivered message (`replace_sm`). Requires `bindType: TRANSMITTER` or `TRANSCEIVER`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `messageId` | <code>string</code> | Yes | The SMSC's `message_id` for the message to replace |
| `sourceAddress` | <code>string</code> | Yes | The message's original source address |
| `sms` | <code>TextSms&#124;BinarySms</code> | Yes | The replacement content |

**Returns:** `Error?`

**Sample code:**

```ballerina
check smppClient->replace(messageId, "94771234567",
        {destinationAddress: "94771234567", shortMessage: "Updated text"});
```

</details>

#### Connection lifecycle

<details>
<summary>close</summary>

Unbinds and releases the underlying SMSC session. Idempotent: closing an already-closed client is a no-op. A closed client cannot be reused; create a new one.

**Parameters:**

No parameters

**Returns:** `Error?`

**Sample code:**

```ballerina
check smppClient.close();
```

</details>
