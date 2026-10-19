# Actions

The `ballerinax/sap.jco` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Calls RFC-enabled function modules, sends them transactionally over tRFC, qRFC, and bgRFC, and sends IDocs to an SAP system |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

SAP ECC (JCo) client for calling RFC-enabled function modules and sending IDocs to an SAP system.

### Configuration

**`DestinationConfig`**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ashost` | <code>string</code> | Required | SAP application server host name |
| `sysnr` | <code>string</code> | Required | SAP system number |
| `jcoClient` | <code>string</code> | Required | SAP client number |
| `user` | <code>string</code> | Required | SAP logon user name |
| `passwd` | <code>string</code> | Required | SAP logon password |
| `lang` | <code>string</code> | <code>"EN"</code> | SAP logon language |
| `group` | <code>string</code> | <code>"PUBLIC"</code> | SAP logon group for load balancing |

Alternatively, pass an `AdvancedConfig` (`map<string>`) of raw JCo property key-value pairs for settings not covered by `DestinationConfig`.

### Initializing the client

```ballerina
import ballerinax/sap.jco;

jco:DestinationConfig config = {
    ashost: "sap.example.com",
    sysnr: "00",
    jcoClient: "800",
    user: "BALLERINA",
    passwd: "secret"
};
jco:Client sapClient = check new (config);
```

To supply a stable destination ID (required when a listener references this client as its repository destination):

```ballerina
jco:Client sapClient = check new (config, destinationId = "MY_DEST");
```

### Operations

#### RFC execution

<details>
<summary>execute</summary>

Calls an RFC-enabled function module on the SAP system and returns the response.

The `functionName` must be the exact ABAP function module name (for example, `STFC_CONNECTION`, `RFC_READ_TABLE`). Input is grouped into import parameters (scalar values and structures) and table parameters (named arrays of row records). The response is populated from both the SAP export parameter list and the table parameter list and can be returned either as a typed Ballerina record or as raw XML.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `functionName` | <code>string</code> | Yes | Name of the RFC function module to call (for example, `STFC_CONNECTION`) |
| `parameters` | <code>RfcParameters</code> | No | Input parameters organised by category. `importParameters` carries scalar or structure values; `tableParameters` carries named tables of row data. Defaults to an empty parameter set for parameter-free RFCs. |
| `returnType` | <code>typedesc\<RfcRecord&#124;xml\></code> | No | Expected response shape. Defaults to `RfcRecord`. |

**Returns:** `RfcRecord|xml|Error`

**Sample code — string echo (STFC_CONNECTION):**

```ballerina
type StfcConnectionOutput record {|
    string ECHOTEXT?;
    string RESPTEXT?;
|};

StfcConnectionOutput result = check sapClient->execute("STFC_CONNECTION",
        {importParameters: {"REQUTEXT": "Hello SAP"}});
```

**Sample response:**

```json
{
  "ECHOTEXT": "Hello SAP",
  "RESPTEXT": "SAP R/3 Rel. 702 Ver. 1 System ..."
}
```

**Sample code — structure and table parameters (STFC_STRUCTURE):**

```ballerina
type RfcTestStruct record {|
    float RFCFLOAT?;
    string RFCCHAR1?;
    int RFCINT1?;
|};

type StfcStructureOutput record {|
    RfcTestStruct ECHOSTRUCT?;
    string RESPTEXT?;
    RfcTestStruct[] RFCTABLE?;
|};

