---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your database and obtaining the JDBC connection details required to use the Java JDBC connector.

## Prerequisites

- A running instance of a JDBC-compatible database (e.g., MySQL, PostgreSQL, Oracle, SQL Server, Snowflake).
- A database user account with appropriate privileges for the operations you intend to perform.
- The JDBC driver JAR file for your target database, if it is not bundled by default.

## Step 1: Create or identify your database

1. Log in to your database server or cloud console.
2. Create a new database (or identify an existing one) that your integration will connect to.
3. Note the **hostname** (or IP address), **port**, and **database name**.

For example, for a MySQL database:
- Host: `localhost`
- Port: `3306`
- Database: `myappdb`

## Step 2: Create a database user

1. Create a dedicated user for your integration (recommended over using the root/admin account).
2. Grant the user the minimum privileges required: typically `SELECT`, `INSERT`, `UPDATE`, `DELETE` on the target tables, and `EXECUTE` if calling stored procedures.

For example, in MySQL:

```sql
CREATE USER 'ballerina_user'@'%' IDENTIFIED BY 'your_secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON myappdb.* TO 'ballerina_user'@'%';
FLUSH PRIVILEGES;
```

Follow the principle of least privilege: only grant the permissions your integration actually needs.

## Step 3: Determine your JDBC URL

Construct the JDBC connection URL for your database. The format varies by database vendor:

| Database    | JDBC URL Format                                          |
|-------------|----------------------------------------------------------|
| MySQL       | `jdbc:mysql://host:3306/database`                        |
| PostgreSQL  | `jdbc:postgresql://host:5432/database`                   |
| SQL Server  | `jdbc:sqlserver://host:1433;databaseName=database`       |
| Oracle      | `jdbc:oracle:thin:@host:1521:SID`                        |
| Snowflake   | `jdbc:snowflake://account.snowflakecomputing.com`        |

Some databases (like Snowflake) require additional properties passed via the `options.properties` field in the connector configuration rather than in the URL itself.

## Step 4: Prepare the database schema

Create the tables and stored procedures your integration will use. For example:

```sql
CREATE TABLE Customers (
    customerId INTEGER NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(300),
    lastName VARCHAR(300),
    registrationId INTEGER,
    creditLimit DOUBLE,
    country VARCHAR(300),
    PRIMARY KEY (customerId)
);
```

## Step 5: Obtain the JDBC driver

1. Download the JDBC driver JAR for your database if it is not already included.
2. Common drivers:
    - **MySQL**: `mysql-connector-java`
    - **PostgreSQL**: `postgresql` (often bundled)
    - **SQL Server**: `mssql-jdbc`
    - **Oracle**: `ojdbc8`
    - **Snowflake**: `snowflake-jdbc`
3. Place the driver JAR in your Ballerina project or configure the dependency in `Ballerina.toml`.

Ensure the JDBC driver version is compatible with your database server version.
