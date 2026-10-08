---
title: CDC for MySQL
---

# CDC for MySQL

MySQL CDC integrations capture row-level changes from MySQL tables in real time using Debezium-based Change Data Capture. Unlike PostgreSQL's logical replication, MySQL CDC streams changes directly from the server's binary log (binlog). Use them for data synchronization, audit logging, and event-driven workflows that must react to database inserts, updates, and deletes without polling. This page covers creating the integration, configuring the service and listener, and adding event handlers for insert, update, delete and read events.

:::info Prerequisites

Binary logging must be enabled on the MySQL server (`log_bin` set to `ON`) with `binlog_format` set to `ROW`, and the database user used for CDC needs the `REPLICATION SLAVE`, `REPLICATION CLIENT`, and `SELECT` privileges, before creating this integration. See the [CDC connector setup guide](product://connectors/catalog/database/cdc/setup-guide) for step-by-step instructions.

## Create a CDC service for MySQL

```ballerina
import ballerina/log;
import ballerinax/cdc;
import ballerinax/mysql;
// Loads the MySQL JDBC driver at runtime; required for CDC to work.
import ballerinax/mysql.cdc.driver as _;

// Credentials and target table loaded from Config.toml at startup.
configurable string username = ?;
configurable string password = ?;
configurable string database = ?;
configurable string tableName = ?;

// CDC listener that connects to MySQL and streams row-level changes from the binlog.
listener mysql:CdcListener mysqlCdcListener = new (database = {
    hostname: "localhost",
    port: 3306,
    username,
    password,
    includedDatabases: [database]
});

// Typed record that mirrors the columns of the tracked table.
// Declare a matching record so handlers receive a typed value and can
// access fields directly (for example, `after.id`) instead of working
// with an untyped `record {}`.
type Customer record {|
    int id;
    string name;
    string email;
|};

// Scopes the service to a specific fully qualified table.
@cdc:ServiceConfig {
    tables: tableName
}
service cdc:Service on mysqlCdcListener {

    // Fires when a new row is inserted. The inserted row is bound to `after` as a `Customer`.
    remote function onCreate(Customer after) returns error? {
        log:printInfo("Row inserted", id = after.id, name = after.name);
    }

    // Fires when a row is updated. Both states are bound to `Customer` records,
    // so you can compare fields directly (for example, `before.email != after.email`).
    remote function onUpdate(Customer before, Customer after) returns error? {
        log:printInfo("Row updated",
                id = after.id,
                oldEmail = before.email,
                newEmail = after.email);
    }

    // Fires when a row is deleted. The deleted row is bound to `before`.
    remote function onDelete(Customer before) returns error? {
        log:printInfo("Row deleted", id = before.id);
    }

    // Fires when the listener encounters a processing error.
    remote function onError(error err) returns error? {
        log:printError("CDC error", 'error = err);
    }
}
```

To accept any row shape without defining a record type, declare handler parameters as `record {}`. With a typed record like `Customer`, the runtime binds the change-event payload to your record fields automatically.

Unlike PostgreSQL and Microsoft SQL Server, MySQL does not use a `<database>.<schema>.<table>` identifier because MySQL has no separate schema concept — a MySQL "database" and "schema" are the same thing. Fully qualified table names use the two-part format `<database>.<table>` (for example, `mydb.customers`).

## Service configuration

In the **Service Designer**, click the **Configure** icon in the header to open the **CDC for MySQL Configuration** panel. Select **CDC for MySQL** in the left panel.

| Field | Description |
|---|---|
| **Service Config** | Advanced CDC configuration as a record expression. The `tables` field sets the table(s) to capture changes from, using the fully qualified format `<database>.<table>`. Provide a single table as a string (for example, `"mydb.customers"`), or multiple tables as a string array (for example, `["mydb.customers", "mydb.orders"]`). |

The `tables` field accepts either a single table name as a string or multiple tables as a string array.

```ballerina
// Single table: the service receives change events only for `customers`.
@cdc:ServiceConfig {
    tables: "mydb.customers"
}
service cdc:Service on mysqlCdcListener { }

// Multiple tables: the service receives events for both `customers` and `orders`,
// and the same handlers run for each.
@cdc:ServiceConfig {
    tables: ["mydb.customers", "mydb.orders"]
}
service cdc:Service on mysqlCdcListener { }
```

## Listener configuration

In the **CDC for MySQL Configuration** panel, select **mysqlCdcListener** under **Attached Listeners** to configure the listener.

A single service can be attached to more than one listener. Attach multiple listeners when one service needs to process change events from more than one MySQL source. For example, you can capture changes from two separate MySQL instances, or from two databases with different connection settings, and route every event through the same handler logic.

| Field | Description | Default |
|---|---|---|
| **Name** | Identifier for the listener. | `mysqlCdcListener` |
| **Database** | Database connection configuration as a record expression with `hostname`, `port`, `username`, `password`, and `includedDatabases` fields. | Required |
| **Engine Name** | Debezium engine instance name. | `ballerina-cdc-connector` |
| **Internal Schema Storage** | Schema history storage configuration. | `{fileName: "tmp/dbhistory.dat"}` |
| **Offset Storage** | Offset storage configuration for tracking CDC progress. | `{fileName: "tmp/debezium-offsets.dat"}` |
| **Liveness Interval** | Interval in seconds for checking CDC listener liveness. | `60.0` |
| **Options** | Additional connector options as a record expression. | `{}` |

Click **+ Attach Listener** to attach an additional listener to the same service.

Click **Save Changes** to apply updates.

:::tip Server ID and binlog retention
The connector identifies itself to the MySQL server as a replication client using `databaseServerId` (inside the **Database** field); a random value is generated if you don't set one, but set an explicit, unique value when multiple connectors read from the same MySQL server. Also make sure binlog files are retained (via `binlog_expire_logs_seconds` on MySQL 8.0+, or `expire_logs_days` on older versions) long enough for the connector to catch up after downtime.

```ballerina
// Listener configuration: connection details for the MySQL instance
// and the database(s) to track.
listener mysql:CdcListener mysqlCdcListener = new (database = {
    hostname: "localhost",
    port: 3306,
    username,
    password,
    includedDatabases: ["mydb"]   // Database(s) to capture changes from.
});
```

`mysql:MySqlListenerConfiguration` accepts the following top-level fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `database` | `mysql:MySqlDatabaseConnection` | Required | Database connection (see fields below) |
| `engineName` | `string` | `"ballerina-cdc-connector"` | Debezium engine instance name |
| `internalSchemaStorage` | `cdc:InternalSchemaStorage` | `{fileName: "tmp/dbhistory.dat"}` | Schema history storage configuration |
| `offsetStorage` | `cdc:OffsetStorage` | `{fileName: "tmp/debezium-offsets.dat"}` | Offset storage configuration |
| `livenessInterval` | `decimal` | `60.0` | Liveness check interval in seconds |
| `options` | `mysql:MySqlOptions` | `{}` | MySQL-specific CDC options (extends the generic options with `snapshotMode`, `skippedOperations`, plus MySQL-only settings such as `extendedSnapshot`, `dataTypeConfig`, and `heartbeatConfig`) |

The `database` value (`mysql:MySqlDatabaseConnection`) has these fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `connectorClass` | `string` | `"io.debezium.connector.mysql.MySqlConnector"` | Debezium connector implementation class |
| `hostname` | `string` | `"localhost"` | MySQL hostname |
| `port` | `int` | `3306` | MySQL port |
| `username` | `string` | Required | Database username |
| `password` | `string` | Required | Database password |
| `databaseServerId` | `string` | Randomly generated | Unique identifier the connector uses to represent itself as a MySQL replication client (analogous to a replica's `server-id`) |
| `includedDatabases` | `string\|string[]?` | — | Regex patterns for databases to capture |
| `excludedDatabases` | `string\|string[]?` | — | Regex patterns for databases to exclude |
| `includedTables` | `string\|string[]?` | — | Regex patterns for tables to capture |
| `excludedTables` | `string\|string[]?` | — | Regex patterns for tables to exclude |
| `includedColumns` | `string\|string[]?` | — | Regex patterns for columns to capture |
| `excludedColumns` | `string\|string[]?` | — | Regex patterns for columns to exclude |
| `secure` | `cdc:SecureDatabaseConnection?` | — | SSL/TLS connection configuration |
| `replicationConfig` | `mysql:ReplicationConfiguration?` | — | GTID-based replication configuration (`gtidSourceIncludes`, `gtidSourceExcludes`) |
| `binlogConfig` | `mysql:BinlogConfiguration?` | — | Binlog client configuration (`bufferSize`, default `8192` bytes) |
| `tasksMax` | `int` | `1` | Maximum connector tasks. The MySQL connector always uses a single task, so this value is ignored |
| `connectTimeout` | `decimal?` | — | Connection timeout in seconds |

There is no single `databaseName` field — select the database(s) to capture through `includedDatabases` (and optionally narrow further with `includedTables`/`excludedTables`).

For the full set of fields, see the [`ballerinax/mysql` package on Ballerina Central](https://central.ballerina.io/ballerinax/mysql/latest).

## Event handlers

### Adding an event handler

In the **Service Designer**, click **+ Add Handler**. The **Select Handler to Add** panel lists `onRead`, `onCreate`, `onUpdate`, `onDelete`, and `onError`.

`onRead`, `onCreate`, `onUpdate`, and `onDelete` each open a **Message Handler Configuration** panel for the row payload. `onError` is added directly without additional configuration.

The configuration panel exposes the following fields:

| Field | Description |
|---|---|
| **+ Define Database Entry** | Defines the record type representing one row of the tracked table. The handler receives this record at runtime with values from the change event. |
| **Advanced Parameters > TableName** | Scopes the handler to a specific table. This is selected by default so that the handler only runs for changes on the table it was added for. Clear the checkbox if you want the handler to run for changes on every table the service is attached to. |

Click **Save** to add the handler.

:::note Truncate events
MySQL binlogs in row-based format (`binlog_format=ROW`, the required setting for CDC) do not emit row-level events for `TRUNCATE TABLE`, because `TRUNCATE` is a DDL statement rather than a row change. There is no `onTruncate` handler for MySQL CDC services; use `onDelete` if your workflow needs to react to row removal instead.

```ballerina
// Typed record that mirrors the columns of the `customers` table.
// Declaring the type lets handlers work with fields like `after.id`
// instead of a raw `record {}` value.
type Customer record {|
    int id;
    string name;
    string email;
|};

@cdc:ServiceConfig {
    tables: "mydb.customers"
}
service cdc:Service on mysqlCdcListener {

    // Snapshot read handler: fires once per row during the initial snapshot.
    remote function onRead(Customer after) returns error? {
        log:printInfo("Initial snapshot row", data = after.toString());
    }

    // Insert handler: the newly inserted row arrives as `after`.
    remote function onCreate(Customer after) returns error? {
        log:printInfo("Row inserted", data = after.toString());
        check syncToDownstream("INSERT", after);
    }

    // Update handler: receives both the previous (`before`) and new (`after`) row state.
    remote function onUpdate(Customer before, Customer after) returns error? {
        log:printInfo("Row updated",
                before = before.toString(),
                after = after.toString());
        check syncToDownstream("UPDATE", after);
    }

    // Delete handler: only `before` is available, since the row no longer exists.
    remote function onDelete(Customer before) returns error? {
        log:printInfo("Row deleted", data = before.toString());
        check syncToDownstream("DELETE", before);
    }

    // Error handler: invoked when the listener fails to process a change event.
    remote function onError(error err) returns error? {
        log:printError("CDC processing error", 'error = err);
    }
}
```

The `onCreate`, `onUpdate`, `onDelete`, and `onRead` handlers receive the row data as `record {}` (or a typed record matching your table columns, as shown by `Customer` above).

### Handler types

| Handler | Triggered when | Use when |
|---|---|---|
| `onRead` | A row is read during the initial snapshot of the table | Bootstrapping downstream systems with existing data |
| `onCreate` | A row is inserted into the tracked table | Syncing new records to downstream systems |
| `onUpdate` | A row is updated in the tracked table | Propagating field changes |
| `onDelete` | A row is deleted from the tracked table | Removing records from downstream systems |
| `onError` | A CDC processing error occurs | Logging failures and sending alerts |

## What's next

- [CDC for PostgreSQL](cdc-postgresql.md) — capture changes from PostgreSQL tables
- [CDC for Microsoft SQL Server](cdc-mssql.md) — capture changes from Microsoft SQL Server tables
- [Data Mapper](../supportive-artifacts/data-mapper/data-mapper.md) — transform change events into the shape your downstream systems expect
- [Connections](../supportive-artifacts/connections.md) — manage reusable connection configurations for your integrations