RfcTestStruct[] inputTable = [
    {RFCCHAR1: "A", RFCINT1: 1},
    {RFCCHAR1: "B", RFCINT1: 2}
];
StfcStructureOutput result = check sapClient->execute("STFC_STRUCTURE", {
    importParameters: {"IMPORTSTRUCT": {RFCCHAR1: "X", RFCINT1: 42, RFCFLOAT: 3.14}},
    tableParameters: {"RFCTABLE": inputTable}
});
```

**Sample response:**

```json
{
  "ECHOSTRUCT": {
    "RFCCHAR1": "X",
    "RFCINT1": 42,
    "RFCFLOAT": 3.14
  },
  "RESPTEXT": "SAP R/3 Rel. 702 ...",
  "RFCTABLE": [
    {"RFCCHAR1": "A", "RFCINT1": 1},
    {"RFCCHAR1": "B", "RFCINT1": 2},
    {"RFCCHAR1": "B", "RFCINT1": 2}
  ]
}
```

**Sample code — raw XML return:**

```ballerina
xml result = check sapClient->execute("STFC_CONNECTION", {importParameters: {"REQUTEXT": "Test"}});
```

**Sample response:**

```xml
<response>
  Test
  SAP R/3 Rel. 702 ...
</response>
```

**Sample code — table query (RFC_READ_TABLE):**

```ballerina
type DataRow record {|
    string WA;
|};

type ReadTableResponse record {|
    DataRow[] DATA?;
|};

