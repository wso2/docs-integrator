---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a MySQL database and obtaining the connection credentials required to use the Ballerina MySQL connector.

## Prerequisites

- A running MySQL server. The connector requires the MySQL JDBC driver 8.0.13 or later (bundled in `ballerinax/mysql.driver`). You can [install MySQL locally](https://dev.mysql.com/downloads/), use Docker (`docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8`), or use a managed service (AWS RDS, Google Cloud SQL, Azure Database for MySQL).
- A database user with appropriate privileges for the operations you intend to perform.
- For CDC: MySQL binary logging must be enabled with `ROW` format (see the CDC setup step below).

## Step 1: Create a MySQL database and user

1. Connect to your MySQL server using the `mysql` command-line client or a GUI tool such as MySQL Workbench.
2. Create a new database for your application:

    ```sql
    CREATE DATABASE IF NOT EXISTS mydb;
    ```

3. (Optional) Create a dedicated user and grant privileges:

    ```sql
    CREATE USER 'baluser'@'%' IDENTIFIED BY 'balpass';
    GRANT ALL PRIVILEGES ON mydb.* TO 'baluser'@'%';
    FLUSH PRIVILEGES;
    ```

For production environments, follow the principle of least privilege — grant only the specific permissions your application requires (e.g., SELECT, INSERT, UPDATE, DELETE).

## Step 2: Note your connection details

Record the following information; you will need it to configure the Ballerina client:

- **Hostname**: The address of your MySQL server (e.g., `localhost` or a cloud endpoint).
- **Port**: The MySQL port (default `3306`).
- **Username**: The database user (e.g., `baluser`).
- **Password**: The database user's password.
- **Database name**: The target database (e.g., `mydb`).

## Step 3: Enable binary logging for CDC (optional)

If you plan to use the Change Data Capture (CDC) listener, you must enable MySQL binary logging in `ROW` format.

1. Open the MySQL configuration file (`my.cnf` or `my.ini`) and add:

    ```ini
    [mysqld]
    log-bin=mysql-bin
    binlog-format=ROW
    server-id=1
    ```

2. Restart the MySQL server:

    ```bash
    sudo service mysql restart
    ```

3. Verify binary logging is enabled:

    ```sql
    SHOW VARIABLES LIKE 'log_bin';
    ```

    The value should be `ON`.

Binary logging is required for CDC. Without it, the `mysql:CdcListener` will not receive any change events.

## Step 4: Add the MySQL driver dependency

The Ballerina MySQL connector requires the MySQL JDBC driver. The simplest approach is to import the bundled driver package:

```ballerina
import ballerinax/mysql.driver as _;
```

If you are using the CDC listener instead of (or in addition to) the action client, import the CDC driver bundle, which packages the JDBC driver alongside the Debezium engine:

```ballerina
import ballerinax/mysql.cdc.driver as _;
```

Alternatively, you can specify a particular driver version in your `Ballerina.toml`:

```toml
[[platform.java21.dependency]]
groupId = "com.mysql"
artifactId = "mysql-connector-j"
version = "8.4.0"
```

The `ballerinax/mysql.driver` and `ballerinax/mysql.cdc.driver` packages bundle the latest compatible MySQL JDBC driver. You only need to configure `Ballerina.toml` if you require a specific driver version. For MySQL Connector/J 8.0.30 and earlier, use the legacy coordinates `groupId = "mysql"` and `artifactId = "mysql-connector-java"`.
