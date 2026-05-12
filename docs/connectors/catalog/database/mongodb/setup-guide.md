---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a MongoDB instance and obtaining the connection details required to use the MongoDB connector.

## Prerequisites

- A running MongoDB instance (v3.6 or later). You can use [MongoDB Atlas](https://www.mongodb.com/atlas) for a cloud-hosted instance, or install MongoDB Community Edition locally.

## Step 1: Set up a MongoDB instance

**Option A: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up or log in.
2. Create a new project (or use an existing one).
3. Click **Build a Database** and select your preferred tier (the free M0 Shared tier works for development).
4. Choose a cloud provider and region, then click **Create Cluster**.
5. Wait for the cluster to provision (typically 1–3 minutes).

**Option B: Local MongoDB**

1. Download and install MongoDB Community Edition from the [official download page](https://www.mongodb.com/try/download/community).
2. Start the `mongod` service using the default settings (localhost:27017).

## Step 2: Create a database user

**For MongoDB Atlas:**

1. In the Atlas dashboard, navigate to **Database Access** under the **Security** section.
2. Click **Add New Database User**.
3. Choose **Password** as the authentication method.
4. Enter a username and a strong password.
5. Under **Database User Privileges**, select **Read and write to any database** (or assign specific roles as needed).
6. Click **Add User**.

**For local MongoDB:**

1. Connect to MongoDB using `mongosh`.
2. Switch to the `admin` database and create a user:

    ```javascript
    use admin
    db.createUser({
      user: "myUser",
      pwd: "myPassword",
      roles: [{ role: "readWrite", db: "myDatabase" }]
    })
    ```

## Step 3: Configure network access

**For MongoDB Atlas:**

1. Navigate to **Network Access** under the **Security** section.
2. Click **Add IP Address**.
3. Add your application's IP address, or click **Allow Access from Anywhere** (`0.0.0.0/0`) for development purposes.
4. Click **Confirm**.

**For local MongoDB:**

Ensure that MongoDB is listening on the appropriate network interface. By default, it binds to `localhost`. To allow remote connections, update the `bindIp` setting in your `mongod.conf` file.

Allowing access from all IP addresses (0.0.0.0/0) is suitable for development only. In production, restrict access to specific IP addresses or CIDR ranges.

## Step 4: Get the connection string

**For MongoDB Atlas:**

1. In the Atlas dashboard, go to **Database** and click **Connect** on your cluster.
2. Select **Drivers** as the connection method.
3. Copy the connection string. It looks like:

    ```text
    mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority
    ```

4. Replace `<username>` and `<password>` with the credentials created in the previous step.

**For local MongoDB:**

The default connection string is:

```text
mongodb://localhost:27017
```

If authentication is enabled:

```text
mongodb://myUser:myPassword@localhost:27017/?authSource=admin
```

Store the connection string securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.