ReadTableResponse result = check sapClient->execute("RFC_READ_TABLE", {
    importParameters: {"QUERY_TABLE": "T000", "ROWCOUNT": 5},
    tableParameters: {
        "OPTIONS": [{"TEXT": "MANDT >= '000'"}],
        "FIELDS": [{"FIELDNAME": "MANDT"}, {"FIELDNAME": "MTEXT"}]
    }
});
```

**Sample response:**

```json
{
  "DATA": [
    {"WA": "800 SAP System"},
    {"WA": "100 Test Client"}
  ]
}
```

</details>

##### Transactional delivery

Transactional protocols give a function-module call a delivery guarantee that `execute` cannot: the call is applied **exactly once**, even when the caller retries because it never learned the outcome of an earlier attempt. The guarantee is carried by an identifier — a transaction ID (TID) for tRFC and qRFC, a unit ID for bgRFC — which SAP remembers until the caller confirms it.

These calls are asynchronous on the SAP side, so export and table values the function module produces are discarded. Use `execute` when you need the result back.

<details>
<summary>sendTRfc</summary>

Calls an RFC-enabled function module as a transactional RFC (tRFC), which the SAP system executes exactly once.

By default the TID is confirmed automatically once the send succeeds, which is all a fire-and-forget call needs. To retry a failed send, set `autoConfirm` to `false`, retry under the same TID, and call `confirmTid` once an attempt finally succeeds. SAP keeps an unconfirmed TID on record, recognises a resend under it, and refuses to execute the call twice. A confirmed TID must never be reused, because the system forgets it and a resend would execute the call again.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `functionName` | <code>string</code> | Yes | Name of the RFC function module to call |
| `parameters` | <code>RfcParameters</code> | No | Input parameters organised by category. Defaults to an empty parameter set. |
| `tid` | <code>string?</code> | No | Transaction ID to use. If not provided, one is created automatically. A supplied TID must be exactly 24 characters long; the content is unrestricted, so it may be derived from an application idempotency key. |
| `autoConfirm` | <code>boolean</code> | No | Whether to confirm the TID after a successful send. Defaults to `true`. |

**Returns:** `string|Error` — the TID the call was sent under

**Sample code — fire and forget:**

```ballerina
string tid = check sapClient->sendTRfc("STFC_WRITE_TO_TCPIC", {
    tableParameters: {"TCPICDAT": [{"LINE": "Posted from Ballerina"}]}
});
```

**Sample code — retry safely under one TID:**

```ballerina
string tid = check sapClient->createTid();
foreach int attempt in 1 ... 3 {
    string|jco:Error sent = sapClient->sendTRfc("STFC_WRITE_TO_TCPIC", {
        tableParameters: {"TCPICDAT": [{"LINE": "Posted from Ballerina"}]}
    }, tid, autoConfirm = false);
    if sent is string {
        check sapClient->confirmTid(tid);
        break;
    }
}
```

</details>

<details>
<summary>sendQRfc</summary>

Calls an RFC-enabled function module as a queued RFC (qRFC). Calls placed on the same inbound queue are executed exactly once and in the order they were sent, which is what an interface needs when later updates must not overtake earlier ones.

Entries remain in the queue until the inbound queue is registered with the QIN scheduler (transaction `SMQR`). Placing calls on the queue in order is the connector's responsibility; draining the queue is a backend configuration matter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `functionName` | <code>string</code> | Yes | Name of the RFC function module to call |
| `queueName` | <code>string</code> | Yes | SAP inbound queue that serialises the calls |
| `parameters` | <code>RfcParameters</code> | No | Input parameters organised by category |
| `tid` | <code>string?</code> | No | Transaction ID to use. If not provided, one is created automatically. Must be exactly 24 characters long. |
| `autoConfirm` | <code>boolean</code> | No | Whether to confirm the TID after a successful send. Defaults to `true`. |

**Returns:** `string|Error` — the TID the call was sent under

**Sample code:**

```ballerina
foreach int sequence in 1 ... 3 {
    _ = check sapClient->sendQRfc("STFC_WRITE_TO_TCPIC", "PRICE_MAT1000", {
        tableParameters: {"TCPICDAT": [{"LINE": string `correction ${sequence}`}]}
    });
}
```

</details>

<details>
<summary>sendBgRfcUnit</summary>

Commits one or more function calls to the SAP system as a single bgRFC unit of work. The calls are applied together or not at all, which is what keeps a posting and its audit entry from diverging.

Supplying `queueNames` makes the unit type `Q`, executed in order within those queues; otherwise it is type `T`. Supplying a `unitId` derived from a business key makes a repeated submission idempotent: SAP recognises the unit and executes it only once.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `functionCalls` | <code>FunctionCall[]</code> | Yes | The calls that make up the unit. Each has a `functionName` and `parameters`. |
| `unitConfig` | <code>BgRfcUnitConfig</code> | No | Unit configuration. Fields: `unitId` (32-character hexadecimal), `queueNames`, `lock`, `unitHistory`, `kernelTrace`, `commitCheck`, `programName`, `transactionCode`. |

**Returns:** `BgRfcUnitInfo|Error` — the `unitId` and `unitType` of the committed unit

**Sample code — two calls in one unit of work:**

```ballerina
jco:BgRfcUnitInfo unit = check sapClient->sendBgRfcUnit([
    {
        functionName: "STFC_WRITE_TO_TCPIC",
        parameters: {tableParameters: {"TCPICDAT": [{"LINE": "posting"}]}}
    },
    {
        functionName: "STFC_WRITE_TO_TCPIC",
        parameters: {tableParameters: {"TCPICDAT": [{"LINE": "audit entry"}]}}
    }
], {unitHistory: true, programName: "FI_CLOSE"});
```

**Sample response:**

```json
{
  "unitId": "B6F57175091E1FE1A6DE2FF27CEEC57C",
  "unitType": "T"
}
```

**Sample code — queued unit:**

```ballerina
jco:BgRfcUnitInfo unit = check sapClient->sendBgRfcUnit(
        [{functionName: "STFC_WRITE_TO_TCPIC",
          parameters: {tableParameters: {"TCPICDAT": [{"LINE": "customer 4711"}]}}}],
        {queueNames: ["CUSTOMER_4711"], unitHistory: true});
```

</details>

<details>
<summary>getBgRfcUnitState</summary>

Reads the processing state of a bgRFC unit from the SAP system.

`COMMITTED` means processing finished and the unit is ready to be confirmed. `CONFIRMED` occurs only after `confirmBgRfcUnit` is called, so polling for `CONFIRMED` before confirming would never return.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unit` | <code>BgRfcUnitInfo</code> | Yes | The unit returned by `sendBgRfcUnit` |

**Returns:** `BgRfcUnitState|Error` — one of `NOT_FOUND`, `IN_PROCESS`, `COMMITTED`, `CONFIRMED`, `ROLLED_BACK`

**Sample code:**

```ballerina
jco:BgRfcUnitState state = check sapClient->getBgRfcUnitState(unit);
```

</details>

<details>
<summary>confirmBgRfcUnit</summary>

