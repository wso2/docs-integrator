---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Snowflake warehouse and database, and configuring authentication required to use the Snowflake connector.

## Prerequisites

- A Snowflake account. If you do not have one, [sign up for a free trial](https://signup.snowflake.com/).

## Step 1: Create a warehouse and database

1. Log in to your Snowflake account.
2. Navigate to the **Warehouses** tab under the **Admin** section.

   ![Navigate to warehouses](/img/connectors/catalog/database/snowflake/setup/snowflakes_create_warehouse.png)

3. Select **+ Warehouse** and enter a name and type for the new warehouse.

   ![Create warehouse](/img/connectors/catalog/database/snowflake/setup/snowflakes_create_warehouse_2.png)

4. Optionally, set the warehouse as the default for your account by editing the profile settings.

   ![Edit profile](/img/connectors/catalog/database/snowflake/setup/snokeflakes_user_profile.png)

   ![Set default warehouse](/img/connectors/catalog/database/snowflake/setup/snowflakes_set_default_warehouse.png)

   :::note
   If you do not set a default warehouse, you must specify the warehouse name when creating a connection.
   :::

5. Navigate to the **Databases** tab under the **Data** section and select **+ Database** to create a new database.

   ![Create database](/img/connectors/catalog/database/snowflake/setup/snowflakes_create_database.png)

## Step 2: Note your account identifier

Your account identifier is the value before `.snowflakecomputing.com` in your Snowflake URL, in the format `<orgname>-<account_name>`.

You can also find it under **Admin > Accounts** in the Snowflake UI.

## Step 3: Set up key-pair authentication (recommended for production)

To use key-pair authentication:

1. Generate a private key:

   ```bash
   openssl genrsa 2048 | openssl pkcs8 -topk8 -v2 aes256 -inform PEM -out key-aes256.p8
   ```

   :::note
   Use the `-v2 aes256` option. 3DES is not supported by the Snowflake connector.
   :::

2. Generate the corresponding public key:

   ```bash
   openssl rsa -in key-aes256.p8 -pubout -out key-aes256.pub
   ```

3. Assign the public key to your Snowflake user:

   ```sql
   ALTER USER example_user SET RSA_PUBLIC_KEY='MIIBIjANBgkqh...';
   ```

## Step 4: Configure the Java environment

The Snowflake JDBC driver requires a specific JVM option. Set the following before running your application:

```bash
export JDK_JAVA_OPTIONS="--add-opens java.base/java.nio=ALL-UNNAMED"
```

Without this setting, the connector may fail at runtime with module access errors.
