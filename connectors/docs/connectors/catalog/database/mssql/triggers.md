---
title: Triggers
---

# Triggers

The `ballerinax/mssql` connector supports event-driven integration through Debezium-based Change Data Capture (CDC). When records are inserted, updated, deleted, or read during the initial snapshot in CDC-enabled tables, the `mssql:CdcListener` receives change events in real time and invokes your service callbacks automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `mssql:CdcListener` | Connects to MSSQL via Debezium and streams change events from CDC-enabled tables. |
| `cdc:Service` | Defines the `onRead`, `onCreate`, `onUpdate`, `onDelete`, and `onError` callbacks invoked per event. |
| `MsSqlDatabaseConnection` | Configuration record for the MSSQL CDC database connection (host, port, credentials, schema and table filters). |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `mssql:CdcListener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `MsSqlDatabaseConnection` | Configures the CDC database connection including server address, credentials, schema and table filtering, and column filtering. |
| `MsSqlListenerConfiguration` | Top-level listener configuration wrapping the database connection and CDC options. |

`MsSqlDatabaseConnection` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectorClass` | <code>string</code> | `"io.debezium.connector.sqlserver.SqlServerConnector"` | The Debezium SQL Server connector class name. |
| `hostname` | <code>string</code> | `"localhost"` | Hostname of the MSSQL server. |
| `port` | <code>int</code> | `1433` | Port number of the MSSQL server. |
| `username` | <code>string</code> | Required | Database username for the CDC connection. Inherited from `cdc:DatabaseConnection`. |
| `password` | <code>string</code> | Required | Database password for the CDC connection. Inherited from `cdc:DatabaseConnection`. |
| `databaseNames` | <code>string&#124;string[]</code> | Required | Name(s) of the database(s) to capture changes from. |
| `connectTimeout` | <code>decimal?</code> | `()` | Connection timeout in seconds. Inherited from `cdc:DatabaseConnection`. |
| `secure` | <code>cdc:SecureDatabaseConnection?</code> | `()` | SSL/TLS configuration for the database connection. Inherited from `cdc:DatabaseConnection`. |
| `databaseInstance` | <code>string?</code> | `()` | Named SQL Server instance, if applicable. |
| `includedSchemas` | <code>string&#124;string[]?</code> | `()` | Schema(s) to include in CDC capture (for example, `"dbo"`). Mutually exclusive with `excludedSchemas`. |
| `excludedSchemas` | <code>string&#124;string[]?</code> | `()` | Schema(s) to exclude from CDC capture. Mutually exclusive with `includedSchemas`. |
| `includedTables` | <code>string&#124;string[]?</code> | `()` | Table identifiers in `schema.table` format, or regex patterns to capture (for example, `"dbo.Employees"`). Mutually exclusive with `excludedTables`. |
| `excludedTables` | <code>string&#124;string[]?</code> | `()` | Regex patterns of tables to exclude from capture. Mutually exclusive with `includedTables`. |
| `includedColumns` | <code>string&#124;string[]?</code> | `()` | Regex patterns of columns to capture. Mutually exclusive with `excludedColumns`. |
| `excludedColumns` | <code>string&#124;string[]?</code> | `()` | Regex patterns of columns to exclude from capture. Mutually exclusive with `includedColumns`. |
| `messageKeyColumns` | <code>cdc:MessageKeyColumns[]?</code> | `()` | Composite message-key column mappings for change events. |
| `tasksMax` | <code>int</code> | `1` | Maximum number of CDC tasks. |
| `streamingConfig` | <code>StreamingConfiguration?</code> | `()` | Streaming and status-update configuration for CDC change events. |

`MsSqlListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `database` | <code>MsSqlDatabaseConnection</code> | Required | The MSSQL CDC database connection configuration. |
| `options` | <code>MssqlOptions</code> | `{}` | MSSQL-specific CDC options such as `snapshotMode`, `skippedOperations`, snapshot fetch size, and data type handling. |
| `engineName` | <code>string</code> | `"ballerina-cdc-connector"` | Debezium engine instance name. Inherited from `cdc:ListenerConfiguration`. |
| `internalSchemaStorage` | <code>cdc:InternalSchemaStorage</code> | `{fileName: "tmp/dbhistory.dat"}` | Schema-history storage configuration (file, Kafka, JDBC, Redis, S3, Azure Blob, RocketMQ, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `offsetStorage` | <code>cdc:OffsetStorage</code> | `{fileName: "tmp/debezium-offsets.dat"}` | Offset storage configuration (file, Kafka, JDBC, Redis, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `livenessInterval` | <code>decimal</code> | `60.0` | Interval, in seconds, for checking CDC listener liveness. Inherited from `cdc:ListenerConfiguration`. |

### Initializing the listener

Basic CDC listener for a single database:

```ballerina
import ballerinax/mssql;
import ballerinax/mssql.cdc.driver as _;

configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

listener mssql:CdcListener cdcListener = new (database = {
    hostname: host,
    port: port,
    username: user,
    password: password,
    databaseNames: database,
    includedTables: ["dbo.Transactions"]
});
```

CDC listener with schema and column filters:

```ballerina
import ballerinax/cdc;
import ballerinax/mssql;
import ballerinax/mssql.cdc.driver as _;

configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

listener mssql:CdcListener cdcListener = new (
    database = {
        hostname: "db.example.com",
        port: 1433,
        username: user,
        password: password,
        databaseNames: database,
        includedSchemas: "dbo",
        includedTables: ["dbo.Transactions", "dbo.Orders"]
    },
    options = {
        snapshotMode: cdc:NO_DATA,
        skippedOperations: [cdc:TRUNCATE]
    }
);
```

---

## Service

A `cdc:Service` is a Ballerina service attached to a `mssql:CdcListener`. It listens for change events on the configured CDC-enabled tables and implements callbacks for each event type. You can type the callback parameters with your own Ballerina record types for automatic mapping.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onRead` | `remote function onRead(record {} after) returns cdc:Error?` | Invoked for each existing record during the initial CDC snapshot. |
| `onCreate` | `remote function onCreate(record {} after) returns cdc:Error?` | Invoked when a new record is inserted. |
| `onUpdate` | `remote function onUpdate(record {} before, record {} after) returns cdc:Error?` | Invoked when an existing record is updated. Receives both the before and after state. |
| `onDelete` | `remote function onDelete(record {} before) returns cdc:Error?` | Invoked when a record is deleted. Receives the record state before deletion. |
| `onError` | `remote function onError(cdc:Error err) returns cdc:Error?` | Invoked when the listener encounters an error during change-event delivery. |

Each row-level callback (`onRead`, `onCreate`, `onUpdate`, `onDelete`) accepts an optional trailing `string tableName` parameter to receive the qualified table identifier (`schema.table`) the event originated from. For example: `remote function onCreate(record {} after, string tableName) returns cdc:Error?`.

You do not need to implement all callbacks. Only implement the event types relevant to your use case.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/cdc;
import ballerinax/mssql;
import ballerinax/mssql.cdc.driver as _;

configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

type Transaction record {|
    int id;
    string customerId;
    decimal amount;
    string status;
|};

listener mssql:CdcListener cdcListener = new (
    database = {
        hostname: host,
        port: port,
        username: user,
        password: password,
        databaseNames: database,
        includedTables: ["dbo.Transactions"]
    },
    options = {
        snapshotMode: cdc:NO_DATA
    }
);

service cdc:Service on cdcListener {
    isolated remote function onCreate(Transaction after) returns cdc:Error? {
        log:printInfo("New transaction created", data = after.toString());
    }

    isolated remote function onUpdate(Transaction before, Transaction after) returns cdc:Error? {
        log:printInfo("Transaction updated",
            before = before.toString(),
            after = after.toString()
        );
    }

    isolated remote function onDelete(Transaction before) returns cdc:Error? {
        log:printInfo("Transaction deleted", data = before.toString());
    }

    isolated remote function onError(cdc:Error err) returns cdc:Error? {
        log:printError("CDC error", 'error = err);
    }
}
```

CDC must be enabled on the SQL Server database and the specific tables you want to monitor. Use `sys.sp_cdc_enable_db` and `sys.sp_cdc_enable_table` to enable CDC at the database and table level. See the [Setup Guide](setup-guide.md) for full instructions.

---

## Supporting types

### `MsSqlDatabaseConnection`

| Field | Type | Description |
|-------|------|-------------|
| `connectorClass` | <code>string</code> | Debezium SQL Server connector class (default: `"io.debezium.connector.sqlserver.SqlServerConnector"`). |
| `hostname` | <code>string</code> | Hostname of the MSSQL server (default: `"localhost"`). |
| `port` | <code>int</code> | Port number of the MSSQL server (default: `1433`). |
| `username` | <code>string</code> | Database username for the CDC connection. Required. |
| `password` | <code>string</code> | Database password for the CDC connection. Required. |
| `databaseNames` | <code>string&#124;string[]</code> | Name(s) of the database(s) to capture changes from. Required. |
| `connectTimeout` | <code>decimal?</code> | Connection timeout in seconds. |
| `secure` | <code>cdc:SecureDatabaseConnection?</code> | SSL/TLS configuration for the database connection. |
| `databaseInstance` | <code>string?</code> | Named SQL Server instance, if applicable. |
| `includedSchemas` | <code>string&#124;string[]?</code> | Schema(s) to include in CDC capture. |
| `excludedSchemas` | <code>string&#124;string[]?</code> | Schema(s) to exclude from CDC capture. |
| `includedTables` | <code>string&#124;string[]?</code> | Tables to include in CDC capture. |
| `excludedTables` | <code>string&#124;string[]?</code> | Tables to exclude from CDC capture. |
| `includedColumns` | <code>string&#124;string[]?</code> | Columns to include in CDC capture. |
| `excludedColumns` | <code>string&#124;string[]?</code> | Columns to exclude from CDC capture. |
| `messageKeyColumns` | <code>cdc:MessageKeyColumns[]?</code> | Composite message-key column mappings for change events. |
| `tasksMax` | <code>int</code> | Maximum number of CDC tasks (default: `1`). |
| `streamingConfig` | <code>StreamingConfiguration?</code> | Streaming and status-update configuration for CDC change events. |
