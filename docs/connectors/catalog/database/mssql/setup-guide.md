---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Microsoft SQL Server instance and enabling CDC so that the MSSQL connector can connect and capture data changes.

## Prerequisites

- A running Microsoft SQL Server instance (2016 or later). If you do not have one, you can [download SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) for free, run it via Docker (`docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=YourStr0ngPassw0rd' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest`), or use a managed service such as Azure SQL Database or Amazon RDS for SQL Server.

## Create a database and user

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

## Note your connection details

Record the following information. You will need it to configure the MSSQL client:

- **Hostname**: The address of your SQL Server instance (for example, `localhost` or a cloud endpoint).
- **Port**: The SQL Server port (default `1433`).
- **Username**: The database user (for example, `myuser`).
- **Password**: The database user's password.
- **Database name**: The target database (for example, `MyDatabase`).
- **Instance name** (optional): The named instance if you are not using the default instance.

## Enable TCP/IP connectivity

1. Open **SQL Server Configuration Manager**.
2. Navigate to **SQL Server Network Configuration** > **Protocols for [your instance]**.
3. Ensure **TCP/IP** is **Enabled**.
4. Under TCP/IP Properties > **IP Addresses**, verify the port is set to **1433** (or your custom port).
5. Restart the SQL Server service for changes to take effect.

If you are using a named instance, the port may differ from `1433`. Check your instance configuration or use the instance name when connecting.

## Enable change data capture for CDC triggers (optional)

If you plan to use the CDC listener for real-time event streaming, enable CDC on the database and the specific tables you want to monitor:

1. Enable CDC on the database:

    ```sql
    USE MyDatabase;
    EXEC sys.sp_cdc_enable_db;
    ```

2. Enable CDC on the tables you want to track:

    ```sql
    EXEC sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name = N'MyTable',
        @role_name = NULL;
    ```

3. Verify that the SQL Server Agent service is running, as CDC relies on it.

CDC requires SQL Server Enterprise, Developer, or Standard edition. It is not available in Express edition.

## Configure SSL/TLS (optional)

To encrypt connections between your WSO2 Integrator runtime and SQL Server:

1. Obtain or generate an SSL certificate for the SQL Server instance.
2. Open **SQL Server Configuration Manager** > **SQL Server Network Configuration** > **Protocols**.
3. Right-click **Properties** > **Flags** tab and set **Force Encryption** to **Yes**.
4. Under the **Certificate** tab, select your SSL certificate.
5. Restart the SQL Server service.

For development and testing, you can set `trustServerCertificate: true` in the connector's `SecureSocket` configuration to skip certificate validation.

## Next steps

- [Action Reference](actions.md): operations, parameters, return types, and sample code.
- [Trigger Reference](triggers.md): listener configuration and service callbacks for CDC.
