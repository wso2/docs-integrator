---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Microsoft SQL Server instance and enabling CDC so that the MSSQL connector can connect and capture data changes.

## Prerequisites

- A running Microsoft SQL Server instance (2016 or later). If you do not have one, you can [download SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) for free or run it via Docker.

## Step 1: Create a database and user

1. Connect to your SQL Server instance using **SQL Server Management Studio (SSMS)**, **Azure Data Studio**, or `sqlcmd`.
2. Create a new database:

    ```sql
    CREATE DATABASE MyDatabase;
    ```

3. Create a login and user with appropriate permissions:

    ```sql
    CREATE LOGIN myuser WITH PASSWORD = 'MyStrongPassword123';
    USE MyDatabase;
    CREATE USER myuser FOR LOGIN myuser;
    ALTER ROLE db_owner ADD MEMBER myuser;
    ```

For production environments, grant only the minimum required permissions instead of `db_owner`.

## Step 2: Enable TCP/IP connectivity

1. Open **SQL Server Configuration Manager**.
2. Navigate to **SQL Server Network Configuration** > **Protocols for [your instance]**.
3. Ensure **TCP/IP** is **Enabled**.
4. Under TCP/IP Properties > **IP Addresses**, verify the port is set to **1433** (or your custom port).
5. Restart the SQL Server service for changes to take effect.

If you are using a named instance, the port may differ from 1433. Check your instance configuration or use the instance name when connecting.

## Step 3: Enable change data capture (optional: for CDC triggers)

If you plan to use the CDC listener for real-time event streaming, enable CDC on the database and the specific tables you want to monitor:

1. Enable CDC on the database:

    ```sql
    USE MyDatabase;
    EXEC sys.sp_cdc_enable_db;
    ```

2. Enable CDC on the table(s) you want to track:

    ```sql
    EXEC sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name = N'MyTable',
        @role_name = NULL;
    ```

3. Verify that the SQL Server Agent service is running, as CDC relies on it.

CDC requires SQL Server Enterprise, Developer, or Standard edition. It is not available in Express edition.

## Step 4: Configure SSL/TLS (optional)

To encrypt connections between your Ballerina application and SQL Server:

1. Obtain or generate an SSL certificate for the SQL Server instance.
2. Open **SQL Server Configuration Manager** > **SQL Server Network Configuration** > **Protocols**.
3. Right-click **Properties** > **Flags** tab and set **Force Encryption** to **Yes**.
4. Under the **Certificate** tab, select your SSL certificate.
5. Restart the SQL Server service.

For development/testing, you can set `trustServerCertificate: true` in the connector's `SecureSocket` configuration to skip certificate validation.