Confirms a bgRFC unit so that the SAP system can delete its status record. Confirm once `getBgRfcUnitState` reports `COMMITTED`. A confirmed unit ID must not be reused.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unit` | <code>BgRfcUnitInfo</code> | Yes | The unit returned by `sendBgRfcUnit` |

**Returns:** `Error?`

**Sample code:**

```ballerina
if state is jco:COMMITTED {
    check sapClient->confirmBgRfcUnit(unit);
}
```

</details>

<details>
<summary>createTid</summary>

Creates a transaction ID (TID) on the SAP system for use with `sendTRfc` or `sendQRfc`. Obtain the TID before the first send so that every retry can reuse it.

**Parameters:**

No parameters

**Returns:** `string|Error`

**Sample code:**

```ballerina
string tid = check sapClient->createTid();
```

</details>

<details>
<summary>confirmTid</summary>

Confirms a transaction ID so that the SAP system can discard its record of it. Confirm only after the call has been delivered.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tid` | <code>string</code> | Yes | The TID to confirm. Must be exactly 24 characters long. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check sapClient->confirmTid(tid);
```

</details>

#### IDoc sending

<details>
<summary>sendIDoc</summary>

Sends an IDoc to the SAP system over tRFC or qRFC, including TID creation and confirmation.

The IDoc must be provided as XML following the SAP IDoc XML structure (root element is the IDoc type name, containing an `IDOC` element with `EDI_DC40` control record and data segments). The `iDocType` parameter selects the transport protocol — use `VERSION_3_IN_QUEUE` or `VERSION_3_IN_QUEUE_VIA_QRFC` for queue-based qRFC delivery, which also requires a `queueName`. A `queueName` supplied for a tRFC version is accepted but ignored with a warning. If no `tid` is provided, a new TID is created automatically via the JCo destination; supply your own TID for end-to-end idempotency.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `iDoc` | <code>xml</code> | Yes | IDoc payload in XML format |
| `iDocType` | <code>IDocType</code> | No | IDoc protocol version. One of `DEFAULT` (`"0"`), `VERSION_2` (`"2"`), `VERSION_3` (`"3"`), `VERSION_3_IN_QUEUE` (`"Q"`), `VERSION_3_IN_QUEUE_VIA_QRFC` (`"I"`). Defaults to `DEFAULT`. |
| `tid` | <code>string?</code> | No | Optional Transaction ID. If not provided, a new TID is created via the JCo destination. |
| `queueName` | <code>string?</code> | No | Required for qRFC versions (`VERSION_3_IN_QUEUE` or `VERSION_3_IN_QUEUE_VIA_QRFC`). Ignored with a warning for tRFC versions. |

**Returns:** `Error?`

**Sample code — default tRFC send:**

```ballerina
xml iDoc = xml `
    <IDOC BEGIN="1">
        <EDI_DC40 SEGMENT="1">
            EDI_DC40
            800
            0000000000000001
            DELVRY03
            DESADV
            SAPR3
            LS
            BALLERINA
            SAPR3
            LS
            RECIPIENT_SAP
        </EDI_DC40>
        <E1EDL20 SEGMENT="1">
            TEST001
            100
            KGM
            FOB


`;

check sapClient->sendIDoc(iDoc);
```

**Sample code — qRFC with automatic TID:**

```ballerina
check sapClient->sendIDoc(iDoc, jco:VERSION_3_IN_QUEUE, queueName = "TEST_QUEUE");
```

**Sample code — tRFC with custom TID for idempotency:**

```ballerina
check sapClient->sendIDoc(iDoc, jco:VERSION_3, tid = "A1B2C3D4E5F6789012345678");
```

</details>

#### Connection lifecycle

<details>
<summary>close</summary>

Releases the JCo destination registered for this client. Call this when the client is no longer needed to free the destination ID for reuse. Calling this more than once is safe; the client is marked closed regardless of whether the release succeeds.

**Parameters:**

No parameters

**Returns:** `Error?`

**Sample code:**

```ballerina
check sapClient.close();
```

</details>
