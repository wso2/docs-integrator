---
title: Triggers
---

# Triggers

The `ballerinax/mysql` connector supports event-driven integration through Change Data Capture (CDC) powered by Debezium. When rows are inserted, updated, deleted, or read during the initial snapshot in monitored MySQL tables, the `mysql:CdcListener` receives change events in real time and invokes your service callbacks automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `mysql:CdcListener` | Connects to MySQL binary log via Debezium and streams row-level change events to attached services. |
| `cdc:Service` | Defines the `onRead`, `onCreate`, `onUpdate`, and `onDelete` callbacks invoked per change event. |
| `MySqlDatabaseConnection` | Configuration record for the MySQL CDC database connection (host, port, credentials, database/table filters). |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `mysql:CdcListener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `MySqlDatabaseConnection` | Configures the CDC database connection including server address, credentials, and table filtering. |
| `MySqlListenerConfiguration` | Top-level listener configuration wrapping the database connection and CDC options. |

`MySqlDatabaseConnection` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectorClass` | `string` | `"io.debezium.connector.mysql.MySqlConnector"` | The Debezium MySQL connector class name. |
| `hostname` | `string` | `"localhost"` | The hostname of the MySQL server. |
| `port` | `int` | `3306` | The port number of the MySQL server. |
| `username` | `string` | Required | MySQL username with replication privileges. |
| `password` | `string` | Required | MySQL password for the specified user. |
| `connectTimeout` | `decimal?` | `()` | Connection timeout in seconds. Inherited from `cdc:DatabaseConnection`. |
| `secure` | `cdc:SecureDatabaseConnection?` | `()` | SSL/TLS configuration for the database connection. Inherited from `cdc:DatabaseConnection`. |
| `databaseServerId` | `string` | auto-generated random integer (as a string) | Unique identifier for this MySQL server instance in the replication topology. |
| `includedDatabases` | `string\|string[]?` | `()` | Regex patterns of databases to capture changes from. Do not use alongside `excludedDatabases`. |
| `excludedDatabases` | `string\|string[]?` | `()` | Regex patterns of databases to exclude from capture. Do not use alongside `includedDatabases`. |
| `includedTables` | `string\|string[]?` | `()` | Fully-qualified table names or regex patterns to capture (e.g., `"mydb.orders"`). Mutually exclusive with `excludedTables`. |
| `excludedTables` | `string\|string[]?` | `()` | Regex patterns of tables to exclude. Mutually exclusive with `includedTables`. |
| `includedColumns` | `string\|string[]?` | `()` | Regex patterns of columns to capture. Mutually exclusive with `excludedColumns`. |
| `excludedColumns` | `string\|string[]?` | `()` | Regex patterns of columns to exclude. Mutually exclusive with `includedColumns`. |
| `messageKeyColumns` | `cdc:MessageKeyColumns[]?` | `()` | Composite message key columns for change events. |
| `tasksMax` | `int` | `1` | Maximum number of tasks for the connector. The MySQL connector always uses a single task, so changing this has no effect. |
| `replicationConfig` | `ReplicationConfiguration?` | `()` | MySQL GTID-based replication configuration (`gtidSourceIncludes`/`gtidSourceExcludes`). |
| `binlogConfig` | `BinlogConfiguration?` | `()` | MySQL binlog configuration (e.g., `bufferSize`). |

`MySqlListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `database` | `MySqlDatabaseConnection` | Required | The MySQL CDC database connection configuration. |
| `options` | `MySqlOptions` | `{}` | Advanced CDC options including `snapshotMode`, `skippedOperations`, MySQL-specific extended snapshot, data type handling, and heartbeat configs. |
| `engineName` | `string` | `"ballerina-cdc-connector"` | Debezium engine instance name. Inherited from `cdc:ListenerConfiguration`. |
| `internalSchemaStorage` | `cdc:InternalSchemaStorage` | `{fileName: "tmp/dbhistory.dat"}` | Schema-history storage configuration (file, Kafka, JDBC, Redis, S3, Azure Blob, RocketMQ, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `offsetStorage` | `cdc:OffsetStorage` | `{fileName: "tmp/debezium-offsets.dat"}` | Offset storage configuration (file, Kafka, JDBC, Redis, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `livenessInterval` | `decimal` | `60.0` | Interval in seconds for checking CDC listener liveness. Inherited from `cdc:ListenerConfiguration`. |

### Initializing the listener

**Basic CDC listener with default settings:**

```ballerina
import ballerinax/mysql;
import ballerinax/mysql.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;

listener mysql:CdcListener cdcListener = new (database = {
    username: username,
    password: password
});
```

**CDC listener with database and table filters:**

```ballerina
import ballerinax/cdc;
import ballerinax/mysql;
import ballerinax/mysql.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;

listener mysql:CdcListener cdcListener = new (
    database = {
        username: username,
        password: password,
        includedDatabases: "mydb",
        includedTables: "mydb.orders"
    },
    options = {
        snapshotMode: cdc:NO_DATA,
        skippedOperations: [cdc:TRUNCATE]
    }
);
```

---

## Service

A `cdc:Service` is a Ballerina service attached to a `mysql:CdcListener`. It listens for row-level change events on monitored MySQL tables and implements callbacks for each event type. You can type the callback parameters with your own Ballerina record types for automatic mapping.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onRead` | `remote function onRead(record {} after) returns cdc:Error?` | Invoked during the initial snapshot for each existing row read from the database. |
| `onCreate` | `remote function onCreate(record {} after) returns cdc:Error?` | Invoked when a new row is inserted into a monitored table. |
| `onUpdate` | `remote function onUpdate(record {} before, record {} after) returns cdc:Error?` | Invoked when a row is updated, providing both the before and after state. |
| `onDelete` | `remote function onDelete(record {} before) returns cdc:Error?` | Invoked when a row is deleted, providing the row state before deletion. |
| `onError` | `remote function onError(cdc:Error err) returns cdc:Error?` | Invoked when the listener encounters an error during change-event delivery (e.g., deserialization failures or connector errors). |

