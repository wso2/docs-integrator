---
title: Triggers
---

# Triggers

The SMPP connector supports event-driven integration where the SMSC pushes mobile-originated messages and delivery receipts to a registered Ballerina service.

Two components work together:

| Component | Role |
|-----------|------|
| `smpp:Listener` | Binds to the SMSC as `RECEIVER` or `TRANSCEIVER` and manages the session |
| `smpp:Caller` | Injected into a transceiver-bound service's handler to reply on the same session |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `smpp:Listener` binds as `RECEIVER` (inbound only) or `TRANSCEIVER` (inbound + reply via `Caller`), and dispatches every inbound `deliver_sm`/`data_sm` to the attached service.

### Configuration

The `host`, `systemId`, and `password` used to bind are required parameters of the listener's initialization, ahead of the rest of the configuration below.

**`ListenerConfig` (selected fields):**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | <code>int</code> | <code>2775</code> | SMSC port |
| `bindType` | <code>RECEIVER&#124;TRANSCEIVER</code> | <code>RECEIVER</code> | The bind mode. `TRANSCEIVER` additionally allows replying via `Caller` |
| `maxConcurrentDispatch` | <code>int</code> | <code>3</code> | Maximum number of inbound PDUs dispatched to the attached service concurrently |
| `responseMode` | <code>SYNC&#124;ASYNC</code> | <code>SYNC</code> | Controls when the `deliver_sm_resp`/`data_sm_resp` is sent back to the SMSC |
| `rebindPolicy` | <code>RebindPolicy</code> | <code>{}</code> | Controls automatic rebinding after an unexpected session drop |
| `secureSocket` | <code>SecureSocket&#124;InsecureSocket?</code> | <code>()</code> | Transport security. Absent means plaintext TCP |

### Initializing the listener

```ballerina
import ballerina/smpp;

configurable string systemId = ?;
configurable string password = ?;

listener smpp:Listener smsListener = check new ("smsc.example.com", systemId, password,
        port = 2775, bindType = smpp:RECEIVER);
```

---

## Service

A service attached to an `smpp:Listener` implements one or more of the callbacks below. One service per listener.

### Callbacks

| Callback | Signature | Description |
|----------|-----------|--------------|
| `onDeliverSm` | <code>remote function onDeliverSm(smpp:Sms sms) returns error?</code> | Invoked for an inbound `deliver_sm`: a mobile-originated message or a delivery receipt |
| `onDataSm` | <code>remote function onDataSm(smpp:Sms sms) returns error?</code> | Invoked for an inbound `data_sm` |
| `onError` | <code>remote function onError(error err) returns error?</code> | Invoked on an unexpected session drop |

In `SYNC` response mode (the default), an error returned from `onDeliverSm`/`onDataSm` becomes a negative response telling the SMSC the message was not handled; most SMSCs treat this as a signal to redeliver. In `ASYNC` mode, the SMSC is acknowledged immediately and a later handler failure is only logged, never reflected back to the SMSC.

### Full example: receive only

```ballerina
import ballerina/io;
import ballerina/smpp;

configurable string systemId = ?;
configurable string password = ?;

listener smpp:Listener smsListener = check new ("smsc.example.com", systemId, password,
        port = 2775, bindType = smpp:RECEIVER);

service on smsListener {
    remote function onDeliverSm(smpp:Sms sms) returns error? {
        if sms.deliveryReceipt {
            io:println(string `Delivery receipt: ${sms.receipt?.finalStatus ?: "unparsed"}`);
        } else {
            io:println(string `SMS from ${sms.sourceAddress}: ${sms.shortMessage}`);
        }
    }
}
```

### Replying with `Caller`

A `TRANSCEIVER`-bound listener can declare an `smpp:Caller` parameter (matched by type, in either parameter order) and reply on the same session:

```ballerina
service on smsListener {
    remote function onDeliverSm(smpp:Sms sms, smpp:Caller caller) returns error? {
        smpp:SubmitResult result = check caller->submit({
            destinationAddress: sms.sourceAddress,
            shortMessage: "Thanks for your message!"
        });
    }
}
```

Correlate a later delivery receipt against a submit using `sms.receiptedMessageId` (the `receipted_message_id` TLV), the only field SMPP guarantees for this; the Appendix-B receipt body's own `id` is vendor specific.

## Supporting types

The records below are what the listener hands to your service callbacks.

### Sms

| Field | Type | Description |
|-------|------|-------------|
| `sourceAddress` | <code>string</code> | Sender address |
| `destinationAddress` | <code>string</code> | Receiver address |
| `shortMessage` | <code>string</code> | The decoded message payload |
| `shortMessageBytes` | <code>byte[]</code> | The same payload as raw undecoded bytes |
| `deliveryReceipt` | <code>boolean</code> | `true` when this PDU is an SMSC delivery receipt rather than a mobile-originated message |
| `receiptedMessageId` | <code>string?</code> | The guaranteed correlation key between a delivery receipt and a submit's `messageId` |
| `receipt` | <code>DeliveryReceipt?</code> | The parsed delivery receipt, when `deliveryReceipt` is `true` and the body could be parsed |
| `properties` | <code>map&lt;anydata&gt;</code> | Raw PDU attributes for callers that need them: `dataCoding`, `esmClass`, `udhi`, and the source/destination `TypeOfNumber` and `NumberingPlanIndicator` values |

### DeliveryReceipt

| Field | Type | Description |
|-------|------|-------------|
| `id` | <code>string?</code> | The SMSC message ID quoted in the receipt text (`id:`); prefer `Sms.receiptedMessageId` for correlation |
| `submitted` | <code>int?</code> | Number of messages originally submitted (`sub:`) |
| `delivered` | <code>int?</code> | Number of messages delivered (`dlvrd:`) |
| `finalStatus` | <code>DeliveryReceiptStatus?</code> | The final delivery state (`stat:`) |
| `submitDate` | <code>string?</code> | Original submission time (`yyMMddHHmm`, no timezone) |
| `doneDate` | <code>string?</code> | Final-state time (`yyMMddHHmm`, no timezone) |
| `errorCode` | <code>string?</code> | A network/SMSC-specific error code (`err:`) |
| `text` | <code>string?</code> | A short echo of the original message (`text:`) |

Every `DeliveryReceipt` field is optional: SMSCs vary in which parts of the Appendix B receipt format they include, and a field that was not present in the receipt text is absent rather than defaulted.
