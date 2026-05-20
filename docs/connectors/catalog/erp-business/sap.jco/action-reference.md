# Actions

The `ballerinax/sap.jco` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Calls RFC-enabled function modules and sends IDocs to an SAP system |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Client

SAP JCo client for calling RFC-enabled function modules and sending IDocs to an SAP system.

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
