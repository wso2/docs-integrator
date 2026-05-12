---
title: Triggers
---

# Triggers

The CDC connector is built entirely around listeners and services. A database-specific CDC listener (e.g., `mysql:CdcListener`) connects to the database and streams change events; a `cdc:Service` defines the callbacks that process those events. The `ballerinax/cdc` package provides the shared types, configuration records, and service interface that all database-specific listeners implement.

Three components work together:

| Component | Role |
|-----------|------|
| `cdc:Listener` | Abstract listener interface implemented by database-specific listeners: `mysql:CdcListener`, `postgresql:CdcListener`, `mssql:CdcListener`, and `oracledb:CdcListener`. |
| `cdc:Service` | Ballerina service type that defines event callbacks (`onRead`, `onCreate`, `onUpdate`, `onDelete`, `onTruncate`, `onError`) invoked per change event. |
| `@cdc:ServiceConfig` | Optional annotation applied to a `cdc:Service` to restrict which tables it receives events from. |

For action-based record operations, see the [Action Reference](actions.md).

---

## Listener

The `cdc:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `DatabaseConnection` | Core database connectivity and table/column filtering configuration passed to the concrete listener constructor. |
| `Options` | Connector behavior and performance tuning options passed via the `options` parameter of the listener constructor. |
| `ListenerConfiguration` | Top-level configuration passed as the optional `listenerConfig` parameter to control engine identity, storage backends, and liveness. |

`DatabaseConnection` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `hostname` | `string` | Required | Hostname or IP address of the database server. |
| `port` | `int` | Required | Port number of the database server. |
| `username` | `string` | Required | Database username with CDC privileges. |
| `password` | `string` | Required | Password for the database user. |
| `connectorClass` | `string` | Required | Fully-qualified Debezium connector class name (set automatically by database-specific packages). |
| `includedTables` | `string\|string[]` | `()` | Fully-qualified table name(s) to include in CDC events (e.g., `"finance_db.transactions"`). |
| `excludedTables` | `string\|string[]` | `()` | Fully-qualified table name(s) to exclude from CDC events. |
| `includedColumns` | `string\|string[]` | `()` | Column name(s) to include in change event payloads. |
| `excludedColumns` | `string\|string[]` | `()` | Column name(s) to exclude from change event payloads. |
| `connectTimeout` | `decimal` | `()` | Database connection timeout in seconds. |
| `tasksMax` | `int` | `1` | Maximum number of concurrent connector tasks. |
| `secure` | `SecureDatabaseConnection` | `()` | SSL/TLS configuration for the database connection. |

`Options` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `snapshotMode` | `SnapshotMode` | `INITIAL` | Controls snapshot behavior on connector startup: `INITIAL`, `ALWAYS`, `NO_DATA`, `SCHEMA_ONLY`, `INITIAL_ONLY`, `RECOVERY`, `WHEN_NEEDED`, `CONFIGURATION_BASED`, or `CUSTOM`. |
| `eventProcessingFailureHandlingMode` | `EventProcessingFailureHandlingMode` | `WARN` | How to handle event processing failures: `FAIL` (stop connector), `WARN` (log and continue), or `SKIP` (silently skip). |
| `skippedOperations` | `Operation[]` | `[TRUNCATE]` | Operations to skip and not deliver to services. Values: `CREATE`, `UPDATE`, `DELETE`, `TRUNCATE`, `NONE`. |
| `skipMessagesWithoutChange` | `boolean` | `false` | When true, skip UPDATE events where the row data did not actually change. |
| `decimalHandlingMode` | `DecimalHandlingMode` | `DOUBLE` | How to represent DECIMAL/NUMERIC database columns: `PRECISE` (byte array), `DOUBLE`, or `STRING`. |
| `maxQueueSize` | `int` | `8192` | Maximum number of events that can be held in the connector's internal queue. |
| `maxBatchSize` | `int` | `2048` | Maximum number of events processed per batch. |
| `queryTimeout` | `decimal` | `60` | Timeout in seconds for database queries issued by the connector. |

`ListenerConfiguration` fields:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `engineName` | `string` | `"ballerina-cdc-connector"` | Unique name for the Debezium engine instance. Must be unique when running multiple listeners. |
| `internalSchemaStorage` | `FileInternalSchemaStorage\|KafkaInternalSchemaStorage` | `{}` | Storage backend for Debezium schema history. Defaults to file-based storage at `tmp/dbhistory.dat`. |
| `offsetStorage` | `FileOffsetStorage\|KafkaOffsetStorage` | `{}` | Storage backend for Debezium connector offsets (tracks which events have been processed). Defaults to file-based storage at `tmp/debezium-offsets.dat`. |
| `options` | `Options` | `{}` | Connector behavior options (same as the `options` parameter on the listener constructor). |
| `livenessInterval` | `decimal` | `60.0` | Interval in seconds between liveness heartbeat events used by `cdc:isLive()`. |

### Initializing the listener

**MySQL, with no initial snapshot, insert-only tracking:**

```ballerina
import ballerinax/cdc;
import ballerinax/mysql;
import ballerinax/mysql.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;