You do not need to implement all of these callbacks. Only implement the event types relevant to your use case.

### Full usage example

```ballerina
import ballerina/io;
import ballerina/log;
import ballerinax/cdc;
import ballerinax/mysql;
import ballerinax/mysql.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;

type Order record {|
    int order_id;
    int customer_id;
    decimal amount;
    string status;
|};

listener mysql:CdcListener cdcListener = new (
    database = {
        username: username,
        password: password,
        includedDatabases: "shop",
        includedTables: "shop.orders"
    },
    options = {
        snapshotMode: cdc:NO_DATA
    }
);

service cdc:Service on cdcListener {
    isolated remote function onRead(Order after) returns cdc:Error? {
        log:printInfo("Snapshot row", order = after.toString());
    }

    isolated remote function onCreate(Order after) returns cdc:Error? {
        log:printInfo("New order created",
            orderId = after.order_id,
            amount = after.amount
        );
    }

    isolated remote function onUpdate(Order before, Order after) returns cdc:Error? {
        log:printInfo("Order updated",
            orderId = after.order_id,
            oldStatus = before.status,
            newStatus = after.status
        );
    }

    isolated remote function onDelete(Order before) returns cdc:Error? {
        log:printInfo("Order deleted", orderId = before.order_id);
    }
}
```

For CDC to work, MySQL must have binary logging enabled with `binlog-format=ROW`. Additionally, import the `ballerinax/mysql.cdc.driver as _` module to bundle the required Debezium drivers.

---

## Supporting types

For the `MySqlDatabaseConnection` field reference, see the [Listener > Configuration](#configuration) section above.

### `MySqlOptions`

CDC options for the listener. Extends `cdc:Options` with MySQL-specific fields.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `snapshotMode` | `cdc:SnapshotMode` | `INITIAL` | Initial snapshot behavior (`INITIAL`, `ALWAYS`, `NO_DATA`, `WHEN_NEEDED`, `SCHEMA_ONLY`, `RECOVERY`, etc.). |
| `eventProcessingFailureHandlingMode` | `cdc:EventProcessingFailureHandlingMode` | `WARN` | How to handle event-processing failures (`FAIL`, `WARN`, `SKIP`). |
| `skippedOperations` | `cdc:Operation[]` | `[TRUNCATE]` | Operations to skip publishing. |
| `skipMessagesWithoutChange` | `boolean` | `false` | Discard events that contain no row-data changes. |
| `decimalHandlingMode` | `cdc:DecimalHandlingMode` | `DOUBLE` | Representation mode for decimal values. |
| `maxQueueSize` | `int` | `8192` | Maximum number of events in the internal queue. |
| `maxBatchSize` | `int` | `2048` | Maximum number of events per processing batch. |
| `queryTimeout` | `decimal` | `60.0` | Database query timeout in seconds. |
| `heartbeatConfig` | `cdc:RelationalHeartbeatConfiguration?` | `()` | Heartbeat for keeping the MySQL replication connection alive. |
| `signalConfig` | `cdc:SignalConfiguration?` | `()` | Signal-channel configuration for ad-hoc control. |
| `transactionMetadataConfig` | `cdc:TransactionMetadataConfiguration?` | `()` | Transaction-boundary event configuration. |
| `columnTransformConfig` | `cdc:ColumnTransformConfiguration?` | `()` | Column masking/transformation configuration. |
| `topicConfig` | `cdc:TopicConfiguration?` | `()` | Topic naming and routing configuration. |
| `connectionRetryConfig` | `cdc:ConnectionRetryConfiguration?` | `()` | Error handling and retry configuration. |
| `performanceConfig` | `cdc:PerformanceConfiguration?` | `()` | Performance-tuning configuration. |
| `extendedSnapshot` | `ExtendedSnapshotConfiguration?` | `()` | MySQL extended snapshot configuration (e.g., `lockTimeout`). Narrows the parent `cdc:Options.extendedSnapshot`. |
| `dataTypeConfig` | `DataTypeConfiguration?` | `()` | MySQL-specific type handling: `bigIntUnsignedHandlingMode`, `enableTimeAdjuster`, `includeSchemaChanges`. |

### `cdc:SecureDatabaseConnection`

SSL/TLS configuration for the CDC database connection. Set on `MySqlDatabaseConnection.secure`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sslMode` | `cdc:SslMode` | `PREFERRED` | Connection security level (`DISABLED`, `PREFERRED`, `REQUIRED`, `VERIFY_CA`, `VERIFY_IDENTITY`). |
| `keyStore` | `crypto:KeyStore?` | `()` | Client keystore for mutual TLS authentication. |
| `trustStore` | `crypto:TrustStore?` | `()` | Truststore for verifying the server certificate. |

### `ReplicationConfiguration`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `gtidSourceIncludes` | `string\|string[]?` | `()` | Comma-separated list of GTID source UUIDs to include. |
| `gtidSourceExcludes` | `string\|string[]?` | `()` | Comma-separated list of GTID source UUIDs to exclude. |

### `BinlogConfiguration`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bufferSize` | `int` | `8192` | Size of the binlog buffer in bytes. |
