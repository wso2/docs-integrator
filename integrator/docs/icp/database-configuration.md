---
title: Database Configuration
---

# Database Configuration

## Main Database

Configure the main database in the `[icp_server.storage]` section of `<ICP_HOME>/conf/deployment.toml`.

| Key                     | Type      | Default       | Description                                                                         |
| ----------------------- | --------- | ------------- | ----------------------------------------------------------------------------------- |
| `dbType`                | `string`  | `"h2"`        | Database engine — `mysql`, `postgresql`, `mssql`, `oracle`, or `h2`                  |
| `dbHost`                | `string`  | `"localhost"` | Database server hostname (not used for H2)                                           |
| `dbPort`                | `int`     | `5432`        | Database server port (not used for H2)                                               |
| `dbName`                | `string`  | `"icp_db"`    | Database or schema name. For Oracle, the service name of the database or PDB          |
| `dbUser`                | `string`  | `"icp_user"`  | Database user                                                                        |
| `dbPassword`            | `string`  | `"icp_password"` | Database password — **must be changed to a unique password in production**        |
| `dbUseTLS`              | `boolean` | `false`       | Connect over TLS. Set to `true` for Oracle TCPS endpoints, such as Autonomous Database |
| `maxOpenConnections`    | `int`     | `10`          | Maximum number of open connections in the pool                                        |
| `minIdleConnections`    | `int`     | `5`           | Minimum number of idle connections in the pool                                        |
| `maxConnectionLifeTime` | `decimal` | `1800.0`      | Maximum lifetime of a connection, in seconds                                          |

### MySQL

```toml
[icp_server.storage]
dbType = "mysql"
dbHost = "localhost"
dbPort = 3306
dbName = "icp_db"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
```

### PostgreSQL

```toml
[icp_server.storage]
dbType = "postgresql"
dbHost = "localhost"
dbPort = 5432
dbName = "icp_db"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
```

### Microsoft SQL Server

```toml
[icp_server.storage]
dbType = "mssql"
dbHost = "localhost"
dbPort = 1433
dbName = "icp_db"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
```

### Oracle

Oracle Database 19c or later is supported.

```toml
[icp_server.storage]
dbType = "oracle"
dbHost = "localhost"
dbPort = 1521
dbName = "ORCLPDB1"
dbUser = "<DB_USER>"
dbPassword = "<DB_PASSWORD>"
dbUseTLS = false
```

Note the following when you use Oracle:

- `dbName` is the service name of the database or pluggable database (PDB). It is not a SID.
- Set `dbUseTLS` to `true` when the listener uses TCPS. ICP connects with one-way TLS and exposes no wallet, keystore, or `TNS_ADMIN` option, so the database must accept TLS connections without mutual TLS, and its certificate must be trusted by the JVM that runs ICP. On Oracle Autonomous Database, enable TLS connections, because its default mTLS requires a wallet.
- Initialize the schema with `oracle_init.sql` before you start the server. Run it with SQL\*Plus or SQLcl, because the script contains PL/SQL blocks terminated by a `/` on its own line.
- The schema user needs `CREATE SESSION`, `CREATE TABLE`, `CREATE VIEW`, `CREATE TRIGGER`, `CREATE SEQUENCE`, and a tablespace quota. See [Install ICP](install-icp.md#database).
- Oracle applies `UNIQUE` constraints to rows with partially null keys, whereas MySQL treats any null key column as distinct. Deduplicate `group_role_mapping` before you migrate data from MySQL.

### H2

```toml
[icp_server.storage]
dbType = "h2"
```

H2 stores the main database in a file named after `dbName`, so the default is `<ICP_HOME>/bin/database/icp_db.mv.db`. H2 is suitable for development and testing only.

---

## Credentials Database

The default authentication backend stores user credentials in a separate dedicated credentials database. These are flat top-level keys in `deployment.toml` (not under any table header).

```toml
credentialsDbType = "postgresql"   # h2, postgresql, mysql, mssql, or oracle
credentialsDbHost = "localhost"
credentialsDbPort = 5432
credentialsDbName = "credentials_db"
credentialsDbUser = "icp_user"
credentialsDbPassword = "icp_password"
```

| Key                     | Type      | Default            | Description                                       |
| ----------------------- | --------- | ------------------ | ------------------------------------------------- |
| `credentialsDbType`     | `string`  | `"h2"`             | `h2`, `postgresql`, `mysql`, `mssql`, or `oracle` |
| `credentialsDbHost`     | `string`  | `"localhost"`      | Not used for H2                                   |
| `credentialsDbPort`     | `int`     | `5432`             | Not used for H2                                   |
| `credentialsDbName`     | `string`  | `"credentials_db"` | Credentials database name                         |
| `credentialsDbUser`     | `string`  | `"icp_user"`       | Database user                                     |
| `credentialsDbPassword` | `string`  | `"icp_password"`   | Database password                                 |
| `credentialsDbUseTLS`   | `boolean` | `false`            | Connect over TLS. Set to `true` for Oracle TCPS endpoints |

The credentials database is independent of the main database, so the two can use different engines.

For Oracle, initialize it with `credentials_oracle_init.sql`. That script also contains PL/SQL blocks, so run it with SQL\*Plus or SQLcl, and grant its schema user `CREATE SESSION`, `CREATE TABLE`, `CREATE SEQUENCE`, `CREATE TRIGGER`, and a tablespace quota. `credentialsDbUseTLS` behaves like `dbUseTLS`: the connection uses one-way TLS with no wallet, so the database certificate must be trusted by the JVM that runs ICP.

For H2, the credentials database is a file named after `credentialsDbName`, so the default is `<ICP_HOME>/bin/database/credentials_db.mv.db`.