listener mysql:CdcListener financeDBListener = new (
    database = {
        username: username,
        password: password,
        includedDatabases: "finance_db",
        includedTables: "finance_db.transactions"
    },
    options = {
        snapshotMode: cdc:NO_DATA,
        skippedOperations: [cdc:TRUNCATE, cdc:UPDATE, cdc:DELETE]
    }
);
```

**MySQL: multiple tables with Kafka-based offset storage:**

```ballerina
import ballerinax/cdc;
import ballerinax/mysql;
import ballerinax/mysql.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;

listener mysql:CdcListener mysqlListener = new (
    database = {
        username: username,
        password: password,
        includedDatabases: "store_db",
        includedTables: ["store_db.products", "store_db.vendors", "store_db.product_reviews"]
    },
    options = {snapshotMode: cdc:NO_DATA},
    listenerConfig = {
        offsetStorage: {
            bootstrapServers: "kafka-broker:9092",
            topicName: "store_cdc_offsets"
        },
        internalSchemaStorage: {
            bootstrapServers: "kafka-broker:9092",
            topicName: "store_cdc_schema_history"
        }
    }
);
```

---

## Service

A `cdc:Service` is attached to a CDC listener and implements remote function callbacks for each database change event type. Callbacks receive the row data as a `record {}` or a user-defined typed record, and may optionally accept a `string tableName` second parameter. Multiple services can be attached to the same listener, each scoped to specific tables using the `@cdc:ServiceConfig` annotation.

### Callback signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `onRead` | `remote function onRead(record {} after) returns cdc:Error?` | Invoked for each existing row during the initial snapshot phase. |
| `onRead (with table name)` | `remote function onRead(record {} after, string tableName) returns cdc:Error?` | Variant of `onRead` that also receives the fully-qualified source table name. |
| `onCreate` | `remote function onCreate(record {} after) returns cdc:Error?` | Invoked when a new row is inserted into a tracked table. |
| `onCreate (with table name)` | `remote function onCreate(record {} after, string tableName) returns cdc:Error?` | Variant of `onCreate` that also receives the fully-qualified source table name. |
| `onUpdate` | `remote function onUpdate(record {} before, record {} after) returns cdc:Error?` | Invoked when a row is updated; receives both the pre-update and post-update row state. |
| `onUpdate (with table name)` | `remote function onUpdate(record {} before, record {} after, string tableName) returns cdc:Error?` | Variant of `onUpdate` that also receives the fully-qualified source table name. |
| `onDelete` | `remote function onDelete(record {} before) returns cdc:Error?` | Invoked when a row is deleted from a tracked table; receives the pre-deletion row state. |
| `onDelete (with table name)` | `remote function onDelete(record {} before, string tableName) returns cdc:Error?` | Variant of `onDelete` that also receives the fully-qualified source table name. |
| `onTruncate` | `remote function onTruncate() returns cdc:Error?` | Invoked when a table is truncated. Supported on PostgreSQL only. |
| `onTruncate (with table name)` | `remote function onTruncate(string tableName) returns cdc:Error?` | Variant of `onTruncate` that also receives the name of the truncated table. |
| `onError` | `remote function onError(cdc:Error e) returns error?` | Invoked when an event processing error occurs; receives the `cdc:Error` (including `PayloadBindingError` for type-binding failures). |

You do not need to implement all callbacks: only implement the event types relevant to your use case. Unimplemented callback types are silently ignored by the listener.

### Full usage example

```ballerina
import ballerina/log;
import ballerinax/cdc;
import ballerinax/mysql;
import ballerinax/mysql.cdc.driver as _;

configurable string username = ?;
configurable string password = ?;

listener mysql:CdcListener mysqlListener = new (
    database = {
        username: username,
        password: password,
        includedDatabases: "store_db",
        includedTables: ["store_db.products", "store_db.vendors", "store_db.product_reviews"]
    },
    options = {snapshotMode: cdc:NO_DATA}
);

