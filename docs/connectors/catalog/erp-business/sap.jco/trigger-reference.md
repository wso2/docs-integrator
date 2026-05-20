# Triggers

The SAP JCo connector supports event-driven integration where the SAP system pushes IDocs or invokes RFC function modules on a registered Ballerina service. Two distinct service types handle these two event categories.

Three components work together:

| Component | Role |
|-----------|------|
| `sap.jco:Listener` | Registers as a JCo server with the SAP gateway and manages connections |
| `sap.jco:IDocService` | Handles inbound IDocs pushed from SAP |
| `sap.jco:RfcService` | Handles inbound RFC calls invoked by SAP |

For action-based operations, see the [Action Reference](action-reference.md).

---

## Listener

The `sap.jco:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `ServerConfig` | Structured configuration with gateway host, service, program ID, and repository destination |
| `AdvancedConfig` | Raw JCo property key-value pairs for advanced or non-standard settings |

**`ServerConfig` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `gwhost` | <code>string</code> | Required | SAP gateway host to register the server with |
| `gwserv` | <code>string</code> | Required | SAP gateway service name or port |
| `progid` | <code>string</code> | Required | Program ID registered in the SAP system via transaction SM59 |
| `connectionCount` | <code>int</code> | <code>2</code> | Maximum number of concurrent RFC connections |
| `repositoryDestination` | <code>string&#124;DestinationConfig</code> | Required | RFC destination used to look up IDoc and RFC metadata. Provide the ID of an already-initialised client or SAP credentials to register an internal destination automatically |

**`AdvancedConfig`:**

A <code>map&lt;string&gt;</code> of raw JCo property key-value pairs (e.g., `"jco.server.gwhost"`, `"jco.server.progid"`).

### Initializing the listener

**Using ServerConfig with inline credentials:**

```ballerina
import ballerinax/sap.jco;

configurable jco:ServerConfig sapConfig = ?;

listener jco:Listener sapListener = new (sapConfig);
```

**Using a shared client as the repository destination:**

```ballerina
import ballerinax/sap.jco;

configurable jco:DestinationConfig clientConfig = ?;
configurable jco:ServerConfig sapConfig = ?;

final jco:Client jcoClient = check new (clientConfig);
listener jco:Listener sapListener = new (sapConfig);
```

When `repositoryDestination` is a `string`, it must match the `destinationId` of an already-initialised `Client`. When it is a `DestinationConfig`, the listener registers an internal JCo destination automatically.

---

## Service

The connector provides two distinct service types: `IDocService` for receiving IDocs and `RfcService` for handling inbound RFC calls. At most one of each kind may be attached to a listener simultaneously.

### Callbacks

**IDocService callbacks:**

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onReceive` | <code>remote function onReceive(xml iDoc) returns error?</code> | Invoked when an IDoc is received from the SAP system |
| `onError` | <code>remote function onError(error err) returns error?</code> | Invoked when a framework-level error occurs (gateway errors, parsing failures) |

**RfcService callbacks:**

| Callback | Signature | Description |
|----------|-----------|-------------|
| `onCall` | <code>remote function onCall(string functionName, jco:RfcParameters parameters) returns jco:RfcRecord&#124;xml&#124;error?</code> | Invoked synchronously when SAP calls a function module registered on this server |
| `onError` | <code>remote function onError(error err) returns error?</code> | Invoked when a framework-level error occurs (gateway errors, serialization failures) |

IDoc delivery is fire-and-forget — errors raised by `onReceive` are logged but not propagated back to SAP. For `RfcService`, errors returned from `onCall` surface as ABAP exceptions on the SAP caller side.

### Full example — IDoc listener

```ballerina
import ballerina/io;
import ballerina/data.xmldata;
import ballerinax/sap.jco;

configurable jco:ServerConfig sapConfig = ?;

listener jco:Listener idocListener = new (sapConfig);

service jco:IDocService on idocListener {
    remote function onReceive(xml iDoc) returns error? {
        ORDERS05 iDocRecord = check xmldata:parseAsType(iDoc);
        InternalOrder internalOrder = transform(iDocRecord);
        check processOrder(internalOrder);
    }

    remote function onError(error 'error) returns error? {
        io:println("Error processing iDoc: ", 'error.message());
    }
}
```

### Full example — RFC service

```ballerina
import ballerina/io;
import ballerinax/sap.jco;

configurable jco:DestinationConfig clientConfig = ?;
configurable jco:ServerConfig sapConfig = ?;

final jco:Client jcoClient = check new (clientConfig);
listener jco:Listener creditCheckListener = new (sapConfig);

service jco:RfcService on creditCheckListener {
    remote function onCall(string functionName, jco:RfcParameters parameters) returns jco:RfcRecord|error {
        if functionName != "Z_CHECK_CUSTOMER_CREDIT" {
            return error("Unsupported function module: " + functionName);
        }
        jco:RfcRecord importParams = parameters.importParameters ?: {};
        string customerId = (importParams["CUSTOMER_ID"] ?: "").toString();
        return {
            "CREDIT_STATUS": "A",
            "CREDIT_SCORE": 750,
            "MESSAGE": "Credit approved for customer " + customerId
        };
    }

    remote function onError(error err) returns error? {
        io:println("SAP gateway error: ", err.message());
    }
}
```

The listener starts asynchronously — a successful `start()` means the server has been submitted to JCo's scheduler, not that the gateway handshake is complete. If the gateway is unreachable, JCo retries automatically and delivers failures through the `onError` callback.

## Supporting types

### DestinationConfig

| Field | Type | Description |
|-------|------|-------------|
| `ashost` | <code>string</code> | SAP application server host name |
| `sysnr` | <code>string</code> | SAP system number |
| `jcoClient` | <code>string</code> | SAP client number |
| `user` | <code>string</code> | SAP logon user name |
| `passwd` | <code>string</code> | SAP logon password |
| `lang` | <code>string</code> | SAP logon language (default: `"EN"`) |
| `group` | <code>string</code> | SAP logon group for load balancing (default: `"PUBLIC"`) |

### RfcParameters

| Field | Type | Description |
|-------|------|-------------|
| `importParameters` | <code>RfcRecord?</code> | Scalar values and structures sent to SAP as import parameters |
| `tableParameters` | <code>map&lt;RfcRecord[]&gt;?</code> | Named tables sent to SAP as table parameters |

### RfcRecord

An open record of type <code>record &#123;&#124;FieldType?...;&#124;&#125;</code> representing scalar values, structures, or table row data. Field values can be <code>string</code>, <code>int</code>, <code>float</code>, <code>decimal</code>, <code>boolean</code>, <code>time:Date</code>, <code>time:TimeOfDay</code>, <code>byte[]</code>, nested records, or record arrays.
