---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a PostgreSQL server and configuring it for use with the Ballerina PostgreSQL connector, including optional CDC configuration.

## Prerequisites

- A running PostgreSQL server (version 10 or later). If you do not have one, [download and install PostgreSQL](https://www.postgresql.org/download/).
- A PostgreSQL user with appropriate privileges for your target database.

## Step 1: Create a database and user

1. Connect to your PostgreSQL server using `psql` or a GUI tool such as pgAdmin.
2. Create a database for your application:

    ```
    CREATE DATABASE mydb;
    ```

3. Create a dedicated user (or use an existing one) and grant it access:

    ```
    CREATE USER myuser WITH PASSWORD 'mypassword';
    GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
    ```

For production environments, follow the principle of least privilege: grant only the permissions your application requires.

## Step 2: Create tables and schema

1. Connect to your application database.
2. Create the tables your integration will interact with. For example:

    ```
    CREATE TABLE Customers (
        customerId SERIAL PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        registrationId INT,
        creditLimit DOUBLE PRECISION,
        country VARCHAR(255)
    );
    ```

3. Verify the tables were created successfully using `\dt` in `psql`.

## Step 3: Configure SSL (optional)

If your PostgreSQL server requires encrypted connections:

1. Ensure the server has SSL enabled in `postgresql.conf`:

    ```
    ssl = on
    ssl_cert_file = 'server.crt'
    ssl_key_file = 'server.key'
    ```

2. Place the CA certificate file (e.g., `root.crt`) in a location accessible to your application.
3. If using client certificate authentication, prepare the client certificate and key files.

The SSL mode can be configured on the connector side. Available modes include `DISABLE`, `ALLOW`, `PREFER` (default), `REQUIRE`, `VERIFY_CA`, and `VERIFY_FULL`.

## Step 4: Configure CDC / logical replication (optional: for triggers)

If you plan to use the CDC listener for real-time change events:

1. Set the Write-Ahead Log (WAL) level to `logical` in `postgresql.conf`:

    ```
    wal_level = logical
    ```

2. Restart PostgreSQL for the change to take effect.
3. Ensure the PostgreSQL user has the `REPLICATION` privilege:

    ```
    ALTER USER myuser REPLICATION;
    ```

4. Verify that the `pgoutput` logical decoding plugin is available (included by default in PostgreSQL 10+).

Changing `wal_level` requires a PostgreSQL server restart. Plan this change during a maintenance window in production environments.
