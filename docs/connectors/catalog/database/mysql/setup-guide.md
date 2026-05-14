---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a MySQL database and obtaining the connection credentials required to use the MySQL connector.

## Prerequisites

- A running MySQL server. You can [install MySQL locally](https://dev.mysql.com/downloads/), use Docker (`docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8`), or use a managed service such as AWS RDS, Google Cloud SQL, or Azure Database for MySQL.
- A database user with appropriate privileges for the operations you intend to perform.
- For CDC: MySQL binary logging must be enabled with `ROW` format (see the CDC setup step below).

## Create a MySQL database and user

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

For production environments, follow the principle of least privilege: grant only the specific permissions your application requires (for example, SELECT, INSERT, UPDATE, DELETE).

## Note your connection details

Record the following information. You will need it to configure the MySQL client:

- **Hostname**: The address of your MySQL server (for example, `localhost` or a cloud endpoint).
- **Port**: The MySQL port (default `3306`).
- **Username**: The database user (for example, `baluser`).
- **Password**: The database user's password.
- **Database name**: The target database (for example, `mydb`).

## Enable binary logging for CDC (optional)

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

## Next steps

- [Action Reference](actions.md): operations, parameters, return types, and sample code.
- [Trigger Reference](triggers.md): listener configuration and service callbacks for CDC.
