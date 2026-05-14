---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a PostgreSQL server and obtaining the connection credentials required to use the PostgreSQL connector, including optional configuration for SSL and Change Data Capture (CDC).

## Prerequisites

- A running PostgreSQL server (version 10 or later). You can [install PostgreSQL locally](https://www.postgresql.org/download/), use Docker (`docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16`), or use a managed service such as AWS RDS, Google Cloud SQL, or Azure Database for PostgreSQL.
- A database user with appropriate privileges for the operations you intend to perform.
- For CDC: PostgreSQL must be configured with `wal_level = logical`, and the connecting user must have the `REPLICATION` privilege (see the CDC setup step below).

## Create a PostgreSQL database and user

1. Connect to your PostgreSQL server using `psql` or a GUI tool such as pgAdmin.
2. Create a new database for your application:

    ```sql
    CREATE DATABASE mydb;
    ```

3. (Optional) Create a dedicated user and grant privileges:

    ```sql
    CREATE USER baluser WITH PASSWORD 'balpass';
    GRANT ALL PRIVILEGES ON DATABASE mydb TO baluser;
    ```

For production environments, follow the principle of least privilege: grant only the specific permissions your application requires (for example, SELECT, INSERT, UPDATE, DELETE on specific tables).

## Note your connection details

Record the following information. You will need it to configure the PostgreSQL client:

- **Hostname**: The address of your PostgreSQL server (for example, `localhost` or a cloud endpoint).
- **Port**: The PostgreSQL port (default `5432`).
- **Username**: The database user (for example, `baluser`).
- **Password**: The database user's password.
- **Database name**: The target database (for example, `mydb`).

## Configure SSL (optional)

If your PostgreSQL server requires encrypted connections:

1. Ensure SSL is enabled in `postgresql.conf`:

    ```ini
    ssl = on
    ssl_cert_file = 'server.crt'
    ssl_key_file = 'server.key'
    ```

2. Place the CA certificate file (for example, `root.crt`) in a location accessible to your application.
3. If you are using client certificate authentication, prepare the client certificate and key files.

The SSL mode is configured on the connector side. Supported modes are `DISABLE`, `ALLOW`, `PREFER` (default), `REQUIRE`, `VERIFY_CA`, and `VERIFY_FULL`.

## Enable logical replication for CDC (optional)

If you plan to use the Change Data Capture (CDC) listener, you must enable logical replication on your PostgreSQL server.

1. Set the Write-Ahead Log (WAL) level to `logical` in `postgresql.conf`:

    ```ini
    wal_level = logical
    ```

2. Restart the PostgreSQL server for the change to take effect.
3. Grant the `REPLICATION` privilege to the user the connector authenticates with:

    ```sql
    ALTER USER baluser REPLICATION;
    ```

4. Verify that the `pgoutput` logical decoding plugin is available. It is included by default in PostgreSQL 10 and later.

Changing `wal_level` requires a PostgreSQL server restart. Plan this change during a maintenance window in production environments. Without `wal_level = logical`, the `postgresql:CdcListener` will not receive any change events.

## Next steps

- [Action Reference](actions.md): operations, parameters, return types, and sample code.
- [Trigger Reference](triggers.md): listener configuration and service callbacks for CDC.
