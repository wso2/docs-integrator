---
title: Triggers
---

# Triggers

The `ballerinax/oracledb` connector supports event-driven integration through Change Data Capture (CDC) powered by Debezium's LogMiner-based Oracle connector. When rows are inserted, updated, deleted, or read during the initial snapshot in monitored Oracle tables, the `oracledb:CdcListener` receives change events in real time and invokes your service callbacks automatically.

Three components work together:

| Component | Role |
|-----------|------|
| `oracledb:CdcListener` | Connects to the Oracle database's redo/archive logs through LogMiner and streams row-level change events to attached services. |
| `cdc:Service` | Defines the `onRead`, `onCreate`, `onUpdate`, `onDelete`, and `onError` callbacks invoked per change event. |
| `OracleDatabaseConnection` | Configuration record for the Oracle CDC database connection (host, port, credentials, LogMiner and driver settings). |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `oracledb:CdcListener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `OracleDatabaseConnection` | Configures the CDC database connection including server address, credentials, LogMiner tuning, and driver pass-through options. |
| `OracleListenerConfiguration` | Top-level listener configuration wrapping the database connection and CDC options. |

`OracleDatabaseConnection` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectorClass` | `string` | `"io.debezium.connector.oracle.OracleConnector"` | The Debezium Oracle connector class name. |
| `hostname` | `string` | `"localhost"` | The hostname of the Oracle server. Ignored when `url` is set. |
| `port` | `int` | `1521` | The port number of the Oracle listener. Ignored when `url` is set. |
| `databaseName` | `string` | Required | The root container (CDB) name for multitenant Oracle, or the database name for legacy non-CDB Oracle. |
| `url` | `string?` | `()` | Raw JDBC URL for TNS, RAC, or TCPS connections. Overrides `hostname` and `port` only. |
| `pdbName` | `string?` | `()` | The pluggable database (PDB) name, for multitenant installations only. |
| `adapterMode` | `AdapterMode` | `LOGMINER` | LogMiner buffering mode: connector-side (`LOGMINER`) or database-side (`LOGMINER_UNBUFFERED`). |
| `racNodes` | `string\|string[]?` | `()` | RAC node list (`host:port` or `host:port/SID`). Required when connecting to an Oracle RAC cluster, even when `url` is set. |
| `includedSchemas` | `string\|string[]?` | `()` | Regex patterns of schemas to capture. Mutually exclusive with `excludedSchemas`. |
| `excludedSchemas` | `string\|string[]?` | `()` | Regex patterns of schemas to exclude. Mutually exclusive with `includedSchemas`. |
| `includedTables` | `string\|string[]?` | `()` | Regex patterns of schema-qualified table names to capture (for example, `"APP_USER\\.CUSTOMERS"`). Mutually exclusive with `excludedTables`. |
| `excludedTables` | `string\|string[]?` | `()` | Regex patterns of tables to exclude. Mutually exclusive with `includedTables`. |
| `includedColumns` | `string\|string[]?` | `()` | Regex patterns of columns to capture. Mutually exclusive with `excludedColumns`. |
| `excludedColumns` | `string\|string[]?` | `()` | Regex patterns of columns to exclude. Mutually exclusive with `includedColumns`. |
| `logMinerConfig` | `LogMinerConfiguration?` | `()` | LogMiner adapter tunables. See [Supporting types](#supporting-types). |
| `driverConfig` | `DriverConfiguration?` | `()` | Oracle JDBC driver pass-through configuration (mTLS, Oracle Wallet, timezone handling). |

Unlike the MySQL and PostgreSQL connectors, `OracleDatabaseConnection` does **not** support the inherited `secure` field (`cdc:SecureDatabaseConnection`) — the Oracle connector does not read `database.ssl.*` properties, and setting `secure` raises a configuration error at listener initialization. Configure TLS through `driverConfig.mtls` instead, using either a Java keystore/truststore (`DriverSslConfiguration`) or an Oracle Wallet location string.

`OracleListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `database` | `OracleDatabaseConnection` | Required | The Oracle CDC database connection configuration. |
| `options` | `OracleOptions` | `{}` | Oracle-specific CDC options including snapshot, LOB, streaming, and data type handling. See [Supporting types](#supporting-types). |
| `engineName` | `string` | `"ballerina-cdc-connector"` | Debezium engine instance name. Inherited from `cdc:ListenerConfiguration`. |
| `internalSchemaStorage` | `cdc:InternalSchemaStorage` | `{fileName: "tmp/dbhistory.dat"}` | Schema-history storage configuration (file, Kafka, JDBC, Redis, S3, Azure Blob, RocketMQ, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `offsetStorage` | `cdc:OffsetStorage` | `{fileName: "tmp/debezium-offsets.dat"}` | Offset storage configuration (file, Kafka, JDBC, Redis, or in-memory). Inherited from `cdc:ListenerConfiguration`. |
| `livenessInterval` | `decimal` | `60.0` | Interval, in seconds, for checking CDC listener liveness. Inherited from `cdc:ListenerConfiguration`. |

### Initializing the listener

**Basic CDC listener with default settings:**

```ballerina
import ballerinax/oracledb;
import ballerinax/oracledb.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

listener oracledb:CdcListener cdcListener = new (database = {
    username: username,
    password: password,
    databaseName: database
});
```

**CDC listener with LogMiner tuning and table filters:**

```ballerina
import ballerinax/cdc;
import ballerinax/oracledb;
import ballerinax/oracledb.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

listener oracledb:CdcListener cdcListener = new (
    database = {
        username: username,
        password: password,
        databaseName: database,
        pdbName: "FREEPDB1",
        includedTables: "APP_USER\\.CUSTOMERS",
        logMinerConfig: {
            strategy: cdc:ONLINE_CATALOG
        }
    },
    options = {
        snapshotMode: cdc:NO_DATA,
        skippedOperations: [cdc:UPDATE, cdc:DELETE]
    }
);
```

`includedTables`, `excludedTables`, `includedSchemas`, and `excludedSchemas` are regular expressions, not literal names. Escape a literal `.` in a schema-qualified table name — for example, `"APP_USER\\.CUSTOMERS"` — otherwise the unescaped `.` matches any single character.

---

## Service

A `cdc:Service` is a Ballerina service attached to an `oracledb:CdcListener`. It listens for row-level change events on monitored Oracle tables and implements callbacks for each event type. You can type the callback parameters with your own Ballerina record types for automatic mapping.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onRead` | `remote function onRead(record {} after) returns cdc:Error?` | Invoked during the initial snapshot for each existing row read from the database. |
| `onCreate` | `remote function onCreate(record {} after) returns cdc:Error?` | Invoked when a new row is inserted into a monitored table. |
| `onUpdate` | `remote function onUpdate(record {} before, record {} after) returns cdc:Error?` | Invoked when a row is updated, providing both the before and after state. |
| `onDelete` | `remote function onDelete(record {} before) returns cdc:Error?` | Invoked when a row is deleted, providing the row state before deletion. |
| `onError` | `remote function onError(cdc:Error err) returns cdc:Error?` | Invoked when the listener encounters an error during change-event delivery (for example, deserialization failures or connector errors). |

You do not need to implement all of these callbacks. Only implement the event types relevant to your use case.

When a single listener captures multiple tables, add a trailing `string tableName` parameter to a callback (for example, `onCreate(record {} after, string tableName)`) to identify which table produced the event.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/cdc;
import ballerinax/oracledb;
import ballerinax/oracledb.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;
configurable string database = ?;

type Order record {|
    int ORDER_ID;
    int CUSTOMER_ID;
    decimal AMOUNT;
    string STATUS;
|};

listener oracledb:CdcListener cdcListener = new (
    database = {
        username: username,
        password: password,
        databaseName: database,
        pdbName: "FREEPDB1",
        includedTables: "APP_USER\\.ORDERS"
    },
    options = {
        snapshotMode: cdc:NO_DATA
    }
);

service cdc:Service on cdcListener {
    isolated remote function onRead(Order after) returns cdc:Error? {
        log:printInfo("Snapshot row", 'order = after.toString());
    }

    isolated remote function onCreate(Order after) returns cdc:Error? {
        log:printInfo("New order created",
            orderId = after.ORDER_ID,
            amount = after.AMOUNT
        );
    }

    isolated remote function onUpdate(Order before, Order after) returns cdc:Error? {
        log:printInfo("Order updated",
            orderId = after.ORDER_ID,
            oldStatus = before.STATUS,
            newStatus = after.STATUS
        );
    }

    isolated remote function onDelete(Order before) returns cdc:Error? {
        log:printInfo("Order deleted", orderId = before.ORDER_ID);
    }

    isolated remote function onError(cdc:Error err) returns cdc:Error? {
        log:printError("CDC error", 'error = err);
    }
}
```

For CDC to work, the Oracle database must be in `ARCHIVELOG` mode with supplemental logging enabled, and the connecting user must hold LogMiner-related privileges. See the [Setup Guide](setup-guide.md#enable-logminer-based-cdc-optional) for the full set of steps.

---

## Supporting types

For the `OracleDatabaseConnection` field reference, see the [Listener > Configuration](#configuration) section above.

### `AdapterMode`

LogMiner adapter mode for capturing changes from the Oracle database transaction logs.

| Constant | Value | Description |
|----------|-------|-------------|
| `LOGMINER` | `"logminer"` | Connector-side LogMiner buffer (default). |
| `LOGMINER_UNBUFFERED` | `"logminer_unbuffered"` | Database-side LogMiner buffer; the database performs transaction buffering. |

### `LogMinerConfiguration`

LogMiner adapter tunables. Applies to both `LOGMINER` and `LOGMINER_UNBUFFERED` adapter modes.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `strategy` | `LogMiningStrategy` | `ONLINE_CATALOG` | Mining strategy used when reading redo/archive logs. |
| `queryFilterMode` | `LogMiningQueryFilterMode` | `NONE` | How table-include filters are applied to the LogMiner query (`NONE`, `IN`, `REGEX`). |
| `readOnlyHostname` | `string?` | `()` | Hostname of a read-only standby to direct LogMiner queries at. |
| `flushTableName` | `string` | `"LOG_MINING_FLUSH"` | Name of the internal flush table; useful for RAC deployments. |
| `buffer` | `LogMinerMemoryBufferConfiguration?` | `()` | In-memory transaction buffer tunables. |
| `sessionMaxDuration` | `decimal?` | `()` | Max time before closing and reopening the LogMiner session, in seconds; no limit if not set. |
| `restartConnection` | `boolean` | `false` | Restart the JDBC connection when a mining session is rotated. |
| `batch` | `LogMinerBatchConfiguration?` | `()` | SCN-based mining batch sizing. |
| `sleep` | `LogMinerSleepConfiguration?` | `()` | Sleep timing between mining iterations. |
| `archive` | `LogMinerArchiveLogConfiguration?` | `()` | Archive-log mining configuration. |
| `transactionRetentionTime` | `decimal?` | `()` | Time to retain transactions in the buffer before forced commit/rollback, in seconds. |
| `maxWindowTime` | `decimal?` | `()` | Max mining window duration in seconds before forced advance of the offset. |
| `includedUsernames` | `string\|string[]?` | `()` | Usernames whose changes to capture. Mutually exclusive with `excludedUsernames`. |
| `excludedUsernames` | `string\|string[]?` | `()` | Usernames whose changes to skip. Mutually exclusive with `includedUsernames`. |
| `includedClientIds` | `string\|string[]?` | `()` | JDBC client IDs whose changes to capture. Mutually exclusive with `excludedClientIds`. |
| `excludedClientIds` | `string\|string[]?` | `()` | JDBC client IDs whose changes to skip. Mutually exclusive with `includedClientIds`. |
| `scnGapDetectionMinSize` | `int` | `1000000` | Minimum SCN delta to consider for gap detection. |
| `scnGapDetectionMaxInterval` | `decimal` | `20` | Max time window in seconds for the SCN gap detection heuristic. |

### `LogMiningStrategy`

| Constant | Value | Description |
|----------|-------|-------------|
| `ONLINE_CATALOG` | `"online_catalog"` | Always use the online data dictionary (lowest overhead, no schema-change support). |
| `REDO_LOG_CATALOG` | `"redo_log_catalog"` | Use the data dictionary written to the redo logs (supports schema changes). |
| `HYBRID` | `"hybrid"` | Hybrid approach combining online catalog with selective redo-log lookups. Incompatible with `options.lobEnabled = true`. |

### `LogMinerMemoryBufferConfiguration`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trackRsId` | `boolean` | `true` | Track the row-id (RS_ID) of each event in the transaction buffer. |
| `transactionEventsThreshold` | `int?` | `()` | Max events per transaction before abandoning the transaction. |

### `LogMinerBatchConfiguration`

SCN-based LogMiner mining batch sizing. SCN is a monotonically increasing integer that Oracle stamps onto every committed change; Debezium uses it as its streaming offset.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `minSize` | `int` | `1000` | Minimum SCN window size. |
| `maxSize` | `int` | `100000` | Maximum SCN window size. |
| `incrementSize` | `int` | `20000` | Amount to grow/shrink the window when adapting. |
| `defaultSize` | `int` | `20000` | Initial/fallback SCN window size. |

### `LogMinerSleepConfiguration`

Sleep timing between LogMiner mining iterations, in seconds.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `minTime` | `decimal` | `0` | Minimum sleep duration. |
| `maxTime` | `decimal` | `3` | Maximum sleep duration. |
| `defaultTime` | `decimal` | `1` | Initial/fallback sleep duration. |
| `incrementTime` | `decimal` | `0.2` | Amount to grow/shrink sleep when adapting. |

### `LogMinerArchiveLogConfiguration`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `logHours` | `int?` | `()` | Number of hours of archive logs to scan for the start SCN. If not set, mines all archive logs. |
| `destinationName` | `string\|string[]?` | `()` | Configured Oracle archive destination(s) to use when mining archive logs. |
| `logOnlyMode` | `boolean` | `false` | Mine only archive logs, ignoring redo logs. Increases latency but improves reliability. |
| `logOnlyScnPollInterval` | `decimal` | `10` | Poll interval in seconds when waiting for a new SCN. Applicable only when `logOnlyMode` is `true`. |

### `OracleOptions`

Oracle-specific CDC options for snapshot, LOB capture, streaming, and data type handling. Extends `cdc:Options`.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `extendedSnapshot` | `OracleExtendedSnapshotConfiguration?` | `()` | Snapshot config with Oracle-specific configuration-based sub-flags. |
| `dataTypeConfig` | `OracleDataTypeConfiguration?` | `()` | Data type handling, including Oracle `INTERVAL` representation. |
| `heartbeatConfig` | `cdc:RelationalHeartbeatConfiguration?` | `()` | Heartbeat configuration for keeping the connection alive. |
| `streamingDelay` | `decimal?` | `()` | Delay between snapshot completion and streaming start, in seconds. |
| `queryFetchSize` | `int` | `10000` | JDBC fetch size for streaming queries. |
| `lobEnabled` | `boolean` | `false` | Enable CLOB/NCLOB/BLOB/XML capture. Incompatible with the `HYBRID` mining strategy. |
| `unavailableValuePlaceholder` | `string` | `"__debezium_unavailable_value"` | Placeholder string emitted for unchanged LOB columns. |
| `snapshotDatabaseErrorsMaxRetries` | `int` | `0` | Per-table retry count for snapshot-time database errors (for example, `ORA-01466`). |
| `snapshotMode` | `cdc:SnapshotMode` | `INITIAL` | Initial snapshot behavior. Inherited from `cdc:Options`. |
| `skippedOperations` | `cdc:Operation[]` | `[TRUNCATE]` | Operations to skip publishing (`CREATE`, `UPDATE`, `DELETE`, `TRUNCATE`). Inherited from `cdc:Options`. |

### `OracleExtendedSnapshotConfiguration`

Extends `cdc:RelationalExtendedSnapshotConfiguration` with Oracle-specific configuration-based snapshot sub-flags.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `configurationBased` | `ConfigurationBasedSnapshot?` | `()` | Sub-flags active only when `snapshotMode == CONFIGURATION_BASED`. |

### `ConfigurationBasedSnapshot`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `includeData` | `boolean` | `false` | Include row data in the snapshot. |
| `includeSchema` | `boolean` | `false` | Include schema (DDL) in the snapshot. |
| `startStream` | `boolean` | `false` | Start streaming after the snapshot completes. |
| `snapshotOnSchemaError` | `boolean` | `false` | Re-snapshot on schema error. |
| `snapshotOnDataError` | `boolean` | `false` | Re-snapshot on data error. |

### `OracleDataTypeConfiguration`

Extends `cdc:DataTypeConfiguration` with Oracle-specific handling.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `intervalHandlingMode` | `IntervalHandlingMode` | `NUMERIC` | How Oracle `INTERVAL` types are represented (numeric vs ISO-8601 string). |

### `IntervalHandlingMode`

| Constant | Value | Description |
|----------|-------|-------------|
| `NUMERIC` | `"numeric"` | Numeric representation (microseconds for day-second, months for year-month). |
| `STRING` | `"string"` | ISO-8601 string representation. |

### `DriverConfiguration`

Oracle JDBC driver pass-through configuration. All values are emitted with the `driver.` prefix as Debezium pass-through properties.

| Field | Type | Description |
|-------|------|-------------|
| `mtls` | `DriverSslConfiguration\|string?` | mTLS client authentication for Oracle — supply either a Java keystore/truststore (mapped to `driver.javax.net.ssl.*`) or an Oracle Wallet location string (mapped to `driver.oracle.net.wallet_location`). These are two alternative methods, not combinable. |
| `timezoneAsRegion` | `boolean?` | Whether the JDBC driver should resolve timezone as a region (`driver.oracle.jdbc.timezoneAsRegion`). Set to `false` to work around `ORA-01882` ("timezone region not found"). |

### `DriverSslConfiguration`

| Field | Type | Description |
|-------|------|-------------|
| `keyStore` | `DriverKeyStore?` | Client keystore, mapped to `driver.javax.net.ssl.keyStore*`. |
| `trustStore` | `DriverTrustStore?` | Server certificate truststore, mapped to `driver.javax.net.ssl.trustStore*`. |

### `DriverKeyStore` / `DriverTrustStore`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `path` | `string` | Required | Filesystem path to the keystore/truststore file. |
| `password` | `string` | Required | Keystore/truststore password. |
| `storeType` | `StoreType` | `JKS` | Store format (`JKS` or `PKCS12`). |
