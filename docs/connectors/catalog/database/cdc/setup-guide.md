---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring your database server to emit change events that the CDC connector can consume.

## Prerequisites

- A running MySQL, PostgreSQL, Microsoft SQL Server, or Oracle database instance.
- A database user with sufficient privileges to enable CDC (replication, log reading).

## Step 1: Enable binary logging in MySQL

The CDC connector uses MySQL's binary log (binlog) to capture row-level changes. To enable it:

1. Open the MySQL configuration file (`my.cnf` or `my.ini`).
2. Add or update the following settings under `[mysqld]`:

    ```
    server-id         = 1
    log_bin           = mysql-bin
    binlog_format     = ROW
    binlog_row_image  = FULL
    expire_logs_days  = 10
    ```

3. Restart the MySQL server to apply the changes.
4. Verify binary logging is enabled:

    ```sql
    SHOW VARIABLES LIKE 'log_bin';
    ```

    The result should show `ON`.

MySQL 5.7+ and MySQL 8.x are supported. The `binlog_format` must be set to `ROW`: `STATEMENT` and `MIXED` formats are not supported by Debezium.

## Step 2: Create a CDC database user (MySQL)

Create a dedicated database user with the minimum privileges required for CDC:

```sql
CREATE USER 'cdc_user'@'%' IDENTIFIED BY 'strong_password';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'cdc_user'@'%';
FLUSH PRIVILEGES;
```

Use a dedicated user with least-privilege access for CDC rather than a general admin account.

## Step 3: Enable logical replication in PostgreSQL

For PostgreSQL, logical replication must be enabled before the connector can capture changes:

1. Open `postgresql.conf` and update the following settings:

    ```
    wal_level = logical
    max_replication_slots = 4
    max_wal_senders = 4
    ```

2. Restart the PostgreSQL server to apply the changes.
3. Create a CDC user with replication privileges:

    ```sql
    CREATE USER cdc_user WITH PASSWORD 'strong_password' REPLICATION;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO cdc_user;
    ```

PostgreSQL 10 or later is required for logical replication support.

## Step 4: Enable CDC in Microsoft SQL server

For SQL Server, CDC must be enabled at both the database and table level:

1. Enable CDC at the database level (requires `sysadmin` or `db_owner` role):

    ```sql
    USE your_database;
    EXEC sys.sp_cdc_enable_db;
    ```

2. Enable CDC on each table you want to track:

    ```sql
    EXEC sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name   = N'your_table',
        @role_name     = NULL;
    ```

3. Confirm the SQL Server Agent service is running, as it processes CDC capture and cleanup jobs.

CDC in SQL Server requires Enterprise, Developer, or Evaluation edition. Standard edition supports it from SQL Server 2016 SP1 onwards.

## Step 5: Enable logMiner in Oracle

For Oracle, the connector reads changes via LogMiner. The following setup is required:

1. Enable supplemental logging at the database level:

    ```sql
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
    ```

2. Enable archive log mode if not already enabled:

    ```sql
    SHUTDOWN IMMEDIATE;
    STARTUP MOUNT;
    ALTER DATABASE ARCHIVELOG;
    ALTER DATABASE OPEN;
    ```

3. Grant the CDC user the required privileges:

    ```sql
    GRANT CREATE SESSION, SET CONTAINER, SELECT ANY TRANSACTION,
          LOGMINING, SELECT ANY TABLE, EXECUTE_CATALOG_ROLE TO cdc_user;
    ```

Oracle 11g R2 and later are supported. Ensure archive log mode is active before starting the connector.
