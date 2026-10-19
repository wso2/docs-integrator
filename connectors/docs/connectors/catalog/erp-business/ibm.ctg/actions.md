---
title: Actions
---

# Actions

The `ballerinax/ibm.ctg` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Invokes CICS programs via ECI and manages the IBM CTG gateway connection lifecycle. |

---

## Client

Invokes CICS programs via ECI and manages the IBM CTG gateway connection lifecycle.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `host` | `string` | Required | Hostname or IP address of the IBM CICS Transaction Gateway daemon. |
| `port` | `int` | Required | Port number of the IBM CTG gateway (e.g., `2006` for non-SSL, `8050` for SSL). |
| `cicsServer` | `string` | Required | The logical name of the CICS server (region) registered with the CTG gateway. |
| `auth` | `Auth` | Required | CICS user credentials record containing `userId` and `password`. |
| `socketConnectTimeout` | `int` | `15` | Timeout in seconds for establishing a socket connection to the CTG gateway daemon. |
| `secureSocket` | `SecureSocket` | `()` | SSL/TLS configuration for secure connections to the CTG gateway. Omit for non-SSL connections. |
| `enableTrace` | `boolean` | `false` | Enables application-level tracing for debugging ECI interactions. |

### Initializing the client

```ballerina
import ballerinax/ibm.ctg;

configurable string host = ?;
configurable int port = ?;
configurable string cicsServer = ?;
configurable string userId = ?;
configurable string password = ?;

ctg:Client ctgClient = check new ({
    host: host,
    port: port,
    cicsServer: cicsServer,
    auth: {
        userId: userId,
        password: password
    }
});
```

### Operations

#### ECI program execution

<details>
<summary>execute</summary>

Executes a CICS program via the ECI protocol, passing an optional COMMAREA payload and returning the response COMMAREA data as a byte array. Returns `()` (nil) if the CICS program returns no COMMAREA data.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `programName` | `string` | Yes | The name of the CICS program to invoke (up to 8 characters). |
| `commArea` | `byte[]` | No | The COMMAREA input data to pass to the CICS program. |
| `commAreaSize` | `int` | No | Explicit size of the COMMAREA buffer in bytes. If omitted, derived from the length of `commArea`. |
| `timeout` | `int` | No | ECI request timeout in seconds. Defaults to `10`. |

Returns: `byte[]|Error?`

Sample code:

```ballerina
byte[] inputPayload = "INQUIRY INPUT DATA".toBytes();
byte[]? response = check ctgClient->execute(
    programName = "HELLOCICS",
    commArea = inputPayload
);
```

Sample response:

```ballerina
[72, 101, 108, 108, 111, 32, 102, 114, 111, 109, 32, 67, 73, 67, 83, 33]
```

</details>

#### Connection management

<details>
<summary>close</summary>

Closes the IBM CTG client connection and releases all associated resources. Should be called when the client is no longer needed to ensure clean resource cleanup.

Returns: `Error?`

Sample code:

```ballerina
check ctgClient->close();
```

</details>