// Service scoped to products and vendors tables
@cdc:ServiceConfig {
    tables: ["store_db.products", "store_db.vendors"]
}
service cdc:Service on mysqlListener {
    remote function onRead(Entity after, string tableName) returns error? {
        log:printInfo("Snapshot row", table = tableName, data = after.toString());
    }

    remote function onCreate(Entity after, string tableName) returns error? {
        log:printInfo("Row inserted", table = tableName, data = after.toString());
    }

    remote function onUpdate(Entity before, Entity after, string tableName) returns error? {
        log:printInfo("Row updated", table = tableName,
            before = before.toString(), after = after.toString());
    }

    remote function onDelete(Entity before, string tableName) returns error? {
        log:printInfo("Row deleted", table = tableName, data = before.toString());
    }

    remote function onError(cdc:Error 'error) returns error? {
        log:printError("CDC error", 'error);
    }
}

// Separate service scoped to product_reviews table
@cdc:ServiceConfig {
    tables: ["store_db.product_reviews"]
}
service cdc:Service on mysqlListener {
    remote function onCreate(ProductReviews after, string tableName) returns error? {
        log:printInfo("New review", table = tableName, data = after.toString());
    }

    remote function onError(cdc:Error 'error) returns error? {
        log:printError("CDC error", 'error);
    }
}

type Entity record {|
    int id;
    string name;
    anydata...;
|};

type ProductReviews record {|
    int review_id;
    int product_id;
    string content;
    float rating;
|};
```

Replace the generic `record {}` parameter type with a concrete Ballerina record type (e.g., `Transactions`, `Product`) for automatic payload binding and compile-time type safety. If the incoming payload cannot be bound to the declared type, a `cdc:PayloadBindingError` is raised and routed to `onError` if that callback is implemented.

---

## Supporting types

### `SecureDatabaseConnection`

| Field | Type | Description |
|-------|------|-------------|
| `sslMode` | `SslMode` | SSL enforcement level: `DISABLED`, `PREFERRED`, `REQUIRED`, `VERIFY_CA`, or `VERIFY_IDENTITY`. Default: `PREFERRED`. |
| `keyStore` | `crypto:KeyStore` | Client certificate key store for mutual TLS authentication. |
| `trustStore` | `crypto:TrustStore` | Trust store for verifying the database server's SSL certificate. |

### `CdcServiceConfig`

| Field | Type | Description |
|-------|------|-------------|
| `tables` | `string\|string[]` | One or more fully-qualified table names (e.g., `"finance_db.transactions"`) that this service should receive events for. Events from other tables are not delivered to this service. |

### `FileInternalSchemaStorage`

| Field | Type | Description |
|-------|------|-------------|
| `className` | `string` | Debezium schema history class. Default: `io.debezium.storage.file.history.FileSchemaHistory`. |
| `fileName` | `string` | Path to the local schema history file. Default: `tmp/dbhistory.dat`. |

### `KafkaInternalSchemaStorage`

| Field | Type | Description |
|-------|------|-------------|
| `bootstrapServers` | `string\|string[]` | Kafka bootstrap server address(es) for schema history storage. |
| `topicName` | `string` | Kafka topic name for schema history. Default: `bal_cdc_internal_schema_history`. |
| `securityProtocol` | `kafka:SecurityProtocol` | Kafka security protocol. Default: `PROTOCOL_PLAINTEXT`. |
| `auth` | `kafka:AuthenticationConfiguration` | Kafka authentication configuration for secured brokers. |
| `secureSocket` | `kafka:SecureSocket` | SSL/TLS configuration for the Kafka connection. |

### `FileOffsetStorage`

| Field | Type | Description |
|-------|------|-------------|
| `className` | `string` | Debezium offset storage class. Default: `org.apache.kafka.connect.storage.FileOffsetBackingStore`. |
| `fileName` | `string` | Path to the local offset storage file. Default: `tmp/debezium-offsets.dat`. |

### `KafkaOffsetStorage`

| Field | Type | Description |
|-------|------|-------------|
| `bootstrapServers` | `string\|string[]` | Kafka bootstrap server address(es) for offset storage. |
| `topicName` | `string` | Kafka topic name for offsets. Default: `bal_cdc_offsets`. |
| `partitions` | `int` | Number of partitions for the Kafka offset topic. Default: `1`. |
| `replicationFactor` | `int` | Replication factor for the Kafka offset topic. Default: `2`. |
| `securityProtocol` | `kafka:SecurityProtocol` | Kafka security protocol. Default: `PROTOCOL_PLAINTEXT`. |
| `auth` | `kafka:AuthenticationConfiguration` | Kafka authentication configuration for secured brokers. |
| `secureSocket` | `kafka:SecureSocket` | SSL/TLS configuration for the Kafka connection. |

### `EventProcessingError`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `json` | The raw JSON payload associated with the event that caused the processing error. |

### `PayloadBindingError`

| Field | Type | Description |
|-------|------|-------------|
| `payload` | `json` | The raw JSON payload that could not be deserialized into the declared callback parameter type. |
