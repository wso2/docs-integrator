---
title: Managed databases and caches
---

# Managed databases and caches

WSO2 Cloud - Integration Platform lets you create PostgreSQL and MySQL databases and Managed Cache instances on AWS, Azure, GCP, and DigitalOcean as fully managed platform services. These databases and caches can be provisioned to provide persistence and caching for your integrations. Service plans range from smaller instances for development purposes to production-grade databases with automatic backups and high-availability multi-node deployments.

:::info Availability and billing
- The capability to create managed databases, vector databases, and cache services is available only for paid WSO2 Cloud users.
- Billing for these services is included in your WSO2 Cloud subscription, with pricing varying based on the service plan of the resources you create.

:::tip Free trial
WSO2 Cloud provides a 7-day free trial for all database types on the **Hobbyist** service plan, available to free-tier users.

---

## PostgreSQL on WSO2 Cloud

PostgreSQL (also known as Postgres) is an open-source object-relational database management system. You can create PostgreSQL databases on WSO2 Cloud as fully managed, flexible SQL databases that are ideal for both structured and unstructured data. To perform efficient vector similarity search, you can create a PostgreSQL vector database.

### Create a managed PostgreSQL database

Follow the steps below to create a managed PostgreSQL database:

1. Sign in to the WSO2 Cloud Console at [https://console.devant.dev/](https://console.devant.dev/).
2. In the header, click the **Organization** list. This opens the organization home page.
3. In the left navigation menu, click **Dependencies**, then **Databases**.
4. Click **Create** and select **PostgreSQL** as the database type. Provide a display name for this server and follow the instructions.
5. Select your preferred cloud provider from AWS, Azure, GCP, or DigitalOcean.
    - The cloud provider is used to provision the compute and storage infrastructure for your database.
    - There is no functional difference between databases created on different cloud providers, apart from changes to service plans (and associated costs).
6. Choose the region for your database.
    - Available regions depend on the selected cloud provider. WSO2 Cloud currently supports US and EU regions across all providers.
7. Select the service plan.
    - Service plans vary in the dedicated CPU, memory (RAM), storage space allocated for your database, the backup retention periods, and high-availability configurations for production use cases.

### Create a managed PostgreSQL vector database

Follow the steps below to create a managed PostgreSQL vector database:

1. Sign in to the WSO2 Cloud Console at [https://console.devant.dev/](https://console.devant.dev/).
2. In the header, click the **Organization** list. This opens the organization home page.
3. In the left navigation menu, click **Dependencies**, then **Vector Databases**.
4. Follow steps 4 onwards in the [Create a managed PostgreSQL database](#create-a-managed-postgresql-database) section.

### Connect to your managed PostgreSQL database

To connect to your managed PostgreSQL database, consider the following guidelines:

- You can use any PostgreSQL driver, ORM, or supported generic SQL library (depending on the programming language) to connect to the database.
- The connection parameters can be found in the **Overview** section of the WSO2 Cloud Console under the relevant database.
- PostgreSQL databases accept traffic from the internet by default. You can restrict access to specific IP addresses and CIDR blocks under **Advanced Settings**.

### High availability and automatic backups (PostgreSQL)

The high availability characteristics and the automatic backup retention periods for managed PostgreSQL databases vary based on the selected service plan, as shown below.

| Service plan | High availability | Backup retention time |
|---|---|---|
| Hobbyist | Single-node with limited availability | None |
| Startup | Single-node with limited availability | 2 days |
| Business | Two-node (primary + standby) with higher availability | 14 days |
| Premium | Three-node (primary + standby + standby) with highest availability | 30 days |

Service plans with standby nodes are generally recommended for production scenarios for the following reasons:

- They provide another physical copy of the data in case of hardware, software, or network failures.
- They typically reduce the data loss window in disaster scenarios.
- They provide a quicker time to restore with a controlled failover in case of failures, since the standby is already installed and running.

#### Automatic backups

- WSO2 Cloud runs full backups daily to automatically back up managed PostgreSQL databases and copies the write-ahead logs (WAL) at 5-minute intervals or for every new file generated. WSO2 Cloud encrypts all backups at rest.
- WSO2 Cloud automatically handles outages and software failures by replacing broken nodes with new ones that resume correctly from the point of failure. The impact of a failure depends on the number of available standby nodes in the database.

#### Failure recovery

- **Minor failures**: WSO2 Cloud automatically handles minor failures such as service process crashes or temporary loss of network access in all plans without requiring significant changes to the service deployment. WSO2 Cloud automatically restores the service to normal operation once the crashed process is restarted or network access is restored.
- **Severe failures**: To handle severe failures such as losing a node entirely in case of hardware or severe software problems, more drastic recovery measures are required. The monitoring infrastructure automatically detects a failing node, both when the node starts reporting issues in the self-diagnostics or when it stops communicating. In such cases, the monitoring infrastructure automatically schedules a new replacement node to be created.
    - In the event of database failover, the Service URI of your service remains the same; only the IP address changes to point to the new primary node.
    - The Hobbyist and Startup plans provide a single node, and in case of failure, a new node starts up, restores its state from the latest available backup, and resumes serving traffic. As a single node provides the service, the database becomes unavailable for the duration of the restoration. Any write operations made since the backup of the latest WAL file will be lost. Typically, this time window is limited to either five minutes of time or one WAL file.

### Connection limits (PostgreSQL)

The following connection limits apply to managed PostgreSQL databases based on the selected service plan.

| Service plan | Max connections |
|---|---|
| Hobbyist | 25 |
| Startup / Business / Premium-4 | 100 |
| Business-16 | 400 |
| Premium-8 | 200 |

---

## MySQL on WSO2 Cloud

MySQL is a user-friendly, flexible, open-source relational database management system with a well-established history in the SQL database realm. WSO2 Cloud lets you create fully managed MySQL databases, enabling rapid setup and use.

### Create a managed MySQL database

Follow the steps below to create a managed MySQL database:

1. From the environment list on the header, located next to the **Deployment Tracks** list, select your **Organization**.
2. In the left navigation menu, click **Dependencies**, then **Databases**.
3. Click **Create** and select **MySQL** as the database type. Provide a display name for this server and follow the instructions.
4. Select your preferred cloud provider from AWS, Azure, GCP, and DigitalOcean.
    - WSO2 Cloud uses the cloud provider to provision the compute and storage infrastructure for your database.
    - There is no functional difference between databases created on different cloud providers, apart from changes to service plans (and associated costs).
5. Choose the region for your database.
    - Available regions depend on the selected cloud provider. WSO2 Cloud currently supports US and EU regions across all providers.
6. Select the service plan.
    - Service plans vary in the dedicated CPU, memory (RAM), storage space allocated for your database, the backup retention periods, and high-availability configurations for production use cases.

### Connect to your managed MySQL database

To connect to your managed MySQL database, consider the following guidelines:

- You can use any MySQL driver, ORM, or supported generic SQL library (depending on the programming language) to connect to the database.
- You can find the connection parameters in the **Overview** section of the WSO2 Cloud Console under the relevant database.
- MySQL databases accept traffic from the internet by default. You can restrict access to specific IP addresses and CIDR blocks under **Advanced Settings**.

### High availability and automatic backups (MySQL)

The high availability characteristics and the automatic backup retention periods for managed MySQL databases vary based on your service plan, as explained below:

| Service plan | High availability | Backup retention time |
|---|---|---|
| Hobbyist | Single-node with limited availability | None |
| Startup | Single-node with limited availability | 2 days |
| Business | Two-node (primary + standby) with higher availability | 14 days |
| Premium | Three-node (primary + standby + standby) with highest availability | 30 days |

In general, service plans with standby nodes are recommended for production scenarios for the following reasons:

- They provide another physical copy of the data in case of hardware, software, or network failures.
- They typically reduce the data loss window in disaster scenarios.
- They provide a quicker time to restore with a controlled failover in case of failures, since the standby is already installed and running.

#### Automatic backups

- WSO2 Cloud runs full backups daily to automatically back up managed MySQL databases and records binary logs continuously. WSO2 Cloud encrypts all backups at rest.
- WSO2 Cloud automatically handles outages and software failures by replacing broken nodes with new ones that resume correctly from the point of failure. The impact of a failure depends on the number of available standby nodes in the database.

### Connection limits (MySQL)

The maximum number of simultaneous connections to MySQL databases is fixed for each service plan and depends on how much RAM your service plan offers.

An `extra_connection` with a value of `1` is added for system processes for all MySQL databases, regardless of the service plan.

#### For plans under 4 GiB RAM

For plans under 4 GiB of RAM, the number of allowed connections is `75` per GiB:

```
max_connections = 75 x RAM + extra_connection
```

#### For plans with 4 GiB RAM or more

For plans with 4 GiB or more RAM, the number of allowed connections is `100` per GiB:

```
max_connections = 100 x RAM + extra_connection
```

---

## Managed Cache

Fully compatible with legacy Redis® OSS.

WSO2 Cloud's Managed Cache provides fully managed in-memory NoSQL data stores on AWS, Azure, GCP, and DigitalOcean and can be used as a cache, database, streaming engine, or message broker. Managed Cache instances can be provisioned and integrated into your applications within minutes.

### Create a Managed Cache

Follow the steps below to create a Managed Cache:

1. Sign in to the WSO2 Cloud Console at [https://console.devant.dev/](https://console.devant.dev).
2. In the header, click the **Organization** list. This opens the organization home page.
3. In the left navigation menu, click **Dependencies**, then click **Databases**.
4. Click **+ Create** and select **Managed Cache** as the data store type. Provide a display name for this server and follow the instructions.
5. Select a preferred cloud provider (AWS, Azure, GCP, or DigitalOcean).
    - The cloud provider provisions the compute and storage infrastructure for your data store.
    - The functionality remains the same across cloud providers, though service plans and costs may differ.
6. Select a region for your data store.
    - Available regions depend on the selected cloud provider. WSO2 Cloud currently supports US and EU regions across all providers.
7. Select a service plan.
    - Service plans vary in dedicated CPU, memory (RAM), and storage space allocated for your data store, as well as high-availability configurations for production use cases.
8. Click **Create**.

### Connect to your Managed Cache

To connect to your Managed Cache, follow these guidelines:

- Use any legacy Redis® OSS compatible driver (in any programming language) to connect to your Managed Cache.
- You can find the connection parameters in the **Overview** section of the WSO2 Cloud Console under the relevant database. Note that Managed Cache enforces TLS.
- Managed Cache instances accept traffic from the internet by default. You can restrict access to specific IP addresses and CIDR blocks under **Advanced Settings**.

### High availability and automatic backups (Managed Cache)

The high availability and automatic backup retention periods for a Managed Cache vary as follows depending on the service plan you select.

| Service plan | High availability | Backup features | Backup history |
|---|---|---|---|
| Hobbyist | Single-node with limited availability. | Single backup only for disaster recovery | None |
| Startup | Single-node with limited availability. | Single backup only for disaster recovery | 1 day |
| Business | Two-node (primary + standby) with higher availability (automatic failover if the primary node fails). | Automatic backups | 3 days |
| Premium | Three-node (primary + standby + standby) with highest availability (automatic failover if the primary node fails). | Automatic backups | 13 days |

In general, service plans with standby nodes are recommended for production scenarios for the following reasons:

- They provide another physical copy of the data in case of hardware, software, or network failures.
- They reduce the data loss window in disaster scenarios.
- They ensure quicker restoration with controlled failover in case of failures, since the standby is already installed and running.

#### Automatic backups

- WSO2 Cloud runs full backups daily to automatically back up Managed Caches and copies the write-ahead logs (WAL) at 5-minute intervals or for every new file generated.
- WSO2 Cloud encrypts all backups at rest.
- WSO2 Cloud automatically handles outages and software failures by replacing broken nodes with new ones that resume correctly from the point of failure. The impact of a failure depends on the number of available standby nodes in the data store.

#### Failure recovery

- **Minor failures**: WSO2 Cloud automatically handles minor failures such as service process crashes or temporary loss of network access in all plans without requiring significant changes to the service deployment. WSO2 Cloud automatically restores the service to normal operation once the crashed process is restarted or network access is restored.
- **Severe failures**: Failures such as losing a node entirely in case of hardware or severe software problems require more drastic recovery measures. The monitoring infrastructure automatically detects a failing node when the node starts reporting issues in the self-diagnostics or when it stops communicating. In such cases, the monitoring infrastructure automatically schedules a new replacement node to be created.
    - In the event of a data store failover, the service URI of your service remains the same; only the IP address changes to point to the new primary node.
    - The Hobbyist and Startup plans provide a single node, and in case of failure, a new node starts up, restores its state from the latest available backup, and resumes serving traffic.
    - As only a single primary node provides the service, the caching service becomes unavailable for the duration of the restoration. All write operations made since the last backup will be lost.

### Limitations

#### Connection limits (Managed Cache)

The number of simultaneous connections in a Managed Cache depends on the total available memory on the server instances.

You can use the following to estimate:

```
max_number_of_connections = 4 x m
```

Here, `m` represents the memory in megabytes, where at least 10,000 connections are available, even on the smallest servers. For example, on a server with 4 GB memory (4,096 MB), the simultaneous connections are:

```
4 x 4096 = 16384 // 16k connections
```

This number is estimated by the exact available memory, so it can vary between different plans and cloud providers. To see the exact maximum connections allowed, use the `redis-cli` and `info` command as follows:

```
echo "info" | redis-cli -u REDIS_URI | grep maxclients
```

#### Restricted commands

To maintain the stability and security of a managed environment, WSO2 Cloud restricts certain commands on Managed Cache services.

:::note Support for Lua scripts on Managed Cache
- Managed Cache has built-in support for running Lua scripts to perform various actions directly on the server. Scripting is typically controlled using the `EVAL`, `EVALSHA`, and `SCRIPT LOAD` commands.
- For all newly created cache instances, `EVAL`, `EVALSHA`, and `SCRIPT LOAD` commands are enabled by default.

The following commands are disabled on WSO2 Cloud:

- `bgrewriteaof`: Initiates a background append-only file rewrite.
- `cluster`: Manages caching cluster commands.
- `command`: Provides details about all caching commands.
- `debug`: Contains sub-commands for debugging caching.
- `failover`: Manages manual failover of a master to a replica.
- `migrate`: Atomically transfers a key from one caching instance to another.
- `role`: Returns the role of the instance in the context of replication.
- `slaveof`: Makes the server a replica of another instance, or promotes it as master.
- `acl`: Manages caching access control lists.
- `bgsave`: Creates a snapshot of the data set into a dump file.
- `config`: Alters the configuration of a running caching server.
- `lastsave`: Returns the UNIX timestamp of the last successful save to disk.
- `monitor`: Streams back every command processed by the caching server.
- `replicaof`: Makes the server a replica of another instance.
- `save`: Synchronously saves the dataset to disk.
- `shutdown`: Synchronously saves the dataset to disk and then shuts down the server.

The following `eval` commands are also disabled:

- `eval`: Executes a Lua script server-side.
- `eval_ro`: Read-only variant of the `eval` command.
- `evalsha`: Executes a script cached on the server side by its SHA1 digest.
- `evalsha_ro`: Read-only variant of the `evalsha` command.
- `fcall`: Calls a caching function.
- `fcall_ro`: Read-only variant of the `fcall` command.
- `function`: Manages caching functions.
- `script`: Manages the script cache.

---

## Add a managed database or cache to the Marketplace

When you create a managed database or cache, you can add it to the Marketplace, making it available for consumption through a connection.

To add a managed database or cache to the Marketplace, you must register at least one credential for it.

### Step 1: Register credentials

To register credentials, you can either use the default super admin credentials or the credentials you create using the super admin credentials. When you create a database or cache server, super admin credentials are generated by default. You can use these super admin credentials to create new user credentials. The steps to create new user credentials depend on the type of database or cache you are using.

You can use the registered credentials to create a connection. During connection setup, you must select credentials for each database from the list of available credentials.

To register credentials for a database, follow these steps:

1. Sign in to the [WSO2 Cloud Console](https://console.devant.dev/).
2. Go to the WSO2 Cloud Console header and select your organization from the **Organization** list.
3. In the left navigation menu, click **Dependencies**, then click **Databases**.
4. Click on a required database to view its details.
5. Click the **Databases** tab.
6. Click to expand the database for which you want to register credentials, then click **Add Credentials**.
7. In the **Add Credentials** dialog, do one of the following depending on your requirements:
    - Select **Add New Credentials** and specify the following:
        - A display name for the credentials.
        - The database credentials you created to use when setting up database connections in WSO2 Cloud.
        - The environment where you want to use the credentials.

      The steps to create new user credentials depend on the type of database or cache you are using. In general, log in to your database server as the super admin using a command-line interface or a database management tool. Then, create new database users with the required permission levels.

    - Select **Add Super Admin Credentials** and specify the following:
        - A display name for the credentials.
        - The environment where you want to use the credentials.
8. Click **Save**.

WSO2 Cloud lets you delete registered credentials to prevent their use when establishing new connections. However, deleting credentials does not affect any existing database connections that are already using them.

### Step 2: Add the database or cache to the Marketplace

On the **Databases** tab, click **+ Add to Marketplace** corresponding to the database you want to add.

Once the database is added to the Marketplace, it can be consumed via a connection.

To remove a database or cache that you added to the Marketplace, click the corresponding **Remove from Marketplace**. This action prevents new connections to the removed database, but existing connections remain unaffected.

---

## What's next

- [WSO2 Cloud overview](../overview.md) — How WSO2 Cloud manages your deployed integrations end to end.
- [Configurations overview](../configurations/overview.md) — Set runtime values, secrets, and other configuration per environment.

*PostgreSQL, MySQL, and Redis® are trademarks and property of their respective owners. All product and service names used in this documentation are for identification purposes only.*
