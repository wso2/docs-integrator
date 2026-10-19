---
title: Managed Databases and Caches
---

# Managed Databases and Caches

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
3. In the left navigation menu, click **Admin**, then **Databases**.
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
3. In the left navigation menu, click **Admin**, then **Databases**.
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
| Startup | Single-node with limited availability | 3 days |
| Business | Two-node (primary + standby) with higher availability | 15 days |
| Premium | Three-node (primary + standby + standby) with highest availability | 31 days |

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
2. In the left navigation menu, click **Admin**, then **Databases**.
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
| Startup | Single-node with limited availability | 3 days |
| Business | Two-node (primary + standby) with higher availability | 15 days |

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

## What's next

- [WSO2 Cloud overview](manage.md) — How WSO2 Cloud manages your deployed integrations end to end.
- [Configurations overview](configurations/configurations.md) — Set runtime values, secrets, and other configuration per environment.

*PostgreSQL, MySQL, and Redis® are trademarks and property of their respective owners. All product and service names used in this documentation are for identification purposes only.*
