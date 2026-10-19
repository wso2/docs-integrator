---
title: Triggers
---

# Triggers

The `ballerinax/postgresql` connector supports event-driven integration through Change Data Capture (CDC) powered by Debezium. When rows are inserted, updated, deleted, or read during the initial snapshot in monitored PostgreSQL tables, the `postgresql:CdcListener` receives change events in real time and invokes your service callbacks automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `postgresql:CdcListener` | Connects to PostgreSQL's logical replication stream through Debezium and streams row-level change events to attached services. |
| `cdc:Service` | Defines the `onRead`, `onCreate`, `onUpdate`, and `onDelete` callbacks invoked per change event. |
| `PostgresDatabaseConnection` | Configuration record for the PostgreSQL CDC database connection (host, port, credentials, schema/table filters, logical decoding plugin). |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `postgresql:CdcListener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `PostgresDatabaseConnection` | Configures the CDC database connection including server address, credentials, and schema or table filtering. |
| `PostgresListenerConfiguration` | Top-level listener configuration wrapping the database connection and CDC options. |

`PostgresDatabaseConnection` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectorClass` | <code>string</code> | `"io.debezium.connector.postgresql.PostgresConnector"` | The Debezium PostgreSQL connector class name. |
| `hostname` | <code>string</code> | `"localhost"` | The hostname of the PostgreSQL server. |
| `port` | <code>int</code> | `5432` | The port number of the PostgreSQL server. |
| `username` | <code>string</code> | Required | PostgreSQL username with the `REPLICATION` privilege. Inherited from `cdc:DatabaseConnection`. |
| `password` | <code>string</code> | Required | PostgreSQL password for the specified user. Inherited from `cdc:DatabaseConnection`. |
| `databaseName` | <code>string</code> | Required | Name of the database to capture changes from. |
| `connectTimeout` | <code>decimal?</code> | `()` | Connection timeout in seconds. Inherited from `cdc:DatabaseConnection`. |
| `secure` | <code>cdc:SecureDatabaseConnection?</code> | `()` | SSL/TLS configuration for the database connection. Inherited from `cdc:DatabaseConnection`. |
| `includedSchemas` | <code>string&#124;string[]?</code> | `()` | Regex patterns of schemas to include in capture. Mutually exclusive with `excludedSchemas`. |
| `excludedSchemas` | <code>string&#124;string[]?</code> | `()` | Regex patterns of schemas to exclude from capture. Mutually exclusive with `includedSchemas`. |
| `includedTables` | <code>string&#124;string[]?</code> | `()` | Fully-qualified table names or regex patterns to capture (for example, `"public.customers"`). Mutually exclusive with `excludedTables`. |
| `excludedTables` | <code>string&#124;string[]?</code> | `()` | Regex patterns of tables to exclude. Mutually exclusive with `includedTables`. |
| `includedColumns` | <code>string&#124;string[]?</code> | `()` | Regex patterns of columns to capture. Mutually exclusive with `excludedColumns`. |
| `excludedColumns` | <code>string&#124;string[]?</code> | `()` | Regex patterns of columns to exclude. Mutually exclusive with `includedColumns`. |
| `messageKeyColumns` | <code>cdc:MessageKeyColumns[]?</code> | `()` | Composite message-key column mappings for change events. |
| `tasksMax` | <code>int</code> | `1` | Maximum number of tasks. The PostgreSQL connector always uses a single task, so changing this has no effect. |
| `pluginName` | <code>PostgreSQLLogicalDecodingPlugin</code> | `PGOUTPUT` | Logical decoding plugin to use (`PGOUTPUT` or `DECODERBUFS`). **Deprecated**: use `replicationConfig.pluginName` instead. |
| `slotName` | <code>string</code> | `"debezium"` | Name of the logical replication slot. **Deprecated**: use `replicationConfig.slotName` instead. |
| `publicationName` | <code>string</code> | `"dbz_publication"` | Name of the PostgreSQL publication for the `PGOUTPUT` plugin. **Deprecated**: use `publicationConfig.publicationName` instead. |
| `replicationConfig` | <code>ReplicationConfiguration?</code> | `()` | Logical decoding plugin, slot name, and slot parameters. Takes priority over the deprecated top-level fields. |
| `publicationConfig` | <code>PublicationConfiguration?</code> | `()` | Publication name and autocreate mode. Takes priority over the deprecated top-level `publicationName`. |
| `streamingConfig` | <code>StreamingConfiguration?</code> | `()` | Streaming and status-update configuration (status update interval, xmin fetch interval, LSN flush mode). |

`PostgresListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `database` | <code>PostgresDatabaseConnection</code> | Required | The PostgreSQL CDC database connection configuration. |
| `engineName` | <code>string</code> | `"ballerina-cdc-connector"` | Debezium engine instance name. Inherited from `cdc:ListenerConfiguration`. |
| `internalSchemaStorage` | <code>cdc:InternalSchemaStorage</code> | `{fileName: "tmp/dbhistory.dat"}` | Schema-history storage configuration (file, Kafka, JDBC, Redis, S3, Azure Blob, RocketMQ, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `offsetStorage` | <code>cdc:OffsetStorage</code> | `{fileName: "tmp/debezium-offsets.dat"}` | Offset storage configuration (file, Kafka, JDBC, Redis, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `livenessInterval` | <code>decimal</code> | `60.0` | Interval, in seconds, for checking CDC listener liveness. Inherited from `cdc:ListenerConfiguration`. |
| `options` | <code>PostgreSqlOptions</code> | `{}` | PostgreSQL-specific CDC options including `snapshotMode`, `skippedOperations`, extended snapshot, data type handling, and heartbeat configs. |

### Initializing the listener

**Basic CDC listener with default settings:**

```ballerina
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

listener postgresql:CdcListener cdcListener = new (database = {
    username: username,
    password: password,
    databaseName: database
});
```

**CDC listener with schema and table filters:**

```ballerina
import ballerinax/cdc;
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

listener postgresql:CdcListener cdcListener = new (
    database = {
        username: username,
        password: password,
        databaseName: database,
        hostname: "db.example.com",
        port: 5432,
        includedSchemas: "public",
        includedTables: ["public.customers", "public.orders"],
        pluginName: postgresql:PGOUTPUT,
        slotName: "my_slot"
    },
    options = {
        snapshotMode: cdc:NO_DATA,
        skippedOperations: [cdc:TRUNCATE]
    }
);
```

---

## Service

A `cdc:Service` is a Ballerina service attached to a `postgresql:CdcListener`. It listens for row-level change events on monitored PostgreSQL tables and implements callbacks for each event type. You can type the callback parameters with your own Ballerina record types for automatic mapping.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onRead` | `remote function onRead(record {} after) returns cdc:Error?` | Invoked during the initial snapshot for each existing row read from the database. |
| `onCreate` | `remote function onCreate(record {} after) returns cdc:Error?` | Invoked when a new row is inserted into a monitored table. |
| `onUpdate` | `remote function onUpdate(record {} before, record {} after) returns cdc:Error?` | Invoked when a row is updated, providing both the before and after state. |
| `onDelete` | `remote function onDelete(record {} before) returns cdc:Error?` | Invoked when a row is deleted, providing the row state before deletion. |

You do not need to implement all of these callbacks. Only implement the event types relevant to your use case.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/cdc;
import ballerinax/postgresql;
import ballerinax/postgresql.driver as _;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

type Order record {|
    int order_id;
    int customer_id;
    decimal amount;
    string status;
|};

