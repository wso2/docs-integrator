---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an Oracle Database instance and obtaining the connection details required to use the Oracle DB connector, including optional configuration for Change Data Capture (CDC).

## Prerequisites

- An Oracle Database instance (on-premise or cloud). If you do not have one, you can use [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/) or run a local instance using [Oracle Database Free container image](https://container-registry.oracle.com/ords/ocr/ba/database/free).

## Step 1: Set up the Oracle database instance

1. Install or provision an Oracle Database instance (version 12c or later is recommended).
2. Ensure the database listener is running and accessible on the desired host and port (default port is **1521**).
3. Note the following connection details:
    - **Host**: The hostname or IP address of the database server (e.g., `localhost`).
    - **Port**: The listener port (default: `1521`).
    - **Service name or SID**: The database service name or SID (e.g., `ORCL`, `FREEPDB1`, or `XEPDB1`).

For Oracle Cloud Autonomous Database, download the wallet file from the OCI console and use it for secure connections.

## Step 2: Create a database user

1. Connect to the database as a privileged user (e.g., `SYS` or `SYSTEM`):

    ```
    sqlplus sys/<password>@<host>:<port>/<service_name> as sysdba
    ```

2. Create a new user for your application:

    ```sql
    CREATE USER app_user IDENTIFIED BY YourSecurePassword;
    ```

3. Grant the necessary privileges:

    ```sql
    GRANT CONNECT, RESOURCE TO app_user;
    GRANT UNLIMITED TABLESPACE TO app_user;
    ```

4. Optionally, grant additional privileges based on your needs (e.g., `CREATE VIEW`, `CREATE PROCEDURE`).

Do not use the SYS or SYSTEM account for application connections. Always create a dedicated user with the minimum required privileges.

## Step 3: Create your application schema

1. Connect as the application user:

    ```
    sqlplus app_user/YourSecurePassword@<host>:<port>/<service_name>
    ```

2. Create the tables and other database objects required by your application. For example:

    ```sql
    CREATE TABLE customers (
        id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR2(100) NOT NULL,
        email VARCHAR2(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Step 4: Configure network access (if applicable)

1. If the database is behind a firewall, ensure that port **1521** (or your configured listener port) is open for inbound connections from your Ballerina application host.
2. For Oracle Cloud databases, configure the **Access Control List (ACL)** or **Network Security Group** to allow your application's IP address.
3. If using SSL/TLS, obtain the server certificate or wallet file and configure it in your connection settings.

For local development with a containerized Oracle Database, map the container's port 1521 to your host (e.g., `docker run -p 1521:1521 ...`).

## Enable LogMiner-based CDC (optional)

If you plan to use the Change Data Capture (CDC) listener, complete the following steps in addition to the setup above. The example prepares a multitenant Oracle database with a root container named `FREE`, a pluggable database named `FREEPDB1`, and a common CDC user named `c##dbzuser`. Run these commands as a database administrator and replace the example passwords, database names, and datafile paths with values for your environment.

Enabling archive logging requires a database restart. Coordinate this operation with your database administrator before applying it to an existing environment.

### Enable ARCHIVELOG mode

LogMiner reads change history from the database's archived redo logs, so the database must run in `ARCHIVELOG` mode.

1. Connect to the root container as `SYSDBA`, configure an archive-log destination, and enable archive logging. Skip the `ALTER SYSTEM` statements if a recovery area or another local archive-log destination is already configured.

    ```sql
    sqlplus sys/<sys_password>@//localhost:1521/FREE as sysdba

    ALTER SYSTEM SET db_recovery_file_dest_size = 10G;
    ALTER SYSTEM SET db_recovery_file_dest = '<recovery_area_path>' SCOPE=SPFILE;

    SHUTDOWN IMMEDIATE;
    STARTUP MOUNT;
    ALTER DATABASE ARCHIVELOG;
    ALTER DATABASE OPEN;

    ARCHIVE LOG LIST;
    ```

2. Verify that `ARCHIVE LOG LIST` reports `Database log mode: Archive Mode`.

### Enable supplemental logging

1. Enable minimal supplemental logging at the database level:

    ```sql
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    ```

2. Enable all-column supplemental logging for every table that the listener captures. Run this command in the PDB that owns the table. Enabling it only on captured tables limits the additional redo-log volume.

    ```sql
    ALTER SESSION SET CONTAINER = FREEPDB1;
    ALTER TABLE APP_USER.CUSTOMERS ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
    ```

### Create a LogMiner tablespace

Create a LogMiner tablespace in both the root container and the PDB. Adjust the datafile paths for your Oracle installation.

```sql
ALTER SESSION SET CONTAINER = CDB$ROOT;
CREATE TABLESPACE logminer_tbs
    DATAFILE '<root_datafile_path>/logminer_tbs.dbf'
    SIZE 25M REUSE AUTOEXTEND ON MAXSIZE UNLIMITED;

ALTER SESSION SET CONTAINER = FREEPDB1;
CREATE TABLESPACE logminer_tbs
    DATAFILE '<pdb_datafile_path>/logminer_tbs.dbf'
    SIZE 25M REUSE AUTOEXTEND ON MAXSIZE UNLIMITED;
```

### Create a CDC user and grant privileges

Return to the root container, create the common CDC user, and grant the privileges required by LogMiner and the initial snapshot process.

```sql
ALTER SESSION SET CONTAINER = CDB$ROOT;

CREATE USER c##dbzuser IDENTIFIED BY <cdc_password>
    DEFAULT TABLESPACE logminer_tbs
    QUOTA UNLIMITED ON logminer_tbs
    CONTAINER=ALL;

GRANT CREATE SESSION TO c##dbzuser CONTAINER=ALL;
GRANT SET CONTAINER TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$DATABASE TO c##dbzuser CONTAINER=ALL;
GRANT FLASHBACK ANY TABLE TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ANY TABLE TO c##dbzuser CONTAINER=ALL;
GRANT SELECT_CATALOG_ROLE TO c##dbzuser CONTAINER=ALL;
GRANT EXECUTE_CATALOG_ROLE TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ANY TRANSACTION TO c##dbzuser CONTAINER=ALL;
GRANT LOGMINING TO c##dbzuser CONTAINER=ALL;

GRANT CREATE TABLE TO c##dbzuser CONTAINER=ALL;
GRANT LOCK ANY TABLE TO c##dbzuser CONTAINER=ALL;
GRANT CREATE SEQUENCE TO c##dbzuser CONTAINER=ALL;

GRANT EXECUTE ON DBMS_LOGMNR TO c##dbzuser CONTAINER=ALL;
GRANT EXECUTE ON DBMS_LOGMNR_D TO c##dbzuser CONTAINER=ALL;

GRANT SELECT ON V_$LOG TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$LOG_HISTORY TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$LOGMNR_LOGS TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$LOGMNR_CONTENTS TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$LOGMNR_PARAMETERS TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$LOGFILE TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$ARCHIVED_LOG TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$ARCHIVE_DEST_STATUS TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$TRANSACTION TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$MYSTAT TO c##dbzuser CONTAINER=ALL;
GRANT SELECT ON V_$STATNAME TO c##dbzuser CONTAINER=ALL;
```

The listener creates the `LOG_MINING_FLUSH` table in `logminer_tbs` when it starts. The `CREATE TABLE` grant and the tablespace quota allow it to create and update this table. On Oracle versions that do not provide the `LOGMINING` role, omit that grant; the explicit `DBMS_LOGMNR` and dynamic performance view grants provide the required access.

For non-container databases, create a regular user instead of a common `c##` user and omit `SET CONTAINER` and the `CONTAINER=ALL` clauses. For Oracle on Amazon RDS, use the RDS-specific archive logging and supplemental logging procedures described in the [Debezium Oracle connector setup guide](https://debezium.io/documentation/reference/3.0/connectors/oracle.html#setting-up-oracle).

### RAC and PDB considerations

- Set `racNodes` on the listener's database connection when connecting to an Oracle Real Application Clusters (RAC) deployment.
- Set `pdbName` when the target is a pluggable database in a multitenant (CDB) architecture, and set `databaseName` to the root container (CDB) name in this case. Omit `pdbName` for a non-container database.

`ARCHIVELOG` mode and supplemental logging are required for CDC. Without them, the `oracledb:CdcListener` will not receive any change events.

## Next steps

- [Action Reference](actions.md): operations, parameters, return types, and sample code.
- [Trigger Reference](triggers.md): listener configuration and service callbacks for CDC.