listener postgresql:CdcListener cdcListener = new (
    database = {
        username: username,
        password: password,
        databaseName: database,
        includedSchemas: "public",
        includedTables: "public.orders"
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

For CDC to work, PostgreSQL must be configured with `wal_level = logical`, and the connecting user must have the `REPLICATION` privilege. The `pgoutput` plugin is included by default in PostgreSQL 10 and later.

---

## Supporting types

For the `PostgresDatabaseConnection` field reference, see the [Listener > Configuration](#configuration) section above.

### `PostgreSQLLogicalDecodingPlugin`

Logical decoding plugin used by Debezium to read PostgreSQL's WAL.

| Constant | Value | Description |
|----------|-------|-------------|
| `PGOUTPUT` | `"pgoutput"` | Standard PostgreSQL logical decoding plugin. Included by default in PostgreSQL 10 and later. |
| `DECODERBUFS` | `"decoderbufs"` | Protobuf-based logical decoding plugin from the Debezium community. Must be installed separately. |

### `ReplicationConfiguration`

Replaces the deprecated top-level `pluginName` and `slotName` fields on `PostgresDatabaseConnection`. When set, takes priority over those fields.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pluginName` | <code>PostgreSQLLogicalDecodingPlugin</code> | `PGOUTPUT` | Logical decoding plugin to use. |
| `slotName` | <code>string</code> | `"debezium"` | Name of the PostgreSQL logical replication slot. |
| `slotDropOnStop` | <code>boolean</code> | `false` | Drop the replication slot when the connector stops. |
| `slotStreamParams` | <code>string?</code> | `()` | Custom replication slot stream parameters. |

### `PublicationConfiguration`

Replaces the deprecated top-level `publicationName` field on `PostgresDatabaseConnection`. When set, takes priority over that field. Applies when using the `PGOUTPUT` plugin.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `publicationName` | <code>string</code> | `"dbz_publication"` | Name of the PostgreSQL publication used for streaming changes. |
| `publicationAutocreateMode` | <code>PublicationAutocreateMode</code> | `ALL_TABLES` | Whether and how Debezium auto-creates the publication. |

### `StreamingConfiguration`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `statusUpdateInterval` | <code>decimal</code> | `10` | Interval, in seconds, for sending status updates to PostgreSQL. |
| `xminFetchInterval` | <code>decimal</code> | `0` | Interval, in seconds, for fetching the current `xmin` position. `0` disables periodic fetching. |
| `lsnFlushMode` | <code>LsnFlushMode?</code> | `()` | LSN flushing strategy. |

### `PublicationAutocreateMode`

| Constant | Value | Description |
|----------|-------|-------------|
| `ALL_TABLES` | `"all_tables"` | Auto-create a publication for all tables. |
| `DISABLED` | `"disabled"` | Do not auto-create publications. Requires manual setup in PostgreSQL. |
| `FILTERED` | `"filtered"` | Auto-create a publication restricted to the tables in the include/exclude filters. |

### `LsnFlushMode`

| Constant | Value | Description |
|----------|-------|-------------|
| `MANUAL` | `"manual"` | The user controls when LSN positions are flushed. |
| `CONNECTOR` | `"connector"` | The connector flushes LSN positions periodically. |
| `CONNECTOR_AND_DRIVER` | `"connector_and_driver"` | Both the connector and the JDBC driver flush LSN positions. |

### `PostgreSqlOptions`

PostgreSQL-specific CDC options. Set on `PostgresListenerConfiguration.options`. Includes all fields of `cdc:Options` plus PostgreSQL-specific configuration.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `snapshotMode` | <code>cdc:SnapshotMode</code> | `INITIAL` | Initial snapshot behavior. Values: `ALWAYS`, `INITIAL`, `INITIAL_ONLY`, `SCHEMA_ONLY`, `NO_DATA`, `RECOVERY`, `WHEN_NEEDED`, `CONFIGURATION_BASED`, `CUSTOM`. |
| `eventProcessingFailureHandlingMode` | <code>cdc:EventProcessingFailureHandlingMode</code> | `WARN` | How to handle event-processing failures (`FAIL`, `WARN`, `SKIP`). |
| `skippedOperations` | <code>cdc:Operation[]</code> | `[TRUNCATE]` | Operations to skip when publishing change events. |
| `skipMessagesWithoutChange` | <code>boolean</code> | `false` | Discard events that contain no row-data changes. |
| `decimalHandlingMode` | <code>cdc:DecimalHandlingMode</code> | `DOUBLE` | Representation mode for decimal values (`PRECISE`, `DOUBLE`, `STRING`). |
| `maxQueueSize` | <code>int</code> | `8192` | Maximum number of events in the internal queue. |
| `maxBatchSize` | <code>int</code> | `2048` | Maximum number of events per processing batch. |
| `queryTimeout` | <code>decimal</code> | `60` | Database query timeout in seconds. `0` disables the timeout. |
| `heartbeatConfig` | <code>cdc:HeartbeatConfiguration?</code> | `()` | Heartbeat configuration for keeping the replication connection active. Inherited from `cdc:Options`. |
| `signalConfig` | <code>cdc:SignalConfiguration?</code> | `()` | Signal-channel configuration for ad-hoc control. Inherited from `cdc:Options`. |
| `transactionMetadataConfig` | <code>cdc:TransactionMetadataConfiguration?</code> | `()` | Transaction-boundary event configuration. Inherited from `cdc:Options`. |
| `columnTransformConfig` | <code>cdc:ColumnTransformConfiguration?</code> | `()` | Column masking and transformation configuration. Inherited from `cdc:Options`. |
| `topicConfig` | <code>cdc:TopicConfiguration?</code> | `()` | Topic naming and routing configuration. Inherited from `cdc:Options`. |
| `connectionRetryConfig` | <code>cdc:ConnectionRetryConfiguration?</code> | `()` | Connection retry behavior. Inherited from `cdc:Options`. |
| `performanceConfig` | <code>cdc:PerformanceConfiguration?</code> | `()` | Performance-tuning configuration. Inherited from `cdc:Options`. |
| `extendedSnapshot` | <code>ExtendedSnapshotConfiguration?</code> | `()` | PostgreSQL extended snapshot configuration (lock timeout, isolation mode). Narrows the parent `cdc:Options.extendedSnapshot`. |
| `dataTypeConfig` | <code>cdc:DataTypeConfiguration?</code> | `()` | Data-type handling configuration including schema-change tracking. |

### `ExtendedSnapshotConfiguration`

PostgreSQL-specific extension of `cdc:RelationalExtendedSnapshotConfiguration`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `lockTimeout` | <code>decimal</code> | `10` | Lock acquisition timeout in seconds during snapshot. |
| `isolationMode` | <code>cdc:SnapshotIsolationMode?</code> | `()` | Transaction isolation level used during the snapshot. |

### `cdc:SecureDatabaseConnection`

SSL/TLS configuration for the CDC database connection. Set on `PostgresDatabaseConnection.secure`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sslMode` | <code>cdc:SslMode</code> | `PREFERRED` | Connection security level (`DISABLED`, `PREFERRED`, `REQUIRED`, `VERIFY_CA`, `VERIFY_IDENTITY`). |
| `keyStore` | <code>crypto:KeyStore?</code> | `()` | Client keystore for mutual TLS authentication. |
| `trustStore` | <code>crypto:TrustStore?</code> | `()` | Truststore for verifying the server certificate. |

### `cdc:MessageKeyColumns`

Defines a composite message key for a captured table.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tableName` | <code>string</code> | Required | Fully-qualified table name (for example, `"public.orders"`). |
| `columns` | <code>string[]</code> | Required | Column names that compose the message key. |
